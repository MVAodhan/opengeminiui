'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { LiveProvider, LiveError, LivePreview } from 'react-live'

export const ClaudeChat = ({ code, noInline = false }: { code: string; noInline?: boolean }) => {
  return (
    <div className="flex flex-col h-full w-full">
      <ScrollArea>
        <LiveProvider code={code} noInline={noInline}>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </ScrollArea>
    </div>
  )
}
