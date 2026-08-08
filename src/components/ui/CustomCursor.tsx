"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string>("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Motion values for instant 60/120fps cursor tracking without React re-renders
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast, tight spring configuration for zero-lag responsiveness
  const springConfig = { damping: 28, stiffness: 700, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    let lastHovered = false;
    let lastText = "";

    const onMouseMove = (e: MouseEvent) => {
      // Direct motion value update - avoids React component re-rendering on mousemove
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) {
        if (lastHovered) {
          setIsHovered(false);
          lastHovered = false;
        }
        if (lastText !== "") {
          setCursorText("");
          lastText = "";
        }
        return;
      }

      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorAttr) {
        if (!lastHovered) {
          setIsHovered(true);
          lastHovered = true;
        }
        if (lastText !== cursorAttr) {
          setCursorText(cursorAttr);
          lastText = cursorAttr;
        }
        return;
      }

      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer");

      if (isInteractive) {
        if (!lastHovered) {
          setIsHovered(true);
          lastHovered = true;
        }
        if (lastText !== "") {
          setCursorText("");
          lastText = "";
        }
      } else {
        if (lastHovered) {
          setIsHovered(false);
          lastHovered = false;
        }
        if (lastText !== "") {
          setCursorText("");
          lastText = "";
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  if (isTouchDevice || shouldReduceMotion) return null;

  const size = cursorText ? 48 : 32;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Ring / Context Label Circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/50 pointer-events-none mix-blend-difference flex items-center justify-center text-[9px] font-mono font-black tracking-tighter text-white uppercase"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: size,
          height: size,
        }}
        animate={{
          scale: isHovered ? (cursorText ? 1.25 : 1.75) : 1,
          borderColor: isHovered ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.4)",
          backgroundColor: isHovered ? (cursorText ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.12)") : "transparent",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {cursorText}
      </motion.div>

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};


