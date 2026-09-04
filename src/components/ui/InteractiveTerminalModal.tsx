"use client";

import React, { useState, useEffect, useRef } from "react";
import { Command, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
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
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const [history, setHistory] = useState<Array<{ command: string; response: React.ReactNode }>>([
    {
      command: "help",
      response: (
        <div className="space-y-1.5 text-neutral-300">
          <p className="text-white font-bold">Browse Clayde&apos;s work and profile.</p>
          <p className="text-xs text-neutral-400">Choose a destination or action below:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1 text-[11px] font-mono">
            <span className="text-accent">whoami</span>
            <span className="text-accent">skills</span>
            <span className="text-accent">projects</span>
            <span className="text-accent">experience</span>
            <span className="text-accent">contact</span>
            <span className="text-accent">game</span>
            <span className="text-accent">sudo hire</span>
            <span className="text-accent">clear</span>
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
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusModal = window.setTimeout(() => modalRef.current?.focus(), 0);
    document.body.style.overflow = "hidden";

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", trapFocus);
    return () => {
      window.clearTimeout(focusModal);
      window.removeEventListener("keydown", trapFocus);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const navigateToSection = (id: string) => {
    window.setTimeout(() => {
      setIsOpen(false);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 180);
  };

  const handleCommand = (cmdStr: string) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    let resp: React.ReactNode;

    switch (cleanCmd) {
      case "help":
        resp = (
          <div className="space-y-1 text-neutral-300">
            <p className="text-accent font-bold">Available commands:</p>
            <p>• <span className="text-white font-bold">whoami</span> — View Clayde&apos;s profile</p>
            <p>• <span className="text-white font-bold">skills</span> — View capabilities</p>
            <p>• <span className="text-white font-bold">projects</span> — Open the LINIS case study</p>
            <p>• <span className="text-white font-bold">experience</span> — View work and education</p>
            <p>• <span className="text-white font-bold">contact</span> — Open contact details</p>
            <p>• <span className="text-white font-bold">game</span> — Open the Microcosm simulation</p>
            <p>• <span className="text-white font-bold">sudo hire</span> — Start a conversation</p>
            <p>• <span className="text-white font-bold">clear</span> — Clear this history</p>
          </div>
        );
        break;
      case "whoami":
        resp = (
          <div className="space-y-1 text-neutral-300">
            <p className="text-white font-bold">{personalInfo.name}</p>
            <p className="text-accent">{personalInfo.role} // {personalInfo.tagline}</p>
            <p className="text-xs text-neutral-300">{personalInfo.bio[0]}</p>
          </div>
        );
        navigateToSection("about");
        break;
      case "skills":
        resp = (
          <div className="space-y-1 text-neutral-300">
            <p className="text-white font-bold">Capabilities:</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1 text-xs">
              {skillsData.map((s) => <li key={s.name}>{s.name}</li>)}
            </ul>
          </div>
        );
        navigateToSection("skills");
        break;
      case "projects":
      case "thesis":
      case "linis":
        resp = (
          <div className="space-y-1.5 text-neutral-300">
            <p className="text-white font-bold">{projectsData[0].title}</p>
            <p className="text-xs text-neutral-300">{projectsData[0].description}</p>
            <p className="text-[11px] text-accent">{projectsData[0].problemSolved}</p>
          </div>
        );
        navigateToSection("projects");
        break;
      case "game":
      case "microcosm":
      case "play":
        resp = (
          <div className="space-y-1.5 text-neutral-300 font-mono text-xs">
            <p className="text-accent font-bold">Opening Microcosm simulation…</p>
            <p className="text-neutral-400">The interactive scene will open shortly.</p>
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
        navigateToSection("experience");
        break;
      case "contact":
      case "email":
        resp = (
          <div className="space-y-1 text-neutral-300">
            <p>Email: <a href={`mailto:${personalInfo.email}`} className="text-accent underline">{personalInfo.email}</a></p>
            <p>Location: <span className="text-neutral-400">{personalInfo.location}</span></p>
          </div>
        );
        navigateToSection("contact");
        break;
      case "sudo hire":
      case "sudo hire clayde":
        resp = (
          <div className="space-y-1 rounded-md border border-accent/40 bg-secondary p-3 text-accent">
            <p className="font-bold">Interested in working together?</p>
            <p className="text-xs text-white">Send a note to claydenhicosarnaiz@gmail.com about software, cloud, or connected-systems work.</p>
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
            I don&apos;t recognize &quot;{cleanCmd}&quot;. Choose <span className="text-white underline cursor-pointer" onClick={() => handleCommand("help")}>help</span> to see available commands.
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

  if (pathname === "/game") return null;

  return (
    <>
      {/* Floating Command Palette Trigger Bar */}
      <div className="fixed bottom-5 right-5 z-30">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-md border border-border bg-background px-3 font-mono text-xs text-foreground transition-colors duration-200 hover:border-accent hover:text-accent sm:px-4"
          aria-label="Open command palette (Ctrl+K)"
        >
          <Command className="h-4 w-4 text-accent" />
          <span className="hidden sm:inline">Open command palette</span>
          <kbd className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground md:inline-block">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/90"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="palette-title"
              tabIndex={-1}
              className="relative z-10 flex h-[min(550px,calc(100svh-2rem))] w-full max-w-3xl flex-col justify-between overflow-hidden rounded-md border border-border bg-background p-5 font-mono text-xs text-foreground outline-none"
            >
              {/* Palette Header */}
              <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase text-accent">
                    <Command className="h-4 w-4 text-accent" /> <span id="palette-title">Command palette</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close command palette"
                  className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-md border border-border bg-secondary p-2 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Command History */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-4 py-4 pr-2 scrollbar-thin scrollbar-thumb-neutral-800"
                data-lenis-prevent
              >
                {history.map((h, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-neutral-400">
                      <span className="font-bold text-accent">Selected</span>
                      <span className="text-white font-bold">{h.command}</span>
                    </div>
                    <div className="pl-4">{h.response}</div>
                  </div>
                ))}
              </div>

              {/* Quick Shortcuts */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-2 border-t border-neutral-900 text-[11px]">
                <span className="text-neutral-400 uppercase tracking-widest text-[9px] shrink-0">Shortcuts:</span>
                {["whoami", "skills", "projects", "game", "experience", "contact", "sudo hire"].map((shortcut) => (
                  <button
                    key={shortcut}
                    type="button"
                    onClick={() => handleCommand(shortcut)}
                    className="flex min-h-[32px] items-center whitespace-nowrap rounded border border-border bg-secondary px-2.5 py-1 text-neutral-300 transition-colors hover:border-accent hover:text-accent"
                  >
                    {shortcut}
                  </button>
                ))}
              </div>

              {/* Command Input */}
              <form onSubmit={onSubmit} className="flex items-center gap-2 pt-2 border-t border-neutral-900">
                <span className="font-bold text-accent">Go to</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Try help, projects, or contact"
                  className="flex-1 bg-transparent text-white border-none focus:outline-none focus:ring-0 font-mono text-xs"
                  autoFocus
                />
                <button
                  type="submit"
                  aria-label="Run command"
                  className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-md bg-accent p-2 font-bold text-accent-foreground transition-colors hover:bg-foreground"
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
              <div className="animate-pulse font-mono text-xs text-accent">Loading simulation…</div>
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
