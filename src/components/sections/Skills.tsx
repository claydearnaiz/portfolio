"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { skillsData } from "@/data/skills";
import { SkillCategory, ProficiencyLevel } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">("All");

  const categories: { label: string; value: SkillCategory | "All" }[] = [
    { label: "00 / ALL", value: "All" },
    { label: "01 / LANGUAGES & WEB", value: "Frontend" },
    { label: "02 / BACKEND & DB", value: "Backend" },
    { label: "03 / EMBEDDED & AI", value: "IoT & AI" },
    { label: "04 / TOOLS & ITSM", value: "Tools" },
  ];

  const filteredSkills =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);

  const getProficiencyStyle = (prof: ProficiencyLevel) => {
    switch (prof) {
      case "Proficient":
        return {
          label: "PROFICIENT",
          badge: "bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/40 shadow-[0_0_10px_rgba(0,212,255,0.15)]",
        };
      case "Familiar":
        return {
          label: "FAMILIAR",
          badge: "bg-white/10 text-white border-white/20",
        };
      case "Learning":
      default:
        return {
          label: "LEARNING",
          badge: "bg-neutral-900 text-neutral-400 border-neutral-800",
        };
    }
  };

  return (
    <section id="skills" className="py-24 bg-black relative border-t border-neutral-800/80 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-10 right-0 w-[500px] h-[350px] bg-[#00d4ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="02 // TECHNICAL MATRIX"
            title="CONFIDENCE & SKILL MATRIX"
            subtitle="Categorized proficiency built through academic engineering coursework, self-directed learning, and hands-on project implementations."
          />
        </AnimateOnScroll>

        {/* Category Selection Filter Pills */}
        <AnimateOnScroll delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-4xl mx-auto p-1.5 rounded-2xl bg-neutral-950/90 border border-neutral-800/80 backdrop-blur-xl">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer min-h-[44px] ${
                    isActive
                      ? "bg-[#00d4ff] text-black shadow-lg shadow-[#00d4ff]/20"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900/80"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </AnimateOnScroll>

        {/* Skills Grid with Module 16 Spotlight Cards */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const profInfo = getProficiencyStyle(skill.proficiency);

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                >
                  <SpotlightCard className="p-5 glass-panel-interactive h-full flex flex-col justify-between group min-h-[115px] sm:min-h-[125px]">
                    <div className="flex items-start justify-between gap-3 h-full">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white group-hover:border-[#00d4ff]/50 group-hover:text-[#00d4ff] transition-colors shrink-0">
                          <SkillIcon name={skill.iconName} className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-sm text-white font-mono tracking-tight group-hover:text-[#00d4ff] transition-colors leading-snug">
                            {skill.name}
                          </h3>
                          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                            {skill.category}
                          </span>
                        </div>
                      </div>

                      {/* Tiered Proficiency Badge */}
                      <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider border shrink-0 ${profInfo.badge}`}>
                        {profInfo.label}
                      </span>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
};
