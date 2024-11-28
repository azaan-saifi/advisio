import React from "react";
import { GradientIcon } from "./icons";
import { FaGraduationCap } from "react-icons/fa6";

const Welcome = () => {
  return (
    <div className="mx-auto mt-2 flex w-full max-w-3xl flex-col items-center justify-center gap-6 max-sm:gap-3 sm:mt-4">
      <div className="relative flex items-end justify-center gap-2 md:gap-4">
        <div className="text-3xl font-bold text-white md:text-5xl">
          Welcome to{" "}
        </div>
        <div className="flex flex-col items-center justify-center max-sm:hidden">
          <GradientIcon
            icon={FaGraduationCap}
            gradientId="graduationGradientSignin"
            gradientColors={["#7d47e0", "#6225c5", "#4b1f96"]}
            size={48}
          />
          <span className="bg-purple-gradient bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
            Advisio
          </span>
        </div>
        <div className="flex flex-col items-center justify-center sm:hidden">
          <GradientIcon
            icon={FaGraduationCap}
            gradientId="graduationGradientSignin"
            gradientColors={["#7d47e0", "#6225c5", "#4b1f96"]}
            size={30}
          />
          <span className="bg-purple-gradient bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
            Advisio
          </span>
        </div>
      </div>
      <p className="w-full max-w-2xl px-4 text-center text-light-700 max-sm:text-sm sm:px-10">
        {" "}
        Your personal boardroom of AI experts. Unlock clarity, make confident
        decisions, and explore new possibilities for your business.
      </p>

      {/* <div className="grid grid-cols-1 gap-6 px-5 max-sm:mt-5 max-sm:gap-3 sm:grid-cols-2">
        <InfoGrid
          image="/elon.jpg"
          alt="Elon Musk"
          content="Need disruptive strategies for scaling or innovation? Ask Elon to
          ignite your vision."
          width={35}
          height={30}
        />
        <InfoGrid
          image="/steve.jpg"
          alt="Steve Jobs"
          content="Struggling to create a game-changing product or craft a brand story? Let Steve guide you to think differently"
          width={35}
          height={35}
        />
        <InfoGrid
          image="/warren.jpg"
          alt="Warren Buffet"
          content="Looking for wise financial insights? Seek Warren’s guidance to make sound investments."
          width={32}
          height={32}
        />
        <InfoGrid
          image="/co-ordinator.avif"
          alt="Mark((Coordinator))"
          content="Not sure who to ask? Mark (Coordinator) is here to steer the conversation in the right direction."
          width={30}
          height={30}
        />
      </div> */}
    </div>
  );
};

export default Welcome;
