"use client";

import React, { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { personalInfo } from "@/data/personal";
import { WordReveal } from "@/components/ui/WordReveal";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);
  const sideY = useTransform(scrollYProgress, [0, 1], ["80px", "-20px"]);

  const coreCompetencies = [
    {
      title: "PRIMARY CONFIDENCE",
      description: "Solid foundation in Python, C++, PHP, and SQL databases built through core computer engineering academic coursework.",
    },
    {
      title: "PROJECT EXPOSURE",
      description: "Hands-on experience building web/mobile apps with React, Expo, Node.js, Firebase, and Supabase during academic projects.",
    },
    {
      title: "CAREER FOCUS",
      description: "Aspiring to grow as a Software Engineer or Cloud Engineer, continually building deeper technical proficiency.",
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-black border-t border-neutral-800 relative overflow-hidden">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="01 // PROFILE & BACKGROUND"
            title="ABOUT ME"
            subtitle="Computer Engineering Graduate pursuing a career path in Software Engineering and Cloud Infrastructure."
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Bio Column with Scroll-Linked Parallax */}
          <motion.div
            style={shouldReduceMotion ? {} : { y: cardY }}
            className="lg:col-span-8"
          >
            <AnimateOnScroll direction="up">
              <Card className="h-full space-y-6 border-neutral-800 bg-neutral-950/80 p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="text-xl sm:text-2xl font-light text-neutral-200 leading-relaxed italic border-l-2 border-white pl-4">
                    &ldquo;<WordReveal text="Building strong core engineering foundations while exploring modern software & cloud technologies." />&rdquo;
                  </div>

                  <div className="space-y-4 text-neutral-300 font-mono text-xs sm:text-sm leading-relaxed pt-2">
                    {personalInfo.bio.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-900">
                    {coreCompetencies.map((pt) => (
                      <div key={pt.title} className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800 space-y-2 hover:border-white transition-colors duration-300">
                        <div className="text-xs font-mono font-bold text-white tracking-wider">
                          {pt.title}
                        </div>
                        <div className="text-xs text-neutral-400 leading-normal">
                          {pt.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </AnimateOnScroll>
          </motion.div>

          {/* Sticky Side Card with Parallax Counter-Movement */}
          <motion.div
            style={shouldReduceMotion ? {} : { y: sideY }}
            className="lg:col-span-4 lg:sticky lg:top-24 h-fit"
          >
            <AnimateOnScroll direction="up" delay={0.15}>
              <Card className="h-full border-neutral-800 bg-neutral-950/80 p-6 flex flex-col justify-between space-y-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-white text-black font-mono text-xs font-bold inline-block">
                    // QUICK FACTS
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight uppercase">
                    CLAYDE NHICOS ARNAIZ
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-mono leading-relaxed">
                    Computer Engineering Graduate with practical experience in IT service management, inventory asset tracking, and full-stack software development.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-900 font-mono text-xs">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>LOCATION</span>
                    <span className="text-white">MANDALUYONG, METRO MANILA</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>DEGREE</span>
                    <span className="text-white">BS COMPUTER ENG</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>STATUS</span>
                    <span className="text-white">AVAILABLE FOR WORK</span>
                  </div>
                </div>
              </Card>
            </AnimateOnScroll>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
