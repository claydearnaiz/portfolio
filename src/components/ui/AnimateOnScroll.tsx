"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "clip" | "none";
  duration?: number;
}

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: 50, scale: 0.96 },
          visible: { opacity: 1, y: 0, scale: 1 },
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -50, scale: 0.96 },
          visible: { opacity: 1, y: 0, scale: 1 },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: 60, scale: 0.97 },
          visible: { opacity: 1, x: 0, scale: 1 },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -60, scale: 0.97 },
          visible: { opacity: 1, x: 0, scale: 1 },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.88 },
          visible: { opacity: 1, scale: 1 },
        };
      case "clip":
        return {
          hidden: { opacity: 0, clipPath: "inset(20% 0 20% 0)" },
          visible: { opacity: 1, clipPath: "inset(0% 0 0% 0)" },
        };
      case "none":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1], // Cubic-bezier easeOutCubic for high-end cinematic feel
      }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

