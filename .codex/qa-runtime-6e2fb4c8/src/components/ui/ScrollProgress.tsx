"use client";

import React from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-white z-50 origin-left pointer-events-none mix-blend-difference"
      style={{ scaleX }}
    />
  );
};
