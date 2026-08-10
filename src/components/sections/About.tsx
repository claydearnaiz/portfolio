"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { personalInfo } from "@/data/personal";
import { GraduationCap, Award, ShieldCheck, Database, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "education" | "highlights">("overview");

  const tabs = [
    { id: "overview", label: "01 // OVERVIEW & VALUES" },
    { id: "education", label: "02 // ACADEMIC FOUNDATION" },
    { id: "highlights", label: "03 // THESIS ARCHITECTURE" },
  ];

  return (
    <section id="about" className="py-24 bg-black border-t border-neutral-800/80 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[350px] bg-[#00d4ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="01 // BIOGRAPHY & FOUNDATION"
            title="ABOUT MY TRAJECTORY"
            subtitle="Bridging core computer engineering fundamentals with modern full-stack web, cloud, and embedded AI applications."
          />
        </AnimateOnScroll>

        {/* Tab Navigation System */}
        <div className="space-y-6 max-w-5xl mx-auto pt-2">
          <AnimateOnScroll delay={0.1}>
            <div
              role="tablist"
              aria-label="About section tabs"
              className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-neutral-950/90 border border-neutral-800/90 backdrop-blur-xl"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-5 py-3 rounded-xl font-mono text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer flex-1 sm:flex-initial text-center min-h-[44px] ${
                      isActive
                        ? "bg-[#00d4ff] text-black shadow-lg shadow-[#00d4ff]/20"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-900/80"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </AnimateOnScroll>

          {/* Animated Tab Content Panel */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                id="panel-overview"
                role="tabpanel"
                aria-labelledby="tab-overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Card className="p-8 sm:p-10 border-neutral-800/80 bg-neutral-950/80 glass-panel space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-black text-[#00d4ff] uppercase tracking-tight font-mono">
                      Computer Engineer Aspiring for Software & Cloud Engineering
                    </h3>

                    {personalInfo.bio.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-sm sm:text-base text-neutral-300 font-mono leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-neutral-900 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="group p-5 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-[#00d4ff]/50 transition-all duration-300 space-y-2 relative overflow-hidden hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]">
                      <div className="text-xs font-mono text-[#00d4ff] font-bold flex items-center justify-between">
                        <span>[+] PROBLEM SOLVING</span>
                        <ShieldCheck className="w-4 h-4 text-[#00d4ff]" />
                      </div>
                      <p className="text-xs text-neutral-300 font-mono leading-relaxed pt-1">
                        Rigorous academic engineering logic applied to scalable software systems.
                      </p>
                    </div>

                    <div className="group p-5 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-[#00d4ff]/50 transition-all duration-300 space-y-2 relative overflow-hidden hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]">
                      <div className="text-xs font-mono text-[#00d4ff] font-bold flex items-center justify-between">
                        <span>[+] SYSTEMS THOUGHT</span>
                        <Database className="w-4 h-4 text-[#00d4ff]" />
                      </div>
                      <p className="text-xs text-neutral-300 font-mono leading-relaxed pt-1">
                        Hardware-to-software integration, edge computing, & relational DB efficiency.
                      </p>
                    </div>

                    <div className="group p-5 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-[#00d4ff]/50 transition-all duration-300 space-y-2 relative overflow-hidden hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]">
                      <div className="text-xs font-mono text-[#00d4ff] font-bold flex items-center justify-between">
                        <span>[+] CONTINUOUS GROWTH</span>
                        <Award className="w-4 h-4 text-[#00d4ff]" />
                      </div>
                      <p className="text-xs text-neutral-300 font-mono leading-relaxed pt-1">
                        Actively expanding cloud stack capabilities & full-stack web architectures.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === "education" && (
              <motion.div
                key="education"
                id="panel-education"
                role="tabpanel"
                aria-labelledby="tab-education"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Card className="p-8 sm:p-10 border-neutral-800/80 bg-neutral-950/80 glass-panel space-y-6">
                  <div className="flex items-start justify-between gap-4 border-b border-neutral-900 pb-6">
                    <div>
                      <div className="text-xs font-mono text-[#00d4ff] font-bold mb-1">
                        BACHELOR OF SCIENCE
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight font-mono">
                        Computer Engineering
                      </h3>
                      <div className="text-sm font-mono text-neutral-400 mt-1">
                        Adamson University // 2022 – 2026
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white shrink-0">
                      <GraduationCap className="w-6 h-6 text-[#00d4ff]" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                      // Core Academic Coursework Focus
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-mono text-neutral-300">
                      <li className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" /> Data Structures & Algorithms (C++ / Python)
                      </li>
                      <li className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" /> Relational Database Management (SQL)
                      </li>
                      <li className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" /> Embedded Systems & Microcontrollers
                      </li>
                      <li className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" /> Computer Networks & Operating Systems
                      </li>
                    </ul>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === "highlights" && (
              <motion.div
                key="highlights"
                id="panel-highlights"
                role="tabpanel"
                aria-labelledby="tab-highlights"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Card className="p-8 sm:p-10 border-neutral-800/80 bg-neutral-950/80 glass-panel space-y-6">
                  <div className="space-y-2 border-b border-neutral-900 pb-6">
                    <div className="text-xs font-mono text-[#00d4ff] font-bold">
                      CAPSTONE THESIS SYSTEM ARCHITECTURE
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight font-mono">
                      LINIS Smart Bin Monitoring System
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-300 font-mono leading-relaxed">
                    Designed and built an end-to-end IoT edge monitoring architecture combining YOLOv8n-NCNN object counting on Raspberry Pi, multi-sensor fill monitoring (Arduino/ESP32), Firebase real-time data sync, and Random Forest machine learning for overflow forecasting.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/60 space-y-1">
                      <div className="text-xs font-mono font-bold text-white flex items-center justify-between">
                        <span>YOLOv8 Edge AI</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#00d4ff]" />
                      </div>
                      <p className="text-xs font-mono text-neutral-400">
                        Classifies diners vs buyers in custom Regions of Interest (ROI).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/60 space-y-1">
                      <div className="text-xs font-mono font-bold text-white flex items-center justify-between">
                        <span>Multi-Source Data Pipeline</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#00d4ff]" />
                      </div>
                      <p className="text-xs font-mono text-neutral-400">
                        Aligns timestamps across 6 smart bins to forecast bin overflow.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
};
