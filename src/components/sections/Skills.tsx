"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { skillsData } from "@/data/skills";
import { SkillCategory } from "@/types";
import { cn } from "@/utils/cn";
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

  return (
    <section id="skills" className="py-24 bg-black relative border-t border-neutral-800">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="02 // TECHNICAL MATRIX"
            title="CORE COMPETENCIES"
            subtitle="Engineered with modern frameworks, typed languages, and high-performance tools."
          />
        </AnimateOnScroll>

        {/* Category Filters */}
        <AnimateOnScroll delay={0.1}>
          <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-neutral-900 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "px-4 py-2 text-xs font-mono tracking-wider rounded-lg transition-all duration-200 cursor-pointer border",
                  activeCategory === cat.value
                    ? "bg-white text-black border-white font-bold"
                    : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: (index % 5) * 0.03 }}
              >
                <Card
                  hoverEffect
                  className="group p-5 flex flex-col justify-between h-36 border-neutral-800 bg-neutral-950/60 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-neutral-900 text-white border border-neutral-800 group-hover:bg-black group-hover:text-white transition-colors">
                      <SkillIcon name={skill.iconName} className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase group-hover:text-neutral-800">
                      {skill.category}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <h4 className="font-bold tracking-tight text-white group-hover:text-black">
                        {skill.name}
                      </h4>
                      {typeof skill.level === "number" && (
                        <span className="text-[10px] text-neutral-400 group-hover:text-neutral-700">
                          {skill.level}%
                        </span>
                      )}
                    </div>
                    <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden group-hover:bg-neutral-300">
                      <div
                        className="h-full bg-white group-hover:bg-black transition-all duration-500"
                        style={{ width: `${skill.level || 75}%` }}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
};
