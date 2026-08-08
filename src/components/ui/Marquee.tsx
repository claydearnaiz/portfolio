"use client";

import React from "react";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  direction = "left",
  className = "",
}) => {
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap flex select-none ${className}`}>
      <div
        className={`flex items-center gap-8 py-3 animate-marquee ${
          direction === "right" ? "[animation-direction:reverse]" : ""
        }`}
      >
        {repeatedItems.map((item, index) => (
          <span key={index} className="inline-flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-neutral-400">
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
};
