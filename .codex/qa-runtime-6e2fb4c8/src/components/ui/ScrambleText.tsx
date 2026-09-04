"use client";

import React, { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ScrambleTextProps {
  text: string;
  className?: string;
  durationMs?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*//_SYS_";

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = "",
  durationMs = 450,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (shouldReduceMotion || !containerRef.current) return;

      const el = containerRef.current;
      const len = text.length;

      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          let startTime: number | null = null;

          function frame(ts: number) {
            if (!startTime) startTime = ts;
            const elapsed = ts - startTime;
            const progress = Math.min(elapsed / durationMs, 1);

            let resultStr = "";
            for (let i = 0; i < len; i++) {
              if (text[i] === " " || text[i] === "/" || text[i] === "-") {
                resultStr += text[i];
                continue;
              }
              const charThreshold = (i / len) * 0.6 + 0.15;
              if (progress >= charThreshold) {
                resultStr += text[i];
              } else {
                resultStr += CHARS[Math.floor(Math.random() * CHARS.length)];
              }
            }

            if (el) el.textContent = resultStr;

            if (progress < 1) {
              requestAnimationFrame(frame);
            } else if (el) {
              el.textContent = text;
            }
          }

          requestAnimationFrame(frame);
        },
      });
    },
    { scope: containerRef, dependencies: [text, durationMs, shouldReduceMotion] }
  );

  return (
    <span ref={containerRef} className={`font-mono inline-block ${className}`}>
      {text}
    </span>
  );
};
