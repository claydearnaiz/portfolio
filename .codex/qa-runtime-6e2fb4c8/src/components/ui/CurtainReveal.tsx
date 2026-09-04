"use client";

import React, { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface CurtainRevealProps {
  leftTitle?: string;
  rightTitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const CurtainReveal: React.FC<CurtainRevealProps> = ({
  leftTitle = "CAPSTONE",
  rightTitle = "DEPLOYMENT",
  children,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (shouldReduceMotion || !containerRef.current || !leftDoorRef.current || !rightDoorRef.current) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      timeline
        .to(leftDoorRef.current, { xPercent: -102, ease: "power2.inOut" }, 0)
        .to(rightDoorRef.current, { xPercent: 102, ease: "power2.inOut" }, 0);
    },
    { scope: containerRef, dependencies: [shouldReduceMotion] }
  );

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen bg-black overflow-hidden flex items-center justify-center ${className}`}
    >
      {/* Revealed Content Behind the Curtains */}
      <div className="relative z-10 w-full">{children}</div>

      {/* Left Curtain Door */}
      <div
        ref={leftDoorRef}
        className="absolute top-0 bottom-0 left-0 w-1/2 bg-neutral-950 border-r border-[#00d4ff]/30 z-20 flex items-center justify-end pr-6 sm:pr-12 select-none shadow-[10px_0_30px_rgba(0,0,0,0.8)]"
      >
        <h2 className="text-3xl sm:text-6xl lg:text-8xl font-black font-mono tracking-tighter text-[#00d4ff] uppercase leading-none">
          {leftTitle}
        </h2>
      </div>

      {/* Right Curtain Door */}
      <div
        ref={rightDoorRef}
        className="absolute top-0 bottom-0 right-0 w-1/2 bg-neutral-950 border-l border-[#00d4ff]/30 z-20 flex items-center justify-start pl-6 sm:pl-12 select-none shadow-[-10px_0_30px_rgba(0,0,0,0.8)]"
      >
        <h2 className="text-3xl sm:text-6xl lg:text-8xl font-black font-mono tracking-tighter text-white uppercase leading-none">
          {rightTitle}
        </h2>
      </div>
    </div>
  );
};
