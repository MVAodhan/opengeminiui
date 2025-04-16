"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { supabaseClient as supabase } from "@/lib/supabase/client";

export const NameSubmitInput = ({ id }: { id: string }) => {
  const [pending, setPending] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [chatName, setChatName] = useState<string | null>(null);

  const updateName = async () => {
    setPending(true);
    const { error } = await supabase
      .from("chats")
      .upsert({
        name: `${nameRef!.current!.value}`,
        chat_id: id,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      })
      .eq("chat_id", id);

    if (error) {
      console.log(error);
    }

    setPending(false);
  };

  const getChatName = async () => {
    const { data: chats, error } = await supabase
      .from("chats")
      .select("name")
      .eq("chat_id", id);
    if (!error) {
      setChatName(chats[0].name);
    }
  };

  useEffect(() => {
    if (id) {
      getChatName();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="flex items-center space-x-2 rounded-lg">
      <input
        type="text"
        defaultValue={chatName ? chatName : ""}
        ref={nameRef}
        placeholder="Name your chat"
        aria-label="Enter your name"
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-150 ease-in-out"
      />
      <Button
        variant="outline"
        onClick={updateName}
        aria-label="Submit name"
        className="inline-flex items-center justify-center px-4 py-2 rounded-md shadow-sm  focus:outline-none"
      >
        {!pending && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // Added text-green-400 for the SVG color
            className="h-5 w-5 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            // stroke="currentColor" uses the text color defined in className
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}

        {pending && (
          <div
            className="w-5 h-5 border border-gray-200 border-t-blue-500 rounded-full animate-spin"
            role="status" // Added for accessibility
            aria-live="polite" // Added for accessibility
            aria-label="Loading" // Added for accessibility
          >
            {/* Visually hidden text for screen readers */}
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </Button>
    </div>
  );
};
