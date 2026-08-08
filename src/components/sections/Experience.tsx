"use client";

import React, { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { experienceData } from "@/data/experience";
import { GraduationCap, Trophy, Briefcase } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors duration-300" />;
      case "education":
        return <GraduationCap className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors duration-300" />;
      case "achievement":
        return <Trophy className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors duration-300" />;
      default:
        return <Briefcase className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors duration-300" />;
    }
  };

  return (
    <section id="experience" className="py-24 bg-black border-t border-neutral-800 relative">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="04 // CAREER TRAJECTORY"
            title="EXPERIENCE TIMELINE"
            subtitle="My journey across frontend engineering, game mechanics development, and academic foundations."
          />
        </AnimateOnScroll>

        <div ref={containerRef} className="max-w-5xl mx-auto mt-20 relative">
          {/* Vertical Timeline Line Base */}
          <div className="absolute left-8 md:left-[50%] top-0 bottom-0 w-px bg-neutral-900 transform md:-translate-x-1/2" />
          
          {/* Vertical Timeline Active Scroll Progress Line */}
          {!shouldReduceMotion && (
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-8 md:left-[50%] top-0 w-px bg-gradient-to-b from-white via-white to-neutral-500 transform md:-translate-x-1/2 shadow-[0_0_8px_rgba(255,255,255,0.8)] z-0"
            />
          )}

          <div className="space-y-12">
            {experienceData.map((item, index) => {
              const indexStr = index < 9 ? `0${index + 1}` : `${index + 1}`;
              const isEven = index % 2 === 0;

              return (
                <AnimateOnScroll key={item.id} delay={index * 0.1} direction="up">
                  <div className={`relative flex flex-col md:flex-row items-start group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Timeline Node */}
                    <div className="absolute left-8 md:left-[50%] top-6 transform -translate-x-1/2 flex items-center justify-center mt-[-12px]">
                      <div className="w-10 h-10 rounded-full bg-black border border-neutral-800 z-10 flex items-center justify-center group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-500">
                         {getIcon(item.type)}
                      </div>
                    </div>

                    {/* Content Box */}
                    <div className={`pl-20 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                       <div className="p-6 sm:p-8 border border-neutral-900 bg-neutral-950/30 group-hover:bg-neutral-900/50 group-hover:border-neutral-700 transition-all duration-500">
                          <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'} mb-5`}>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-xs font-mono text-neutral-500 font-bold">
                                 [{indexStr}] // {item.type.toUpperCase()}
                              </span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight mb-2">
                              {item.title}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-mono text-neutral-400">
                              <span className="text-neutral-300 font-bold">{item.organization}</span>
                              <span className="hidden sm:inline text-neutral-700">/</span>
                              <span>{item.period}</span>
                            </div>
                          </div>
                          
                          <p className={`text-xs sm:text-sm text-neutral-400 font-mono leading-relaxed mb-6 ${isEven ? 'md:text-right' : 'md:text-left'} group-hover:text-neutral-300 transition-colors duration-300`}>
                            {item.description}
                          </p>

                          {item.technologies && item.technologies.length > 0 && (
                            <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                              {item.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2.5 py-1 text-[11px] font-mono rounded bg-black text-neutral-400 border border-neutral-900 group-hover:border-neutral-700 group-hover:text-neutral-200 transition-colors duration-300"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                       </div>
                    </div>

                    {/* Empty space for the other side on desktop */}
                    <div className="hidden md:block md:w-1/2"></div>
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
