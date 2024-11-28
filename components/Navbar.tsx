"use client";
import { SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { GradientIcon } from "./icons";
import { FaGraduationCap } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="h-14 w-full bg-[#211F37] px-4 py-6">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <div>
          <div className="flex flex-col items-center justify-center">
            <GradientIcon
              icon={FaGraduationCap}
              gradientId="graduationGradientSignin"
              gradientColors={["#7d47e0", "#6225c5", "#4b1f96"]}
              size={24}
            />
            <span className="bg-purple-gradient bg-clip-text text-xl font-bold text-transparent">
              Advisio
            </span>
          </div>
        </div>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-8 w-8",
            },
          }}
        />
        <SignedOut>
          <Link
            href={"/sign-in"}
            className="bg-purple-gradient shadow-purple-glow rounded-lg px-4 py-1 font-medium text-white"
          >
            Sign in
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
