"use client";

import React from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "clip" | "none";
  duration?: number;
}

/**
 * Content sections stay visible even when a visitor jumps past them with an
 * anchor link or a large touch scroll. Motion belongs to bounded interactions,
 * not to a visibility gate that can hide the page's primary content.
 */
export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
);
