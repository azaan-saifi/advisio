"use client";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import React from "react";
import { IconContext } from "react-icons";

interface GradientIconProps {
  icon: React.ElementType;
  gradientId: string;
  gradientColors: string[];
  size?: string | number;
}

export const GradientIcon: React.FC<GradientIconProps> = ({
  icon: Icon,
  gradientId,
  gradientColors,
  size = "1em",
}) => {
  const sizeValue = typeof size === "number" ? `${size}px` : size;

  return (
    <div style={{ width: sizeValue, height: sizeValue }}>
      <IconContext.Provider
        value={{
          size: "100%",
          style: {
            width: "100%",
            height: "100%",
          },
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 16 16">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {gradientColors.map((color, index) => (
                <stop
                  key={index}
                  offset={`${(index / (gradientColors.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          </defs>
          <Icon fill={`url(#${gradientId})`} />
        </svg>
      </IconContext.Provider>
    </div>
  );
};

export const CoordinatorIcon = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <div className="border border-zinc-700 overflow-hidden rounded-full">
            <Image
              src="/co-ordinator.avif"
              alt="(Coordinator)"
              width={24}
              height={24}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-dark-400 border border-light-500 px-1.5 py-1 mb-2">
          <p className="text-light-500 text-[12px]">(Coordinator)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const UserIcon = ({ picture }: { picture: string | undefined }) => {
  return (
    <div className="border border-zinc-700 overflow-hidden rounded-full">
      <Image
        src={picture ?? "/co-ordinator.avif"}
        alt="Co-ordinator"
        width={24}
        height={24}
      />
    </div>
  );
};

export const ElonIcon = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <div className="border border-zinc-700 overflow-hidden rounded-full">
            <Image src="/elon.jpg" alt="Elon Musk" width={24} height={24} />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-dark-400 border border-light-500 px-1.5 py-1 mb-2">
          <p className="text-light-500 text-[12px]">Elon Musk</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const SteveIcon = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <div className="border border-zinc-700 overflow-hidden rounded-full">
            <Image src="/steve.jpg" alt="Steve Jobs" width={24} height={24} />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-dark-400 border border-light-500 px-1.5 py-1 mb-2">
          <p className="text-light-500 text-[12px]">Steve Jobs</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const WarrenIcon = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <div className="border border-zinc-700 overflow-hidden rounded-full">
            <Image
              src="/warren.jpg"
              alt="Warren Buffet"
              width={24}
              height={24}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-dark-400 border border-light-500 px-1.5 py-1 mb-2">
          <p className="text-light-500 text-[12px]">Warren Buffet</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
