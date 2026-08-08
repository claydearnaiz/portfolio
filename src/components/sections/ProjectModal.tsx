"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { Project } from "@/types";
import { Button } from "@/components/ui/Button";
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, ArrowUpRight } from "lucide-react";
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

      // Focus trap
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
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      // Focus the modal on open
      setTimeout(() => modalRef.current?.focus(), 50);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        {/* Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl z-10 text-white p-6 sm:p-8 space-y-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          ref={modalRef}
          tabIndex={-1}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-white text-black font-mono text-xs font-bold uppercase">
                {project.category}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                // CASE STUDY DETAIL
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-white transition-all cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Banner / Mobile App Showcase Gallery */}
          {project.id === "linis-smart-bin" ? (
            <div className="space-y-3">
              <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                // LINIS MONITOR MOBILE APP SCREENSHOTS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative h-96 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-md">
                  <img src="/projects/linis-app-1.png" alt="LINIS Monitor Dashboard" className="w-full h-full object-contain p-2 bg-neutral-950" />
                </div>
                <div className="relative h-96 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-md">
                  <img src="/projects/linis-app-2.png" alt="LINIS Bin Details" className="w-full h-full object-contain p-2 bg-neutral-950" />
                </div>
                <div className="relative h-96 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-md">
                  <img src="/projects/linis-app-3.png" alt="LINIS Notifications Log" className="w-full h-full object-contain p-2 bg-neutral-950" />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-64 sm:h-80 bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title & Description */}
          <div className="space-y-3">
            <h2 id="modal-title" className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-mono leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Problem Solved & Engineering Solution */}
          {project.problemSolved && (
            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-white" />
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
                  className="px-3 py-1 rounded bg-neutral-900 text-neutral-200 border border-neutral-800 font-mono text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-neutral-900 flex flex-wrap items-center gap-4">
            {project.demo && (
              <Button
                href={project.demo}
                target="_blank"
                variant="primary"
                size="md"
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
              >
                LIVE DEMO SITE
              </Button>
            )}

            {project.github && (
              <Button
                href={project.github}
                target="_blank"
                variant="outline"
                size="md"
                leftIcon={<Github className="w-4 h-4" />}
              >
                GITHUB REPOSITORY
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
