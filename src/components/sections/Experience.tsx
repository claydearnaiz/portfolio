"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { experienceData } from "@/data/experience";
import { GraduationCap, Trophy, Briefcase } from "lucide-react";

export const ExperienceSection: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className="w-4 h-4 text-[#00d4ff]" />;
      case "education":
        return <GraduationCap className="w-4 h-4 text-[#00d4ff]" />;
      default:
        return <Trophy className="w-4 h-4 text-[#00d4ff]" />;
    }
  };

  return (
    <section id="experience" className="py-24 bg-black border-t border-neutral-800/80 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[350px] bg-[#00d4ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="04 // CAREER TRAJECTORY"
            title="EXPERIENCE TIMELINE"
            subtitle="My journey across computer engineering coursework, technical internship, and capstone software architecture."
          />
        </AnimateOnScroll>

        <div className="relative max-w-4xl mx-auto pt-6">
          {/* Vertical Connecting Timeline Laser Line (Positioned cleanly on the left gutter) */}
          <div className="absolute top-8 bottom-8 left-4 sm:left-6 w-0.5 bg-gradient-to-b from-[#00d4ff] via-neutral-800 to-[#00d4ff] opacity-70" />

          <div className="space-y-10">
            {experienceData.map((item, index) => {
              const indexStr = index < 9 ? `0${index + 1}` : `${index + 1}`;

              return (
                <AnimateOnScroll key={item.id} delay={index * 0.12} direction="up">
                  <div className="relative pl-10 sm:pl-16">
                    {/* Glowing Node Circle Marker (Positioned ON the left line, completely outside card text) */}
                    <div className="absolute left-4 sm:left-6 top-8 -translate-x-1/2 w-7 h-7 rounded-full bg-neutral-950 border-2 border-[#00d4ff] flex items-center justify-center shadow-[0_0_12px_rgba(0,212,255,0.4)] z-20">
                      <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
                    </div>

                    {/* Timeline Card */}
                    <Card className="p-6 sm:p-8 border-neutral-800/80 bg-neutral-950/80 glass-panel-interactive">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                        {/* Period & Index Header Column */}
                        <div className="md:col-span-4 space-y-2 border-b md:border-b-0 md:border-r border-neutral-900 pb-4 md:pb-0 md:pr-6">
                          <div className="text-xs font-mono text-neutral-400 font-bold flex items-center gap-2">
                            {getIcon(item.type)}
                            <span>[{indexStr}] // {item.type.toUpperCase()}</span>
                          </div>
                          <div className="text-xl sm:text-2xl font-black font-mono text-white">
                            {item.period}
                          </div>
                          <div className="text-xs font-mono text-[#00d4ff] font-bold">
                            {item.organization}
                          </div>
                        </div>

                        {/* Content & Description Column */}
                        <div className="md:col-span-8 space-y-4">
                          <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight font-mono">
                            {item.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed">
                            {item.description}
                          </p>

                          {item.technologies && item.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {item.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-neutral-900/90 text-neutral-300 border border-neutral-800"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
