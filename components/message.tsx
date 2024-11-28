"use client";
import { motion } from "framer-motion";
import { TextShimmer } from "./TextShimmer";
import { IoSparklesSharp } from "react-icons/io5";
import { Markdown } from "./markdown";
import { ToolInvocation } from "ai";
import Image from "next/image";
import { UserIcon } from "lucide-react";

export const ThinkingMessage = () => {
  return (
    <motion.div
      className="mx-auto w-full max-w-3xl px-4 max-sm:px-2"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex w-full gap-4 rounded-lg max-sm:gap-2">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-700 text-white">
          <IoSparklesSharp />
        </div>

        <TextShimmer duration={1.5}>Thinking...</TextShimmer>
      </div>
    </motion.div>
  );
};

interface AssistantProps {
  content: string;
  toolInvocations: Array<ToolInvocation> | undefined;
}

export const AssistantMessage = ({
  content,
  toolInvocations,
}: AssistantProps) => {
  return (
    <motion.div
      className="mx-auto w-full max-w-3xl px-4 max-sm:px-2"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {content && (
        <div className="flex w-full items-start justify-start gap-4 rounded-lg max-sm:gap-2">
          <div className="mt-2 flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-600 text-white">
            <IoSparklesSharp />
          </div>
          <Markdown>{content}</Markdown>
        </div>
      )}

      {toolInvocations &&
        toolInvocations.map((toolInvocation) => {
          const { toolCallId, toolName, state } = toolInvocation;

          if (state !== "result") {
            return (
              <div key={toolCallId}>
                {toolName === "retrieveSpecificEventWithTimestamp" ? (
                  <div className="flex w-full items-start justify-start gap-4 rounded-lg max-sm:gap-2">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-600 text-white">
                      <IoSparklesSharp />
                    </div>
                    <TextShimmer>Searching for the event...</TextShimmer>
                  </div>
                ) : toolName === "getResource" ? (
                  <div key={toolCallId}>
                    <div className="flex w-full items-start justify-start gap-4 rounded-lg max-sm:gap-2">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-600 text-white">
                        <IoSparklesSharp />
                      </div>
                      <TextShimmer>Searching for the resource...</TextShimmer>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          } else {
            return null;
          }
        })}
    </motion.div>
  );
};

interface UserMessageProps {
  content: string;
  picture?: string;
}

export const UserMessage = ({ content, picture }: UserMessageProps) => {
  return (
    <motion.div
      className="mx-auto w-full max-w-3xl px-4 max-sm:px-2"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex w-full items-start  justify-end gap-4 rounded-lg max-sm:gap-2">
        <div className="max-w-full rounded-lg bg-purple-gradient p-3 text-white sm:max-w-[85%]">
          {content}
        </div>

        <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-600 text-white">
          {picture ? (
            <Image
              src={JSON.parse(picture)}
              height={32}
              width={32}
              alt="User"
            />
          ) : (
            <UserIcon />
          )}
        </div>
      </div>
    </motion.div>
  );
};
