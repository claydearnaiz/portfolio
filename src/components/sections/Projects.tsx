"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { projectsData } from "@/data/projects";
import { ProjectCategory, Project } from "@/types";
import { cn } from "@/utils/cn";
import { LayoutGrid, List, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = [
    "All",
    "Mobile Development",
    "Web Development",
    "IoT & Embedded",
    "Other",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-black border-t border-neutral-800 relative">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="03 // SELECTED WORKS"
            title="FEATURED PROJECTS"
            subtitle="Explore detailed case studies across web applications, multiplayer game mechanics, and design systems."
          />
        </AnimateOnScroll>

        {/* Filter Bar & View Toggle */}
        <AnimateOnScroll delay={0.1} className="sticky top-16 z-20 bg-black/90 backdrop-blur-md pt-2 pb-2 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 text-xs font-mono tracking-wider rounded-lg transition-all cursor-pointer border",
                    selectedCategory === category
                      ? "bg-white text-black border-white font-bold"
                      : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                  )}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors",
                  viewMode === "list"
                    ? "bg-white text-black font-bold"
                    : "text-neutral-400 hover:text-white"
                )}
                title="Editorial List View"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">LIST</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors",
                  viewMode === "grid"
                    ? "bg-white text-black font-bold"
                    : "text-neutral-400 hover:text-white"
                )}
                title="Grid Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">GRID</span>
              </button>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Editorial List View */}
        {viewMode === "list" && (
          <div className="divide-y divide-neutral-900 border-y border-neutral-900 relative">
            {filteredProjects.map((project, idx) => {
              const indexStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
              const isHovered = hoveredProject?.id === project.id;

              return (
                <div
                  key={project.id}
                  data-cursor="CASE STUDY"
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => setSelectedProject(project)}
                  className="py-6 sm:py-8 group flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-all duration-300 hover:px-4 hover:bg-neutral-950/80 rounded-xl relative overflow-hidden"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6 z-10">
                    <span className="font-mono text-xs text-neutral-500 font-bold">
                      [{indexStr}]
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-3xl font-black text-white group-hover:text-neutral-200 transition-colors uppercase tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-1 max-w-2xl line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 font-mono text-xs z-10">
                    <span className="px-2.5 py-1 rounded bg-neutral-900 text-neutral-300 border border-neutral-800 uppercase">
                      {project.category}
                    </span>
                    <span className="text-white font-bold flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-300">
                      CASE STUDY <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Subtle background image reveal on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 0.12, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* Grid Cards View */}
        {viewMode === "grid" && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard
                    project={project}
                    onOpenModal={(p) => setSelectedProject(p)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
