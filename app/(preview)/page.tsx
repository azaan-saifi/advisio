"use client";

import { useRef, useState } from "react";
import { Message } from "@/components/message";
import { useScrollToBottom } from "@/components/use-scroll-to-bottom";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { SendHorizontal } from "lucide-react";

export default function Home() {
  const { messages, handleSubmit, input, setInput, isLoading } = useChat();
  const [currentPersonality, setCurrentPersonality] = useState<
    string | undefined
  >(undefined);
  {
    messages.length > 0 && console.log(messages);
  }

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const handleUserSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check for personality in user input before sending
    const personalityMatch = input.match(
      /(?:^|\s)(elon|steve|warren)(?=\s|$)/i
    );
    if (personalityMatch) {
      setCurrentPersonality(personalityMatch[1].toLowerCase());
    }

    // Trigger the chat submission
    handleSubmit(event);
  };

  return (
    <div className="flex flex-row justify-center pb-20 h-dvh w-full bg-[#0d183a]">
      <div className="flex flex-col justify-between gap-4 ">
        <div
          ref={messagesContainerRef}
          className="flex flex-col gap-6 h-full w-dvw items-center overflow-y-hidden"
        >
          {messages.map((message) => {
            // Check for personality name in the content
            const personalityMatch = message.content.match(/^\[(.*?)\]/);
            const personality = personalityMatch
              ? personalityMatch[1].toLowerCase()
              : undefined;
            const contentWithoutPersonality = personalityMatch
              ? message.content.replace(/^\[(.*?)\]\s*/, "")
              : message.content;

            return (
              <Message
                key={message.id}
                role={message.role}
                content={contentWithoutPersonality}
                personality={personality}
              />
            );
          })}

          {isLoading && !messages.some((msg) => msg.role === "assistant") && (
            <Message
              role="assistant"
              content="typing..."
              personality={currentPersonality}
            />
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="fixed inset-x-0 bottom-0 w-full bg-dark-medium pb-4 sm:bottom-0 sm:pb-10">
          <div className="mx-auto px-4 sm:max-w-3xl">
            <form onSubmit={handleUserSubmit} action="">
              <div className="relative flex max-h-52 w-full grow flex-col">
                <TextareaAutosize
                  ref={inputRef}
                  tabIndex={0}
                  onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      handleUserSubmit(e);
                      setInput("");
                    }
                  }}
                  placeholder="Send a message"
                  className="min-h-[40px] w-full resize-none overflow-hidden rounded-xl border border-zinc-600 bg-[#060e24] py-4 pl-6 pr-16 text-[16px] text-white font-medium focus-within:outline-none"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="absolute bottom-2.5 right-2.5">
                  <Button
                    type="submit"
                    size="icon"
                    disabled={input.length === 0}
                    className="rounded-[6px] bg-white hover:bg-zinc-300"
                  >
                    <SendHorizontal className="size-6 text-[#060e24]" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
