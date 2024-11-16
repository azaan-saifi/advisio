import Image from "next/image";
import React from "react";

interface Props {
  image: string;
  alt: string;
  content: string;
  width: number;
  height: number;
}

const InfoGrid = ({ image, alt, content, width, height }: Props) => {
  return (
    <div className="flex flex-shrink-0 items-center gap-4 p-3 border border-zinc-700 bg-dark-400 rounded-md">
      <div
        className={`overflow-hidden size-${height} rounded-md border border-zinc-500  bg-purple-gradient`}
      >
        <Image src={image} alt={alt} width={width} height={height} />
      </div>
      <p className="text-sm max-sm:text-[10px] max-sm:leading-3 text-light-500">
        {content}
      </p>
    </div>
  );
};

export default InfoGrid;
