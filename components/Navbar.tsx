"use client";
import { SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { GradientIcon } from "./icons";
import { FaGraduationCap } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="h-14 bg-dark-300 w-full px-4 py-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <div>
          <div className="flex flex-col justify-center items-center">
            <GradientIcon
              icon={FaGraduationCap}
              gradientId="graduationGradientSignin"
              gradientColors={["#7d47e0", "#6225c5", "#4b1f96"]}
              size={24}
            />
            <span className="text-transparent bg-clip-text bg-purple-gradient font-bold text-xl">
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
            className="text-white font-medium px-4 py-1 rounded-lg bg-purple-gradient shadow-purple-glow"
          >
            Sign in
          </Link>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
