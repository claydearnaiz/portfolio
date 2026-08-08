"use client";

import React, { useState } from "react";
import { Project } from "@/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ExternalLink, Github, ArrowUpRight, CheckCircle2 } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card
      onClick={() => onOpenModal(project)}
      data-cursor="VIEW"
      className="flex flex-col h-full p-0 border-neutral-800 bg-neutral-950/80 hover:border-white transition-all duration-300 cursor-pointer group"
    >
      {/* Banner Header */}
      <div className="relative h-56 w-full bg-neutral-900 border-b border-neutral-800/80 overflow-hidden">
        {!imageError ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-contain p-3 bg-neutral-950 group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Subtle gradient vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 p-6 text-center">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              {project.category}
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="px-2.5 py-1 text-[10px] font-mono font-bold rounded bg-black/90 text-white border border-neutral-700/80 uppercase tracking-wider backdrop-blur-md shadow-sm">
            {project.category}
          </span>
          {project.featured && (
            <span className="px-2.5 py-1 text-[10px] font-mono font-bold rounded bg-white text-black uppercase tracking-wider shadow-sm">
              FEATURED
            </span>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-neutral-300 transition-colors uppercase tracking-tight">
            {project.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-mono leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-mono rounded bg-neutral-900 text-neutral-300 border border-neutral-800"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-mono text-neutral-500">
              +{project.technologies.length - 4} MORE
            </span>
          )}
        </div>

        <div className="flex-grow" />

        {/* Action Button */}
        <div className="pt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white transition-colors">
          <span>VIEW CASE STUDY</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Card>
  );
};
