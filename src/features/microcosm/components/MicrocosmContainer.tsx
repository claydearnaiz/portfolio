"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MicrocosmHUD } from "./MicrocosmHUD";

// Lazy-load the heavy 3D Canvas so it doesn't bloat the main portfolio bundle
const LazyCanvas = React.lazy(() =>
  import("./MicrocosmCanvas").then((mod) => ({ default: mod.MicrocosmCanvas }))
);

interface MicrocosmContainerProps {
  onExit: () => void;
}

export const MicrocosmContainer: React.FC<MicrocosmContainerProps> = ({ onExit }) => {
  const [bootPhase, setBootPhase] = useState(0); // 0=loading, 1=ready
  const [bootLines, setBootLines] = useState<string[]>([]);

  useEffect(() => {
    const lines = [
      "Initializing ecosystem...",
      "Generating world geometry...",
      "Calibrating atmosphere...",
      "Spawning lifeforms...",
      "Establishing biome parameters...",
      "Ready.",
    ];

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < lines.length) {
        setBootLines((prev) => [...prev, lines[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBootPhase(1), 400);
      }
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-black overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {bootPhase === 0 ? (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-[#020617]"
          >
            <div className="max-w-lg w-full px-6 space-y-3">
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
                MICROCOSM v1.0
              </div>
              <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-950/80 space-y-1.5 font-mono text-xs">
                {bootLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`${line === "Ready." ? "text-emerald-400 font-bold" : "text-neutral-400"}`}
                  >
                    <span className="text-neutral-600 mr-2">&gt;</span>
                    {line}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <span className="inline-block w-2 h-3.5 bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="world"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <React.Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center bg-[#020617]">
                  <div className="text-xs font-mono text-neutral-500 animate-pulse">
                    Loading 3D environment...
                  </div>
                </div>
              }
            >
              <LazyCanvas />
            </React.Suspense>

            <MicrocosmHUD onExit={onExit} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
