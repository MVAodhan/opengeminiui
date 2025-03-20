import { streamText } from 'ai'

import { createGoogleGenerativeAI } from '@ai-sdk/google'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: google('gemini-2.0-flash-lite-preview-02-05'),
    system:
      'You are a helpful design assistant, you are a expert in design and code and can code really high quality react and tailwind. You must return a code that will render in react live LivePreview Always return tsx code with tailwind styles. Your code is always really visually pleasing and vibrant. Your task is to meet the users requirements while only retuning only react elements that fits inside a main tag with the following styles h-full, flex, flex-col. ',
    messages,
  })

  return result.toDataStreamResponse()
}
