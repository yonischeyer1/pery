import React from "react";

interface LeftPanelProps {
  title: string;
}

export default function LeftPanel({ title }: LeftPanelProps) {
  return (
    <div className="w-full md:w-[38.2%] h-1/2 md:h-auto bg-radial-left text-white flex items-center p-8">
      <h1 className="pl-[4.3%] w-[min-content] text-[64px] leading-tight font-gazpacho font-black leading-[84px]">
        {title}
      </h1>
    </div>
  );
}
