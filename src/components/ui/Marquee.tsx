"use client";

import React, { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Module 25 Kinetic Marquee: Infinite 60fps loop with GSAP ScrollTrigger velocity acceleration
  useGSAP(
    () => {
      if (shouldReduceMotion || !containerRef.current || !contentRef.current) return;

      const row = containerRef.current;
      const content = contentRef.current;
      const dirMultiplier = direction === "right" ? 1 : -1;
      const baseSpeed = 70; // Base speed in px/s
      let scrollVelocity = 0;
      let animFrameId: number;

      // Track scroll velocity in real-time
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          scrollVelocity = Math.abs(self.getVelocity());
        },
      });

      let contentWidth = content.offsetWidth;
      let x = direction === "right" ? -contentWidth : 0;

      function step() {
        if (!contentWidth && content) {
          contentWidth = content.offsetWidth;
        }

        // Accelerate when user scrolls down, pause on hover
        const currentVelocity = isHovered ? 0 : scrollVelocity;
        const currentSpeed = (baseSpeed + currentVelocity * 0.12) / 60;
        x += dirMultiplier * currentSpeed;

        if (direction === "left" && x <= -contentWidth) {
          x += contentWidth;
        } else if (direction === "right" && x >= 0) {
          x -= contentWidth;
        }

        if (row) {
          row.style.transform = `translate3d(${x}px, 0, 0)`;
        }

        // Decrypt velocity back to 0 smoothly
        scrollVelocity *= 0.95;
        animFrameId = requestAnimationFrame(step);
      }

      animFrameId = requestAnimationFrame(step);

      return () => {
        cancelAnimationFrame(animFrameId);
        st.kill();
      };
    },
    { scope: containerRef, dependencies: [items, direction, isHovered, shouldReduceMotion] }
  );

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-x-auto py-2 flex items-center justify-center gap-6 font-mono text-xs text-neutral-300 ${className}`}>
        {items.map((item, index) => (
          <span key={index} className="inline-flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    );
  }

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      tabIndex={-1}
      aria-label="Technology Stack Ticker"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`overflow-hidden whitespace-nowrap flex select-none ${className}`}
    >
      <div
        ref={containerRef}
        className="flex items-center gap-8 py-2.5 will-change-transform"
      >
        <div ref={contentRef} className="flex items-center gap-8">
          {repeatedItems.map((item, index) => (
            <span
              key={index}
              aria-hidden={index >= items.length ? "true" : undefined}
              className="inline-flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-neutral-300"
            >
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] inline-block shadow-[0_0_6px_#00d4ff]" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
