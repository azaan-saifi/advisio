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
    <div className="flex shrink-0 items-center gap-4 rounded-md border border-zinc-700 bg-dark-400 p-3">
      <div
        className={`size-${height.toString()} overflow-hidden rounded-md border border-zinc-500  bg-purple-gradient`}
      >
        <Image src={image} alt={alt} width={width} height={height} />
      </div>
      <p className="text-sm text-light-500 max-sm:text-[10px] max-sm:leading-3">
        {content}
      </p>
    </div>
  );
};

export default InfoGrid;
