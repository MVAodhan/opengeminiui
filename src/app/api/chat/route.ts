import { streamText } from "ai";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { returnPrompt } from "@/lib/utils";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = returnPrompt();

  const result = streamText({
    model: google("gemini-2.0-pro-exp-02-05"),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
