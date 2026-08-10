"use client";

import React, { useRef } from "react";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "framer-motion";
import { ScrambleText } from "@/components/ui/ScrambleText";

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
  const headingRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      ref={headingRef}
      className={cn(
        "mb-12 sm:mb-16 space-y-4 relative overflow-hidden",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#00d4ff] border border-[#00d4ff]/30 px-3.5 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md shadow-[0_0_15px_rgba(0,212,255,0.1)]",
            align === "center" && "mx-auto"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
          <ScrambleText text={eyebrow} durationMs={450} />
        </div>
      )}

      <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-white uppercase leading-[0.95] font-mono">
        <ScrambleText text={title} durationMs={450} />
      </h2>

      {subtitle && (
        <p className="text-sm sm:text-base text-neutral-400 font-mono max-w-2xl leading-relaxed pt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};
