"use client";

import { Textarea } from "@/components/ui/textarea";
import React, { ChangeEvent, useRef } from "react";
import { toast } from "sonner";

interface Props {
  isLoading: boolean;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea19({
  isLoading,
  input,
  handleInputChange,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const defaultRows = 1;
  const maxRows = 7;

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";

    const style = window.getComputedStyle(textarea);
    const borderHeight =
      parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
    const paddingHeight =
      parseInt(style.paddingTop) + parseInt(style.paddingBottom);

    const lineHeight = parseInt(style.lineHeight);
    const maxHeight = maxRows
      ? lineHeight * maxRows + borderHeight + paddingHeight
      : Infinity;

    const newHeight = Math.min(textarea.scrollHeight + borderHeight, maxHeight);

    textarea.style.height = `${newHeight}px`;

    handleInputChange(e);
  };

  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset to default
      textareaRef.current.rows = defaultRows; // Ensure rows reset
    }
  };

  return (
    <div className="relative flex max-h-52 w-full grow flex-col text-white">
      <Textarea
        id="textarea-19"
        placeholder="Send a message"
        ref={textareaRef}
        value={input}
        onChange={handleInput}
        rows={defaultRows}
        autoFocus
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            if (isLoading) {
              toast.error("Please wait for the model to finish its response!");
            } else if (input.trim()) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
              resetHeight();
            }
          }
        }}
        className="min-h-[48px] w-full resize-none overflow-hidden rounded-xl border border-zinc-700 bg-dark-400 py-4 pl-6 pr-16 text-[16px] outline-none placeholder:text-zinc-400 focus-within:outline-none"
      />
    </div>
  );
}
