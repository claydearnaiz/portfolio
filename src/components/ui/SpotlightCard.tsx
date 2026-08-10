"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/utils/cn";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className,
  spotlightColor = "rgba(0, 212, 255, 0.18)",
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(pointer: fine)");
      setIsFinePointer(media.matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isFinePointer) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mx", `${x}px`);
    cardRef.current.style.setProperty("--my", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => isFinePointer && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950/80 transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Spotlight Radial Glow Overlay (Module 16) */}
      {isFinePointer && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 220px at var(--mx, 50%) var(--my, 50%), ${spotlightColor}, transparent 80%)`,
          }}
        />
      )}

      {/* Card Inner Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
