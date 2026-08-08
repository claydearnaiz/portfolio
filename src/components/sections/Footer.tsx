"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { personalInfo, navItems } from "@/data/personal";
import { ArrowUp, Github, Linkedin, Twitter, Gamepad2 } from "lucide-react";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { motion, useReducedMotion } from "framer-motion";

export const FooterSection: React.FC = () => {
  const timeString = useCurrentTime(true);
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="pt-16 pb-8 bg-black border-t border-neutral-800 text-neutral-400 font-mono text-xs overflow-hidden">
      {/* Dramatic Marquee */}
      <div className="w-full overflow-hidden whitespace-nowrap mb-16 border-b border-neutral-900 pb-16 flex select-none">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: shouldReduceMotion ? 0 : "-50%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex whitespace-nowrap text-[6rem] sm:text-[10rem] font-black text-neutral-900 uppercase tracking-tighter leading-none"
        >
          <span className="mr-16">ENGINEERING THE WEB</span>
          <span className="mr-16">BUILDING DIGITAL EXPERIENCES</span>
          <span className="mr-16">ENGINEERING THE WEB</span>
          <span className="mr-16">BUILDING DIGITAL EXPERIENCES</span>
        </motion.div>
      </div>

      <Container>
        <div className="space-y-12">
          {/* Large Statement Headline */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-900 pb-10">
            <div>
              <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">
                // CREATIVE STUDIO & ENGINEERING PORTFOLIO
              </div>
              <div className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter">
                {personalInfo.name}
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-4 rounded-xl bg-white text-black font-bold flex items-center gap-2 hover:bg-neutral-200 transition-all cursor-pointer shrink-0"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation & Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 flex flex-wrap items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="md:col-span-6 flex flex-col sm:flex-row sm:items-center justify-end gap-6 text-neutral-500 text-[11px]">
              <div>
                LOCAL TIME: <span className="text-white">{timeString} UTC+8</span>
              </div>
              <div>
                SYS STATUS: <span className="text-white">OPERATIONAL (100%)</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 py-8">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-950 rounded-lg hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-950 rounded-lg hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-950 rounded-lg hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-600">
            <div>
              © {new Date().getFullYear()} {personalInfo.name.toUpperCase()}. ALL RIGHTS RESERVED.
            </div>
            <div>
              DESIGNED WITH MONOCHROME EXAGGERATED MINIMALISM.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
