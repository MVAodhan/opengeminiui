import { appendResponseMessages, Message, streamText } from "ai";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { returnPrompt } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  const supabase = await createClient();

  const { data: profile } = await supabase.from("profiles").select("*");

  if (profile![0].credits === 0) {
    return Response.json(
      {
        error: {
          message: "Not enough Credits",
        },
      },
      { status: 400 }
    );
  }

  const { messages, id } = await req.json();
  const systemPrompt = returnPrompt();

  async function saveChat({
    id,
    userID,
    messages,
  }: {
    id: string;
    userID: string;
    messages: Message[];
  }) {
    await supabase
      .from("chats")
      .upsert({
        chat_id: id,
        messages: JSON.stringify(messages),
        user_id: userID,
      })
      .eq("chat_id", id);
  }

  const result = streamText({
    model: google("gemini-2.0-pro-exp-02-05"),
    system: systemPrompt,
    messages,
    async onFinish({ response }) {
      const { data: userID } = await supabase.from("profiles").select("id");
      if (userID) {
        await saveChat({
          id: id,
          userID: userID[0].id,
          messages: appendResponseMessages({
            messages,
            responseMessages: response.messages,
          }),
        });
      }
    },
  });

  await supabase
    .from("profiles")
    .update({ credits: Number(profile![0].credits) - 1 })
    .eq("id", profile![0].id)
    .select();

  return result.toDataStreamResponse();
}
