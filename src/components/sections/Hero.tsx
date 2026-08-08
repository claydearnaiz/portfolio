"use client";

import React, { useState, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { ArrowDownRight, Mail, Download, Terminal } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { TerminalStream } from "@/components/ui/TerminalStream";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const HeroSection: React.FC = () => {
  const [gridActive, setGridActive] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "100px"]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleGridCell = (index: number) => {
    if (!gridActive.includes(index)) {
      setGridActive([...gridActive, index]);
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
      className="relative min-h-[90vh] flex flex-col justify-center bg-black border-b border-neutral-800 overflow-hidden py-20"
    >
      {/* Dramatic Subtle Radial Spotlight Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Background Grid Pattern with Parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={shouldReduceMotion ? {} : { y: bgY }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <Container className="relative z-10 my-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto space-y-10"
        >
          {/* Top Status & Location Header */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800/80 pb-6"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-neutral-700/60 bg-neutral-950/90 backdrop-blur-xl font-mono text-xs text-neutral-200 shadow-[0_0_15px_rgba(255,255,255,0.06)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="font-semibold tracking-wider">AVAILABLE FOR OPPORTUNITIES</span>
            </div>
            <div className="font-mono text-xs text-neutral-400 flex items-center gap-2 tracking-wider">
              <Terminal className="w-3.5 h-3.5 text-white" />
              <span>MANDALUYONG, METRO MANILA // REMOTE & ON-SITE</span>
            </div>
          </motion.div>

          {/* Oversized Editorial Statement Headline */}
          <div className="space-y-4 pt-2">
            <motion.h1
              variants={fadeUp}
              style={shouldReduceMotion ? {} : { scale: headlineScale }}
              className="text-5xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none origin-left text-white"
            >
              <span>CLAYDE</span>{" "}
              <span className="text-stroke hover:text-white transition-colors duration-500 cursor-default">ARNAIZ</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl sm:text-3xl lg:text-4xl font-light text-neutral-300 tracking-tight max-w-4xl leading-snug font-mono"
            >
              COMPUTER ENGINEER.
            </motion.p>
          </div>

          {/* Interactive Matrix Widget & Bio */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4 border-t border-neutral-900"
          >
            {/* Animated CLI Terminal Widget */}
            <div className="md:col-span-5 hidden sm:block">
              <TerminalStream />
            </div>

            {/* Tagline & CTAs */}
            <div className="md:col-span-7 space-y-6">
              <p className="text-sm sm:text-base text-neutral-300 font-mono leading-relaxed">
                Aspiring Software Engineer & Cloud Engineer.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  onClick={() => handleScrollTo("projects")}
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowDownRight className="w-4 h-4" />}
                >
                  EXPLORE WORK
                </Button>

                <Button
                  href="/resume.pdf"
                  target="_blank"
                  variant="outline"
                  size="lg"
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  RESUME
                </Button>

                <Button
                  onClick={() => handleScrollTo("contact")}
                  variant="ghost"
                  size="lg"
                  leftIcon={<Mail className="w-4 h-4" />}
                >
                  GET IN TOUCH
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Marquee Banner */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="border-y border-neutral-800 bg-neutral-950/80 py-2 mt-12"
      >
        <Marquee items={marqueeKeywords} />
      </motion.div>
    </section>
  );
};
