"use client";

import React from "react";

import { useChat } from "ai/react";
import Welcome from "./Welcome";
import Textarea19 from "./TextArea";
import { AssistantMessage, ThinkingMessage, UserMessage } from "./message";
import { Button } from "./ui/button";
import { IoSend } from "react-icons/io5";
import ChatScrollAnchor from "./ChatScrollAnchor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IUser } from "@/lib/database/models/user.model";

interface Props {
  user: string;
}

const Chat = ({ user }: Props) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      maxSteps: 5,
    });

  const userData: IUser = JSON.parse(user);
  const router = useRouter();

  if (!userData?.clerkId && messages.length > 0) {
    router.push("/sign-in");
  }

  const handleUserSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userData?.clerkId) {
      toast.error("Please Login First");
      return;
    }

    handleSubmit(event);
  };

  return (
    <>
      <div className="bg-primary-100 pb-[100px] pt-24">
        <div className="hide-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto px-4 sm:pb-6">
          {messages.length === 0 && <Welcome />}
          {messages.map((message) => (
            <>
              <div key={message.id}>
                {message.role === "user" ? (
                  <UserMessage
                    picture={JSON.stringify(userData?.picture) || undefined}
                    content={message.content}
                  />
                ) : (
                  <AssistantMessage
                    toolInvocations={message.toolInvocations}
                    content={message.content}
                  />
                )}
              </div>
              <ChatScrollAnchor messages={messages} />
            </>
          ))}
          {isLoading &&
            messages.length > 0 &&
            messages[messages.length - 1].role === "user" && (
              <ThinkingMessage />
            )}
        </div>
        <div className="fixed inset-x-0 bottom-0 w-full  pb-4 sm:bottom-0 sm:pb-10">
          <div className="px-4 pb-2 sm:pb-4">
            <div className="mx-auto sm:max-w-3xl">
              <form onSubmit={handleUserSubmit} className="relative">
                <Textarea19
                  isLoading={isLoading}
                  input={input}
                  handleInputChange={handleInputChange}
                />
                <Button
                  type="submit"
                  disabled={!input.length}
                  className="absolute bottom-2 right-2 border-none bg-purple-gradient px-3 py-5 text-white hover:bg-primary-50"
                >
                  <IoSend />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
