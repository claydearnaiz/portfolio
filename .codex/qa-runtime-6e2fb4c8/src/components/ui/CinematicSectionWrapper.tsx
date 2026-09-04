"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface CinematicSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const CinematicSectionWrapper: React.FC<CinematicSectionWrapperProps> = ({
  children,
  className = "",
  id,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.88, 1, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.3]);
  const rotateX = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [10, 0, 0, -6]);
  const y = useTransform(scrollYProgress, [0, 0.45, 1], [60, 0, -40]);

  if (shouldReduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} id={id} className={`perspective-1000 ${className}`}>
      <motion.div
        style={{
          scale,
          opacity,
          rotateX,
          y,
          transformStyle: "preserve-3d",
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};
