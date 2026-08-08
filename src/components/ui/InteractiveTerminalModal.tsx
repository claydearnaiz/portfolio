"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/personal";
import { skillsData } from "@/data/skills";
import { projectsData } from "@/data/projects";
import { experienceData } from "@/data/experience";

// Lazy-load Microcosm so it doesn't bloat the main bundle
const LazyMicrocosm = React.lazy(() =>
  import("@/features/microcosm/components/MicrocosmContainer").then((mod) => ({
    default: mod.MicrocosmContainer,
  }))
);

export const InteractiveTerminalModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [microcosmActive, setMicrocosmActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<Array<{ command: string; response: React.ReactNode }>>([
    {
      command: "help",
      response: (
        <div className="space-y-1.5 text-neutral-300">
          <p className="text-white font-bold">Welcome to Clayde&apos;s Interactive Shell v3.0</p>
          <p className="text-xs text-neutral-400">Type any command below or click a quick shortcut:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1 text-[11px] font-mono">
            <span className="text-emerald-400">whoami</span>
            <span className="text-emerald-400">skills</span>
            <span className="text-emerald-400">projects</span>
            <span className="text-emerald-400">experience</span>
            <span className="text-emerald-400">contact</span>
            <span className="text-emerald-400">game</span>
            <span className="text-emerald-400">sudo hire</span>
            <span className="text-emerald-400">clear</span>
          </div>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    let resp: React.ReactNode;

    switch (cleanCmd) {
      case "help":
        resp = (
          <div className="space-y-1 text-neutral-300">
            <p className="text-emerald-400 font-bold">Available commands:</p>
            <p>• <span className="text-white font-bold">whoami</span> - Display Clayde&apos;s profile & background</p>
            <p>• <span className="text-white font-bold">skills</span> - List primary & project technical skills</p>
            <p>• <span className="text-white font-bold">projects</span> - View LINIS thesis system architecture</p>
            <p>• <span className="text-white font-bold">experience</span> - View OJT internship & degree details</p>
            <p>• <span className="text-white font-bold">contact</span> - Direct email & mobile phone</p>
            <p>• <span className="text-white font-bold">game</span> - Launch MICROCOSM ecosystem simulation</p>
            <p>• <span className="text-white font-bold">sudo hire</span> - Special easter egg command</p>
            <p>• <span className="text-white font-bold">clear</span> - Reset terminal screen</p>
          </div>
        );
        break;
      case "whoami":
        resp = (
          <div className="space-y-1 text-neutral-300">
            <p className="text-white font-bold">{personalInfo.name}</p>
            <p className="text-emerald-400">{personalInfo.role} // {personalInfo.tagline}</p>
            <p className="text-xs text-neutral-400">{personalInfo.bio[0]}</p>
          </div>
        );
        break;
      case "skills":
        resp = (
          <div className="space-y-1 text-neutral-300">
            <p className="text-white font-bold">Technical Matrix:</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skillsData.map((s) => (
                <span key={s.name} className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-200 border border-neutral-800 text-[10px]">
                  {s.name} ({s.level}%)
                </span>
              ))}
            </div>
          </div>
        );
        break;
      case "projects":
      case "thesis":
      case "linis":
        resp = (
          <div className="space-y-1.5 text-neutral-300">
            <p className="text-white font-bold">{projectsData[0].title}</p>
            <p className="text-xs text-neutral-400">{projectsData[0].description}</p>
            <p className="text-[11px] text-emerald-400">{projectsData[0].problemSolved}</p>
          </div>
        );
        break;
      case "game":
      case "microcosm":
      case "play":
        resp = (
          <div className="space-y-1.5 text-neutral-300 font-mono text-xs">
            <p className="text-emerald-400 font-bold">Launching Microcosm...</p>
            <p className="text-neutral-500">Initializing ecosystem...</p>
            <p className="text-neutral-500">Generating world...</p>
            <p className="text-neutral-500">Spawning lifeforms...</p>
            <p className="text-emerald-400 font-bold">Ready.</p>
          </div>
        );
        setHistory((prev) => [...prev, { command: cmdStr, response: resp }]);
        setInput("");
        // Delay to let boot text render, then launch Microcosm
        setTimeout(() => {
          setIsOpen(false);
          setMicrocosmActive(true);
        }, 1200);
        return; // early return, we already added to history
      case "experience":
      case "ojt":
        resp = (
          <div className="space-y-1 text-neutral-300">
            {experienceData.map((exp) => (
              <div key={exp.id} className="border-l border-neutral-800 pl-2 py-0.5">
                <p className="text-white font-bold text-xs">{exp.title} @ {exp.organization}</p>
                <p className="text-[10px] text-neutral-400">{exp.period} — {exp.description}</p>
              </div>
            ))}
          </div>
        );
        break;
      case "contact":
      case "email":
        resp = (
          <div className="space-y-1 text-neutral-300">
            <p>Email: <a href={`mailto:${personalInfo.email}`} className="text-emerald-400 underline">{personalInfo.email}</a></p>
            <p>Phone: <span className="text-white font-bold">{personalInfo.phone}</span></p>
            <p>Location: <span className="text-neutral-400">{personalInfo.location}</span></p>
          </div>
        );
        break;
      case "sudo hire":
      case "sudo hire clayde":
        resp = (
          <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 space-y-1 animate-pulse">
            <p className="font-bold">✓ Permission Granted: ACCESS LEVEL HIGH</p>
            <p className="text-xs">claydenhicosarnaiz@gmail.com is ready to interview for Software & Cloud Engineering roles!</p>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        resp = (
          <p className="text-red-400 text-xs">
            Command not recognized: &quot;{cleanCmd}&quot;. Type <span className="text-white underline cursor-pointer" onClick={() => handleCommand("help")}>help</span> for commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmdStr, response: resp }]);
    setInput("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <>
      {/* Floating Command Palette Trigger Bar */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group px-4 py-2.5 rounded-full bg-neutral-950/90 border border-neutral-700/80 text-white shadow-2xl hover:border-white transition-all duration-300 flex items-center gap-2.5 font-mono text-xs cursor-pointer backdrop-blur-xl hover:scale-105"
        >
          <Terminal className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
          <span>TERMINAL CMD</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-neutral-900 border border-neutral-800 rounded text-neutral-400">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Terminal Shell Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl h-[550px] bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl z-10 text-white p-5 flex flex-col justify-between font-mono text-xs overflow-hidden"
            >
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  <span className="text-neutral-400 text-xs font-bold uppercase ml-2 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-emerald-400" /> CLAYDE_ARNAIZ_SHELL // INTERACTIVE
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Output History Log Area (Scrollable & Auto-scrolling) */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-4 py-4 pr-2 scrollbar-thin scrollbar-thumb-neutral-800"
                data-lenis-prevent
              >
                {history.map((h, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-neutral-400">
                      <span className="text-emerald-400 font-bold">clayde@portfolio:~$</span>
                      <span className="text-white font-bold">{h.command}</span>
                    </div>
                    <div className="pl-4">{h.response}</div>
                  </div>
                ))}
              </div>

              {/* Quick Command Shortcuts Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-2 border-t border-neutral-900 text-[11px]">
                <span className="text-neutral-500 uppercase tracking-widest text-[9px]">Shortcuts:</span>
                {["whoami", "skills", "projects", "game", "experience", "contact", "sudo hire"].map((shortcut) => (
                  <button
                    key={shortcut}
                    type="button"
                    onClick={() => handleCommand(shortcut)}
                    className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-emerald-400 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {shortcut}
                  </button>
                ))}
              </div>

              {/* Form Input Line */}
              <form onSubmit={onSubmit} className="flex items-center gap-2 pt-2 border-t border-neutral-900">
                <span className="text-emerald-400 font-bold">clayde@portfolio:~$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a command (e.g. game, whoami, skills, projects)..."
                  className="flex-1 bg-transparent text-white border-none focus:outline-none focus:ring-0 font-mono text-xs"
                  autoFocus
                />
                <button
                  type="submit"
                  className="p-2 rounded-lg bg-white text-black hover:bg-neutral-200 transition-all cursor-pointer font-bold"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Microcosm Fullscreen Overlay (Lazy-loaded) */}
      {microcosmActive && (
        <React.Suspense
          fallback={
            <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center">
              <div className="text-xs font-mono text-neutral-500 animate-pulse">Loading Microcosm...</div>
            </div>
          }
        >
          <LazyMicrocosm
            onExit={() => {
              setMicrocosmActive(false);
              setIsOpen(true); // Return to terminal
            }}
          />
        </React.Suspense>
      )}
    </>
  );
};
