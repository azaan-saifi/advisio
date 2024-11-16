"use client";

import { motion } from "framer-motion";
import {
  UserIcon,
  ElonIcon,
  SteveIcon,
  WarrenIcon,
  CoordinatorIcon,
} from "./icons";
import { ReactNode } from "react";
import { Markdown } from "./markdown";

export const Message = ({
  role,
  content,
  personality,
  picture,
}: {
  role: string;
  content: string | ReactNode;
  personality?: string;
  picture?: string;
}) => {
  const renderIcon = () => {
    console.log(picture);
    if (role === "assistant") {
      switch (personality?.toLocaleLowerCase()) {
        case "elon":
          return <ElonIcon />;
        case "steve":
          return <SteveIcon />;
        case "warren":
          return <WarrenIcon />;
        default:
          return <CoordinatorIcon />;
      }
    } else {
      if (picture) {
        return <UserIcon picture={JSON.parse(picture)} />;
      }
    }
  };

  return (
    <motion.div
      className={`flex flex-row items-end gap-4 px-4 w-full ${
        role === "user" && "justify-end"
      } sm:max-w-3xl sm:px-8`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {role === "assistant" && (
        <div
          className={`size-[24px] flex flex-col justify-center items-center flex-shrink-0 text-white `}
        >
          {renderIcon()}
        </div>
      )}

      <div
        className={`flex flex-col gap-6 max-w-[85%] p-2 rounded-lg ${
          role === "user"
            ? "bg-purple-gradient rounded-br-none"
            : "border border-zinc-700 bg-dark-400 rounded-bl-none"
        }`}
      >
        {content && (
          <div className="text-white flex flex-col gap-4">
            <Markdown>{content as string}</Markdown>
          </div>
        )}
      </div>

      {role === "user" && (
        <div
          className={`size-7 flex flex-col justify-center items-center flex-shrink-0 text-zinc-400 `}
        >
          {renderIcon()}
        </div>
      )}
    </motion.div>
  );
};
