"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project } from "@/types";
import { ArrowUpRight, Cpu } from "lucide-react";
import { cn } from "@/utils/cn";

interface AccordionSliderProps {
  projects: Project[];
  onOpenModal: (project: Project) => void;
  className?: string;
}

export const AccordionSlider: React.FC<AccordionSliderProps> = ({
  projects,
  onOpenModal,
  className = "",
}) => {
  const [activeId, setActiveId] = useState<string>(projects[0]?.id || "");

  if (!projects || projects.length === 0) return null;

  return (
    <div className={cn("w-full max-w-6xl mx-auto space-y-4", className)}>
      <div className="flex flex-col md:flex-row gap-3 h-[520px] min-h-[420px] w-full">
        {projects.map((project, index) => {
          const isActive = activeId === project.id;
          const numStr = index < 9 ? `0${index + 1}` : `${index + 1}`;

          return (
            <div
              key={project.id}
              onClick={() => {
                setActiveId(project.id);
                onOpenModal(project);
              }}
              onMouseEnter={() => setActiveId(project.id)}
              className={cn(
                "relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] border border-neutral-800/80 bg-neutral-950 group",
                isActive ? "flex-[5] border-[#00d4ff]/60 shadow-[0_0_30px_rgba(0,212,255,0.15)]" : "flex-[1] hover:border-neutral-700"
              )}
            >
              {/* Background Image Preview */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={cn(
                    "object-cover object-top transition-transform duration-700 ease-out grayscale group-hover:grayscale-0",
                    isActive ? "scale-105" : "scale-100"
                  )}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    isActive
                      ? "bg-gradient-to-t from-black via-black/60 to-black/20"
                      : "bg-black/80 group-hover:bg-black/60"
                  )}
                />
              </div>

              {/* Collapsed Vertical Title */}
              <div
                className={cn(
                  "absolute inset-0 z-10 flex items-center justify-between p-6 transition-opacity duration-300 pointer-events-none md:flex-col md:items-start",
                  isActive ? "opacity-0" : "opacity-100"
                )}
              >
                <span className="font-mono text-xs font-bold text-[#00d4ff]">
                  [{numStr}]
                </span>
                <span className="font-mono text-xs font-bold tracking-widest text-neutral-300 uppercase md:[writing-mode:vertical-rl] md:rotate-180">
                  {project.title}
                </span>
              </div>

              {/* Expanded Card Content */}
              <div
                className={cn(
                  "absolute bottom-0 inset-x-0 z-20 p-6 sm:p-8 space-y-3 transition-all duration-500 ease-out",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
                )}
              >
                <div className="flex items-center justify-between gap-4 border-b border-neutral-800 pb-3">
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00d4ff] font-bold uppercase">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>[{numStr}] // {project.category}</span>
                  </div>

                  <span className="text-xs font-mono text-neutral-400 font-bold flex items-center gap-1 group-hover:text-[#00d4ff] transition-colors">
                    EXPLORE CASE STUDY <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-mono">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed line-clamp-2 max-w-xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-mono rounded bg-neutral-900/90 text-neutral-300 border border-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
