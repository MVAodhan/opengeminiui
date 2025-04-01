"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { LiveProvider, LiveError, LivePreview } from "react-live";

export const TestUi = ({ genCode }: { genCode: string }) => {
  const code = `
  render(
  <main className='w-full h-full flex justify-center pt-20'>
    ${genCode}
  </main>
  )
`;

  return (
    <div className="flex flex-col h-full w-full">
      <ScrollArea>
        <LiveProvider code={code} noInline>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </ScrollArea>
    </div>
  );
};
