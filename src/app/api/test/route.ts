import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  const user = await supabase.auth.getUser();

  console.log(user);

  const body = await req.json();
  console.log(body);
  return Response.json({
    message: "hello ",
  });
}
