"use client";

import React, { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  className?: string;
  speed?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  direction = "left",
  className = "",
  speed = 70,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const [, setIsHovered] = useState(false);
  const xRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
  };

  // Infinite smooth frame-rate-independent marquee loop
  useGSAP(
    () => {
      if (shouldReduceMotion || !containerRef.current || !trackRef.current) return;

      const container = containerRef.current;
      const track = trackRef.current;
      const dirMultiplier = direction === "right" ? 1 : -1;
      let animFrameId: number;
      let lastTime = performance.now();

      function step(now: number) {
        if (!track || !container) return;

        const trackWidth = track.offsetWidth;
        if (!trackWidth) {
          lastTime = now;
          animFrameId = requestAnimationFrame(step);
          return;
        }

        // Calculate actual delta time in seconds (capped at 0.1s to prevent jumps after tab blur)
        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        // Initialize xRef position on first frame if null
        if (xRef.current === null) {
          xRef.current = direction === "right" ? -trackWidth : 0;
        }

        // Maintain constant speed (pauses on hover), perfectly independent of monitor refresh rate
        const currentSpeed = isHoveredRef.current ? 0 : speed;
        xRef.current += dirMultiplier * currentSpeed * dt;

        // Seamless wrap-around logic: track 1 and track 2 are visually identical
        if (direction === "left" && xRef.current <= -trackWidth) {
          xRef.current += trackWidth;
        } else if (direction === "right" && xRef.current >= 0) {
          xRef.current -= trackWidth;
        }

        container.style.transform = `translate3d(${xRef.current}px, 0, 0)`;

        animFrameId = requestAnimationFrame(step);
      }

      animFrameId = requestAnimationFrame(step);

      return () => {
        cancelAnimationFrame(animFrameId);
      };
    },
    { scope: containerRef, dependencies: [items, direction, speed, shouldReduceMotion] }
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

  const doubleItems = [...items, ...items];

  return (
    <div
      tabIndex={-1}
      aria-label="Technology Stack Ticker"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`overflow-hidden whitespace-nowrap flex select-none ${className}`}
    >
      <div
        ref={containerRef}
        className="flex items-center will-change-transform"
      >
        {/* Track 1 */}
        <div ref={trackRef} className="flex items-center gap-8 shrink-0 pr-8">
          {doubleItems.map((item, index) => (
            <span
              key={`t1-${index}`}
              aria-hidden={index >= items.length ? "true" : undefined}
              className="inline-flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-neutral-300"
            >
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] inline-block shadow-[0_0_6px_#00d4ff]" />
            </span>
          ))}
        </div>

        {/* Track 2 (Identical duplicate for seamless infinite looping) */}
        <div className="flex items-center gap-8 shrink-0 pr-8" aria-hidden="true">
          {doubleItems.map((item, index) => (
            <span
              key={`t2-${index}`}
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

