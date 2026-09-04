"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    let dispose: (() => void) | undefined;
    const sync = () => {
      dispose?.();
      dispose = undefined;
      if (!media.matches) return;
      const lenis = new Lenis({
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      });

      let rafId = 0;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
      dispose = () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    };
    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      dispose?.();
    };
  }, []);

  return <>{children}</>;
};
