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
      className={`flex w-full flex-row items-end gap-4 px-4 ${
        role === "user" && "justify-end"
      } sm:max-w-3xl sm:px-8`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {role === "assistant" && (
        <div
          className={`flex size-[24px] shrink-0 flex-col items-center justify-center text-white `}
        >
          {renderIcon()}
        </div>
      )}

      <div
        className={`flex max-w-[85%] flex-col gap-6 rounded-lg p-2 ${
          role === "user"
            ? "rounded-br-none bg-purple-gradient"
            : "rounded-bl-none border border-zinc-700 bg-dark-400"
        }`}
      >
        {content && (
          <div className="flex flex-col gap-4 text-white">
            <Markdown>{content as string}</Markdown>
          </div>
        )}
      </div>

      {/* {role === "user" && (
        <div
          className={`size-7 flex flex-col justify-center items-center flex-shrink-0 text-zinc-400 `}
        >
          {renderIcon()}
        </div>
      )} */}
    </motion.div>
  );
};
