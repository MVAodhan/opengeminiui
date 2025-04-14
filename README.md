This is a [Next.js](https://nextjs.org) project bootstrapped with [Supabase](https://supabase.com/) & [The Vercel AI SDK](https://sdk.vercel.ai/)

Rename the .env.example file to .env and fill in your env varriables.

GOOGLE_GENERATIVE_AI_API_KEY='<your-aistudio-api>'

The above can be generated from [Google AI Studio](https://aistudio.google.com/) \_Get Api Key > Create API Key\*

NEXT_PUBLIC_SUPABASE_URL='<your-supabase-url>'

NEXT_PUBLIC_SUPABASE_ANON_KEY='<your-supabase-anon-key>'

The above two will be generated after creating a Free Supabase Project

NEXT\*PUBLIC_SUPABASE_URL Project Settings > Data API > URL

NEXT_PUBLIC_SUPABASE_ANON_KEY Project Settings > Data API > ANON | PUBLIC key

Create two different Tables as visualised bellow. Database > Tables > New Table
![Table Schema](<Screenshot 2025-04-13 at 11.12.59 PM.png>)

To create a Foreign key, click the link next to the column name and link it to the users table auth schema, managed by supabase!

![Supabase Foreign key](<Screenshot 2025-04-14 at 2.04.14 AM.png>)

Create Row Level Security policies for each of the tables

![alt text](<Screenshot 2025-04-14 at 11.35.23 PM.png>)
For the Chats table, create a policy fgor all crud actions
using ` (( SELECT auth.uid() AS uid) = user_id)`
![alt text](<Screenshot 2025-04-14 at 11.41.46 PM.png>)

And create a policy for select and update on the profiles table using the followin statement for each `(( SELECT auth.uid() AS uid) = id)`

Create a database trigger that will create profile after a user signs up. Go to the SQL Editor and run this code block

```
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, created_at, credits)
  values (new.id, new.email, new.created_at, 0);
  return new;
end;
$$ language plpgsql security definer;
```

If you see `Success. No Rows Created` Run the next block

```
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

Finally, turn on on create a hithub OAuth App
Authentication > Sign In / Up > Auth Providers > Github
