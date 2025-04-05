import { streamText } from "ai";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { returnPrompt } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  const supabase = await createClient();

  const { data: profiles } = await supabase.from("profiles").select("credits");

  if (profiles![0].credits === 0) {
    return Response.json(
      {
        error: {
          message: "Not enough Credits",
        },
      },
      { status: 400 }
    );
  }

  const { messages } = await req.json();

  const systemPrompt = returnPrompt();

  const result = streamText({
    model: google("gemini-2.0-pro-exp-02-05"),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
