import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const returnPrompt = () => {
  return `
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
   - Do no use variables, no hooks, only return ui, all logic will be implimented by others

**Example Output Format**:  
import React from 'react';

export const [ComponentName] = () => {
  return (
    // Tailwind-styled JSX here
  );
};
    `;
};
