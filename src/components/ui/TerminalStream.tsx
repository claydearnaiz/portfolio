"use client";

import React, { useState, useEffect } from "react";
import { Terminal, RotateCcw } from "lucide-react";

const commandSnippets = [
  { prompt: "$ git push origin main", output: "Enumerating objects: 12, done. Branch 'main' set up to track remote." },
  { prompt: "$ python main.py", output: "Loading YOLOv8n-NCNN model... ROI Person Counting active: 14 Diners detected." },
  { prompt: "$ SELECT * FROM canteen_bins WHERE fill_level > 80;", output: "3 rows returned [ST1, ST2, FRC2] - Status: CRITICAL OVERFLOW RISK" },
  { prompt: "$ npm run dev", output: "▲ Next.js 14.2.35 - Local: http://localhost:3000 (Compiled in 1.4s)" },
  { prompt: "$ g++ -O3 main.cpp -o app && ./app", output: "Memory allocated: 1024KB. Microcontroller sensor telemetry stream connected." },
];

export const TerminalStream: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentSnippet = commandSnippets[index];
    let charIndex = 0;
    setDisplayText("");
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIndex < currentSnippet.prompt.length) {
        setDisplayText(currentSnippet.prompt.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        const delayTimeout = setTimeout(() => {
          setIndex((prev) => (prev + 1) % commandSnippets.length);
        }, 2800);

        return () => clearTimeout(delayTimeout);
      }
    }, 45);

    return () => clearInterval(typingInterval);
  }, [index]);

  const activeSnippet = commandSnippets[index];

  return (
    <div className="p-4 border border-neutral-800/90 bg-neutral-950/90 rounded-xl space-y-3 font-mono text-xs shadow-xl relative overflow-hidden">
      {/* Custom Terminal Header */}
      <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#00d4ff] font-bold font-mono">
            [ CLI TERMINAL ]
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIndex((prev) => (prev + 1) % commandSnippets.length)}
          className="text-neutral-400 hover:text-[#00d4ff] transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
          title="Next command"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Code Animation Window */}
      <div className="space-y-1.5 min-h-[70px]">
        <div className="text-white font-bold flex items-center gap-1">
          <span>{displayText}</span>
          {isTyping && <span className="animate-pulse w-2 h-4 bg-[#00d4ff] inline-block" />}
        </div>
        {!isTyping && (
          <div className="text-neutral-300 text-[11px] leading-relaxed animate-fade-in pl-2 border-l border-[#00d4ff]/40">
            {activeSnippet.output}
          </div>
        )}
      </div>
    </div>
  );
};
