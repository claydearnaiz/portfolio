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
            "text-xs uppercase tracking-widest text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
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
