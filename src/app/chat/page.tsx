"use client";

import React, { useRef, useEffect, useState } from "react";
// import { ClaudeChat } from "./my-components/chatui";
import CodeBlock from "../my-components/code-block";
import { useChat } from "@ai-sdk/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClaudeChat } from "../my-components/chatui";
import { supabaseClient as supabase } from "@/lib/supabase/client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Profile, SupbaseUserResponse, UserInfo } from "@/lib/types";

export default function Home() {
  const { messages, handleInputChange, handleSubmit, status, input } = useChat(
    {}
  );

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [code, setCode] = useState<string>("");
  const [profile, setProfile] = useState<Profile | null>(null);

  function extractReturnJSX(componentCode: string) {
    // Regex to match the content inside return (...)
    const returnRegex = /return\s*\(\s*([\s\S]*?)\s*\)\s*;/;

    // Execute the regex
    const match = componentCode.match(returnRegex);

    if (match && match[1]) {
      // Trim whitespace and return the JSX
      return match[1].trim();
    }

    return null;
  }

  const getUserCall = async () => {
    const {
      data: { user },
    } = (await supabase.auth.getUser()) as unknown as SupbaseUserResponse;

    if (user) {
      getProfile(user);
    }
  };

  const getProfile = async (data: UserInfo) => {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.id);

    if (profiles !== null) {
      setProfile(profiles[0]);
    }
  };

  useEffect(() => {
    getUserCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (status !== "ready") return;

    if (messages.length < 2) return;

    const extracted = extractReturnJSX(messages[messages.length - 1].content);

    if (extracted !== null) {
      setCode(extracted);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  console.log("profile", profile);
  return (
    <div className="h-screen w-screen overflow-hidden">
      {/* Chat Panel */}
      <SidebarProvider defaultOpen={false} className="w-screen h-screen ">
        {profile && <AppSidebar credits={profile.credits} />}
        <div className="w-screen h-full flex">
          <div className="w-1/2 h-full bg-gray-100 border-r border-gray-300 flex flex-col p-4">
            <SidebarTrigger />

            <div className="overflow-y-auto mb-4  h-full">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 p-3 rounded-lg max-w-4/5 ${
                    message.role === "user"
                      ? "bg-green-100"
                      : "bg-gray-200 ml-auto"
                  }`}
                >
                  {message.role !== "user" ? (
                    <CodeBlock code={message.content} />
                  ) : (
                    `${message.content}`
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

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
          <div className="w-1/2 h-full bg-white flex flex-col p-4">
            <div className="h-full flex justify-center items-center">
              <ScrollArea className="h-full w-full">
                <ClaudeChat genCode={code} />
              </ScrollArea>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
