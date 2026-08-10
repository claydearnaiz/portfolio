"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/personal";
import { skillsData } from "@/data/skills";
import { projectsData } from "@/data/projects";
import { experienceData } from "@/data/experience";

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
            <span className="text-[#00d4ff]">whoami</span>
            <span className="text-[#00d4ff]">skills</span>
            <span className="text-[#00d4ff]">projects</span>
            <span className="text-[#00d4ff]">experience</span>
            <span className="text-[#00d4ff]">contact</span>
            <span className="text-[#00d4ff]">game</span>
            <span className="text-[#00d4ff]">sudo hire</span>
            <span className="text-[#00d4ff]">clear</span>
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
            <p className="text-[#00d4ff] font-bold">Available commands:</p>
            <p>• <span className="text-white font-bold">whoami</span> - Display Clayde&apos;s profile & background</p>
            <p>• <span className="text-white font-bold">skills</span> - List technical matrix & proficiency levels</p>
            <p>• <span className="text-white font-bold">projects</span> - View LINIS thesis system architecture</p>
            <p>• <span className="text-white font-bold">experience</span> - View internship & degree details</p>
            <p>• <span className="text-white font-bold">contact</span> - Direct email & phone</p>
            <p>• <span className="text-white font-bold">game</span> - Launch MICROCOSM simulation</p>
            <p>• <span className="text-white font-bold">sudo hire</span> - Special recruitment command</p>
            <p>• <span className="text-white font-bold">clear</span> - Reset terminal screen</p>
          </div>
        );
        break;
      case "whoami":
        resp = (
          <div className="space-y-1 text-neutral-300">
            <p className="text-white font-bold">{personalInfo.name}</p>
            <p className="text-[#00d4ff]">{personalInfo.role} // {personalInfo.tagline}</p>
            <p className="text-xs text-neutral-300">{personalInfo.bio[0]}</p>
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
                  {s.name} ({s.proficiency})
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
            <p className="text-xs text-neutral-300">{projectsData[0].description}</p>
            <p className="text-[11px] text-[#00d4ff]">{projectsData[0].problemSolved}</p>
          </div>
        );
        break;
      case "game":
      case "microcosm":
      case "play":
        resp = (
          <div className="space-y-1.5 text-neutral-300 font-mono text-xs">
            <p className="text-[#00d4ff] font-bold">Launching Microcosm...</p>
            <p className="text-neutral-400">Initializing ecosystem...</p>
            <p className="text-[#00d4ff] font-bold">Ready.</p>
          </div>
        );
        setHistory((prev) => [...prev, { command: cmdStr, response: resp }]);
        setInput("");
        setTimeout(() => {
          setIsOpen(false);
          setMicrocosmActive(true);
        }, 1000);
        return;
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
            <p>Email: <a href={`mailto:${personalInfo.email}`} className="text-[#00d4ff] underline">{personalInfo.email}</a></p>
            <p>Phone: <span className="text-white font-bold">{personalInfo.phone}</span></p>
            <p>Location: <span className="text-neutral-400">{personalInfo.location}</span></p>
          </div>
        );
        break;
      case "sudo hire":
      case "sudo hire clayde":
        resp = (
          <div className="p-3 rounded-lg bg-neutral-900 border border-[#00d4ff]/40 text-[#00d4ff] space-y-1">
            <p className="font-bold">✓ Permission Granted: ACCESS LEVEL HIGH</p>
            <p className="text-xs text-white">claydenhicosarnaiz@gmail.com is ready to interview for Software & Cloud Engineering roles!</p>
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
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group px-4 py-3 min-h-[44px] rounded-full bg-black/95 border border-neutral-700/90 text-white shadow-2xl hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2.5 font-mono text-xs cursor-pointer backdrop-blur-xl hover:scale-105"
          aria-label="Open Interactive Command Palette (Ctrl+K)"
        >
          <Terminal className="w-4 h-4 text-[#00d4ff] group-hover:rotate-12 transition-transform" />
          <span className="font-bold">CMD SHELL</span>
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
                  <span className="text-xs text-[#00d4ff] font-bold uppercase flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-[#00d4ff]" /> [ CLAYDE_ARNAIZ_SHELL ]
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#00d4ff] transition-all cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Output History Log Area */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-4 py-4 pr-2 scrollbar-thin scrollbar-thumb-neutral-800"
                data-lenis-prevent
              >
                {history.map((h, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-neutral-400">
                      <span className="text-[#00d4ff] font-bold">clayde@portfolio:~$</span>
                      <span className="text-white font-bold">{h.command}</span>
                    </div>
                    <div className="pl-4">{h.response}</div>
                  </div>
                ))}
              </div>

              {/* Quick Command Shortcuts Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-2 border-t border-neutral-900 text-[11px]">
                <span className="text-neutral-400 uppercase tracking-widest text-[9px] shrink-0">Shortcuts:</span>
                {["whoami", "skills", "projects", "game", "experience", "contact", "sudo hire"].map((shortcut) => (
                  <button
                    key={shortcut}
                    type="button"
                    onClick={() => handleCommand(shortcut)}
                    className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all cursor-pointer whitespace-nowrap min-h-[32px] flex items-center"
                  >
                    {shortcut}
                  </button>
                ))}
              </div>

              {/* Form Input Line */}
              <form onSubmit={onSubmit} className="flex items-center gap-2 pt-2 border-t border-neutral-900">
                <span className="text-[#00d4ff] font-bold">clayde@portfolio:~$</span>
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
                  className="p-2 rounded-lg bg-[#00d4ff] text-black hover:bg-white transition-all cursor-pointer font-bold min-w-[36px] min-h-[36px] flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Microcosm Fullscreen Overlay */}
      {microcosmActive && (
        <React.Suspense
          fallback={
            <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center">
              <div className="text-xs font-mono text-[#00d4ff] animate-pulse">Loading Microcosm...</div>
            </div>
          }
        >
          <LazyMicrocosm
            onExit={() => {
              setMicrocosmActive(false);
              setIsOpen(true);
            }}
          />
        </React.Suspense>
      )}
    </>
  );
};
