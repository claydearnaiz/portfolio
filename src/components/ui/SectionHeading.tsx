import React from "react";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}) => {
  return (
    <div
      className={cn(
        "mb-12 sm:mb-16 space-y-4",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neutral-300 border border-neutral-800 px-3.5 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md shadow-sm",
            align === "center" && "mx-auto"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-white uppercase leading-[0.95] drop-shadow-sm">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-neutral-400 font-mono max-w-2xl leading-relaxed pt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};
