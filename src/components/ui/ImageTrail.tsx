"use client";

import React, { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

interface ImageTrailProps {
  children: React.ReactNode;
  badges?: string[];
  className?: string;
}

const DEFAULT_BADGES = [
  "PYTHON",
  "C++",
  "NEXT.JS 14",
  "TYPESCRIPT",
  "AWS",
  "REST API",
  "DOCKER",
  "IoT EDGE",
];

export const ImageTrail: React.FC<ImageTrailProps> = ({
  children,
  badges = DEFAULT_BADGES,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const indexRef = useRef(0);
  const [isFinePointer, setIsFinePointer] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !isFinePointer || !containerRef.current) return;

    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 75) {
      lastPos.current = { x: e.clientX, y: e.clientY };

      const badgeText = badges[indexRef.current % badges.length];
      indexRef.current += 1;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const trailNode = document.createElement("div");
      trailNode.className =
        "pointer-events-none absolute z-30 px-3 py-1 text-[10px] font-mono font-bold tracking-widest text-[#00d4ff] bg-black/90 border border-[#00d4ff]/40 rounded-full shadow-[0_0_12px_rgba(0,212,255,0.25)] transition-all duration-700 ease-out";
      trailNode.style.left = `${x - 40}px`;
      trailNode.style.top = `${y - 15}px`;
      trailNode.style.opacity = "0.9";
      trailNode.style.transform = `scale(0.85) rotate(${Math.floor(Math.random() * 16 - 8)}deg)`;

      containerRef.current.appendChild(trailNode);
      trailNode.textContent = `[ ${badgeText} ]`;

      requestAnimationFrame(() => {
        trailNode.style.opacity = "0";
        trailNode.style.transform = `scale(0.6) translateY(-20px) rotate(${Math.floor(Math.random() * 30 - 15)}deg)`;
      });

      setTimeout(() => {
        if (trailNode.parentNode) {
          trailNode.parentNode.removeChild(trailNode);
        }
      }, 700);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};
