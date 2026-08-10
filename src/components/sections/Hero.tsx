"use client";

import React, { useRef, useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { ArrowDownRight, Download, Terminal, Activity, ArrowDown } from "lucide-react";
import { TerminalStream } from "@/components/ui/TerminalStream";
import { OdometerCounter } from "@/components/ui/OdometerCounter";

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [uptime, setUptime] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => setUptime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const marqueeKeywords = [
    "NEXT.JS 14",
    "TYPESCRIPT",
    "REACT",
    "PYTHON",
    "C++",
    "TAILWIND CSS",
    "SYSTEM ARCHITECTURE",
    "REST APIS",
    "UI/UX SYSTEMS",
    "DOCKER",
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between bg-black border-b border-neutral-800/80 overflow-hidden pt-20 pb-0 z-10"
    >
      {/* Background Radial Spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#00d4ff]/10 rounded-full blur-[180px] pointer-events-none" />

      <Container className="relative z-10 my-auto w-full pt-4">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-900 pb-5">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-950/90 font-mono text-xs text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse shadow-[0_0_10px_#00d4ff]" />
              <span className="font-bold tracking-wider">AVAILABLE FOR OPPORTUNITIES</span>
            </div>

            <div className="font-mono text-xs text-neutral-400 flex items-center gap-4 tracking-wider">
              <div className="flex items-center gap-1.5 text-[#00d4ff]">
                <Activity className="w-3.5 h-3.5" />
                <span className="flex items-center gap-1">
                  UPTIME: <OdometerCounter value={uptime} suffix="s" className="inline-block text-[#00d4ff]" />
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span>MANDALUYONG, METRO MANILA // REMOTE & ON-SITE</span>
              </div>
            </div>
          </div>

          {/* Clean Display Headline */}
          <div className="space-y-3 pt-2">
            <h1 className="text-4xl sm:text-7xl lg:text-[8.5rem] font-black uppercase tracking-tighter leading-none select-none break-words">
              <span className="text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">CLAYDE</span>{" "}
              <span className="text-stroke hover:text-white transition-all duration-500">
                ARNAIZ
              </span>
            </h1>

            <p className="text-xl sm:text-3xl lg:text-4xl font-black text-neutral-300 tracking-tight font-mono uppercase">
              COMPUTER ENGINEER.
            </p>
          </div>

          {/* Bottom Grid (Terminal + CTAs) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-6 border-t border-neutral-900">
            {/* Terminal CLI Widget */}
            <div className="lg:col-span-5 hidden sm:block">
              <TerminalStream />
            </div>

            {/* Subtext & Refined CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-sm sm:text-base text-neutral-300 font-mono font-medium leading-relaxed">
                Aspiring Software Engineer & Cloud Engineer specializing in Python, C++, PHP, relational databases, and IoT edge architectures.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                {/* Primary Solid CTA */}
                <MagneticButton>
                  <Button
                    onClick={() => handleScrollTo("projects")}
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowDownRight className="w-4 h-4" />}
                    className="bg-[#00d4ff] text-black font-bold hover:bg-white shadow-[0_0_20px_rgba(0,212,255,0.25)] border-none"
                  >
                    EXPLORE WORK
                  </Button>
                </MagneticButton>

                {/* Secondary Outlined CTA */}
                <MagneticButton>
                  <Button
                    href="/resume.pdf"
                    target="_blank"
                    variant="outline"
                    size="lg"
                    leftIcon={<Download className="w-4 h-4" />}
                    className="border-neutral-700 hover:border-[#00d4ff] text-white hover:text-[#00d4ff]"
                  >
                    RESUME
                  </Button>
                </MagneticButton>

                {/* Muted Tertiary Action */}
                <button
                  type="button"
                  onClick={() => handleScrollTo("contact")}
                  className="text-xs font-mono text-neutral-400 hover:text-white underline transition-colors cursor-pointer px-2 py-2 min-h-[44px]"
                >
                  Direct Inquiry
                </button>
              </div>
            </div>
          </div>

          {/* Scroll-Down Indicator */}
          <div className="flex items-center justify-between pt-4 font-mono text-[10px] text-neutral-400 border-t border-neutral-900/60">
            <span>SCROLL TO DISCOVER</span>
            <button
              type="button"
              onClick={() => handleScrollTo("about")}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-[#00d4ff] transition-colors cursor-pointer min-h-[32px]"
            >
              <span>SYS_INIT</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#00d4ff]" />
            </button>
          </div>
        </div>
      </Container>

      {/* Marquee Footer Banner */}
      <div className="border-y border-neutral-800/80 bg-neutral-950/90 backdrop-blur-xl py-3 mt-4">
        <Marquee items={marqueeKeywords} />
      </div>
    </section>
  );
};
