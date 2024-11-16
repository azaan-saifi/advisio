import React from "react";
import { GradientIcon } from "./icons";
import { FaGraduationCap } from "react-icons/fa6";
import InfoGrid from "./InfoGrid";

const Welcome = () => {
  return (
    <div className="sm:mt-4 mt-2 w-full max-w-3xl flex flex-col gap-6 max-sm:gap-3 items-center justify-center">
      <div className="flex relative items-end justify-center md:gap-4 gap-2">
        <div className="text-white md:text-5xl text-3xl font-bold">
          Welcome to{" "}
        </div>
        <div className="flex flex-col justify-center items-center max-sm:hidden">
          <GradientIcon
            icon={FaGraduationCap}
            gradientId="graduationGradientSignin"
            gradientColors={["#7d47e0", "#6225c5", "#4b1f96"]}
            size={48}
          />
          <span className="text-transparent bg-clip-text bg-purple-gradient font-bold md:text-5xl text-3xl">
            Advisio
          </span>
        </div>
        <div className="flex flex-col justify-center items-center sm:hidden">
          <GradientIcon
            icon={FaGraduationCap}
            gradientId="graduationGradientSignin"
            gradientColors={["#7d47e0", "#6225c5", "#4b1f96"]}
            size={30}
          />
          <span className="text-transparent bg-clip-text bg-purple-gradient font-bold md:text-5xl text-3xl">
            Advisio
          </span>
        </div>
      </div>
      <p className="text-light-700 text-center max-w-2xl w-full sm:px-10 px-4 max-sm:text-sm">
        {" "}
        Your personal boardroom of AI experts. Unlock clarity, make confident
        decisions, and explore new possibilities for your business.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-sm:gap-3 px-5 max-sm:mt-5">
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
      </div>
    </div>
  );
};

export default Welcome;
