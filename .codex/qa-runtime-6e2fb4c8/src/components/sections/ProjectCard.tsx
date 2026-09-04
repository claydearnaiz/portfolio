"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project } from "@/types";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { ExternalLink, Github, ArrowUpRight, Cpu } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <TiltCard className="h-full">
      <SpotlightCard className="p-6 h-full flex flex-col justify-between group glass-panel-interactive">
        {/* Top Image Preview Frame */}
        <div className="space-y-6">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800/80 group-hover:border-[#00d4ff]/40 transition-colors">
            {!imageError ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-neutral-900/90 text-neutral-500 font-mono">
                <Cpu className="w-8 h-8 text-neutral-500 mb-2" />
                <span className="text-xs uppercase tracking-wider">{project.title}</span>
              </div>
            )}

            {/* Top Category Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest rounded-full bg-black/90 text-[#00d4ff] border border-[#00d4ff]/30 backdrop-blur-md">
                {project.category.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-[#00d4ff] transition-colors font-mono">
              {project.title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>
        </div>

        {/* Bottom Tech Pills & Actions */}
        <div className="space-y-6 pt-6 border-t border-neutral-900">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-neutral-900/90 text-neutral-300 border border-neutral-800"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-neutral-900/90 text-neutral-400 border border-neutral-800">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => onOpenModal(project)}
              variant="primary"
              size="sm"
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
              className="flex-1 justify-center bg-[#00d4ff] text-black hover:bg-white border-none font-bold min-h-[40px]"
            >
              DETAILS
            </Button>

            {!project.isPrivateRepo && project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-white transition-all cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                title="View GitHub Source"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                title="View Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </SpotlightCard>
    </TiltCard>
  );
};
