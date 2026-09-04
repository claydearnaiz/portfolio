"use client";

import React, { useEffect, useRef } from "react";
import { Project } from "@/types";
import { Button } from "@/components/ui/Button";
import { X, ExternalLink, Github, CheckCircle2, ArrowUpRight, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // Focus trap inside modal
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    if (project) {
      // 🔒 PROPER BODY SCROLL LOCKING (Desktop + Mobile)
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => modalRef.current?.focus(), 50);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10">
        {/* Backdrop Overlay (Prevents background touch scrolling) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          onTouchMove={(e) => e.preventDefault()}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
        />

        {/* Modal Window Container (data-lenis-prevent allows internal modal scrolling) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl z-10 text-white p-6 sm:p-8 md:p-10 space-y-6 scrollbar-thin scrollbar-thumb-neutral-800"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          ref={modalRef}
          tabIndex={-1}
          data-lenis-prevent
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-neutral-900 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-[#00d4ff] text-black font-mono text-xs font-bold uppercase shadow-md shadow-[#00d4ff]/20">
                {project.category}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                // CASE STUDY DETAIL
              </span>
            </div>

            {/* High-visibility 44px Touch Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* LINIS Mobile Screenshots Showcase Gallery */}
          {project.id === "linis-smart-bin" ? (
            <div className="space-y-3">
              <div className="text-xs font-mono tracking-widest text-[#00d4ff] uppercase font-bold flex items-center gap-2">
                <span>// LINIS MONITOR MOBILE APP SCREENSHOTS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative h-64 sm:h-80 md:h-96 max-h-[45vh] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-md">
                  <img src="/projects/linis-app-1.png" alt="LINIS Monitor Dashboard" className="w-full h-full object-contain p-2 bg-neutral-950" />
                </div>
                <div className="relative h-64 sm:h-80 md:h-96 max-h-[45vh] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-md">
                  <img src="/projects/linis-app-2.png" alt="LINIS Bin Details" className="w-full h-full object-contain p-2 bg-neutral-950" />
                </div>
                <div className="relative h-64 sm:h-80 md:h-96 max-h-[45vh] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-md">
                  <img src="/projects/linis-app-3.png" alt="LINIS Notifications Log" className="w-full h-full object-contain p-2 bg-neutral-950" />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-56 sm:h-72 md:h-80 max-h-[45vh] bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title & High-Contrast Description */}
          <div className="space-y-3 pt-2">
            <h2 id="modal-title" className="text-2xl sm:text-4xl font-black uppercase tracking-tight font-mono text-white">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-200 font-mono leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Problem Solved & Engineering Solution */}
          {project.problemSolved && (
            <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00d4ff] uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#00d4ff]" />
                <span>ENGINEERING IMPACT & PROBLEM SOLVED</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed">
                {project.problemSolved}
              </p>
            </div>
          )}

          {/* Technologies Stack Tags */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
              // TECHNOLOGIES & TOOLS USED
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded bg-neutral-900 text-neutral-200 border border-neutral-800 font-mono text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links (Hide GitHub for private repos cleanly) */}
          <div className="pt-6 border-t border-neutral-900 flex flex-wrap items-center gap-4">
            {project.demo && (
              <Button
                href={project.demo}
                target="_blank"
                variant="primary"
                size="md"
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
                className="bg-[#00d4ff] text-black hover:bg-white border-none font-bold min-h-[44px]"
              >
                LIVE DEMO SITE
              </Button>
            )}

            {!project.isPrivateRepo && project.github ? (
              <Button
                href={project.github}
                target="_blank"
                variant="outline"
                size="md"
                leftIcon={<Github className="w-4 h-4" />}
                className="border-neutral-700 hover:border-[#00d4ff] text-white hover:text-[#00d4ff] min-h-[44px]"
              >
                GITHUB REPOSITORY
              </Button>
            ) : project.isPrivateRepo ? (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
                <Lock className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span>PRIVATE REPOSITORY (PROPRIETARY THESIS CODE)</span>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
