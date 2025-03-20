'use client'

import React, { useRef, useEffect, useState } from 'react'
import { ClaudeChat } from './my-components/chatui'
import CodeBlock from './my-components/code-block'
import { useChat } from '@ai-sdk/react'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Home() {
  const { messages, handleInputChange, handleSubmit, status, input } = useChat({})

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const [code, setCode] = useState<string>('<h1>Hi</h1>')

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const stripCode = (componentCode: string) => {
    const regex = /return\s*\(\s*([\s\S]*?)\s*\);/
    const match = componentCode.match(regex)

    if (match && match[1]) {
      return match[1].trim()
    }
  }
  useEffect(() => {
    if (status !== 'ready') return

    if (messages.length < 2) return
    console.log(messages[messages.length - 1].content)

    const stripped = stripCode(messages[messages.length - 1].content)

    if (stripped !== undefined) {
      setCode(stripped)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Chat Panel */}
      <div className="w-1/2 bg-gray-100 border-r border-gray-300 flex flex-col p-4">
        <h2 className="text-xl font-bold mb-4">Open Gemini UI</h2>

        {/* Messages Container */}
        <div className="overflow-y-auto mb-4  h-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-3 p-3 rounded-lg max-w-4/5 ${
                message.role === 'user' ? 'bg-green-100' : 'bg-gray-200 ml-auto'
              }`}
            >
              {message.role !== 'user' ? (
                <CodeBlock code={message.content} />
              ) : (
                `${message.content}`
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex mt-auto">
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
              value={input}
              className="flex w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>

      {/* Renderer Panel */}
      <div className="w-1/2 h-full bg-white flex flex-col p-4">
        <h2 className="text-xl font-bold mb-4">UI</h2>

        <div className="h-full flex justify-center items-center">
          <ScrollArea className="h-full w-full">
            <ClaudeChat code={code} />
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
