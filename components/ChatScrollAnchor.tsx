"use client";

import React, { useEffect, useRef } from "react";

const ChatScrollAnchor = ({ messages }: any) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return <div ref={bottomRef} className="h-px w-full" />;
};

export default ChatScrollAnchor;
