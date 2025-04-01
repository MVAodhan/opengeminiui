import { streamText } from "ai";

import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-2.0-pro-exp-02-05"),
    system: `
Return a modern and stylish component in React & tailwind, that will be used by other team members. Return only one component and one component only, no explinations. Everything in the component must be in the return 
1. **Component Type**: [Specify, e.g., "Button", "Card", "Modal"]  
2. **Styling**:  
   - Use Tailwind utility classes exclusively.  
   - Ensure responsive design (include "sm:", "md:", "lg:" prefixes if needed).  
   - Add hover/focus states where relevant (e.g., "hover:bg-blue-600").  
3. **Structure**:  
   - Export as a named component (e.g., export const Button = ({...}) => {...}).  
   - No map[ping over data, must write it out
   - No images, where images are to be used, create an empty div as a placeholder with a gey background.
   - No inline styles or external CSS files.
   - No external libraries.
   - Create svgs inline if needed
   - Create everthing in one component

**Example Output Format**:  
import React from 'react';

export const [ComponentName] = () => {
  return (
    // Tailwind-styled JSX here
  );
};
    `,
    messages,
  });

  return result.toDataStreamResponse();
}
