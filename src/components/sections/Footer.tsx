"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { personalInfo, navItems } from "@/data/personal";
import { ArrowUp, Github, Linkedin, Twitter } from "lucide-react";
import { useCurrentTime } from "@/hooks/useCurrentTime";

export const FooterSection: React.FC = () => {
  const timeString = useCurrentTime(true);

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
    <footer className="py-12 bg-black border-t border-neutral-800 text-neutral-400 font-mono text-xs overflow-hidden">
      <Container>
        <div className="space-y-8">
          {/* Top Bar: Nav Links & Time/Status */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-neutral-900 pb-8">
            <div className="flex flex-wrap items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="hover:text-[#00d4ff] transition-colors uppercase tracking-wider cursor-pointer font-bold"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 text-neutral-400 text-[11px] shrink-0">
              <div>
                LOCAL TIME: <span className="text-white font-bold">{timeString} UTC+8</span>
              </div>
              <div className="hidden sm:block">
                SYS STATUS: <span className="text-[#00d4ff] font-bold">OPERATIONAL</span>
              </div>

              <button
                type="button"
                onClick={scrollToTop}
                className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[#00d4ff] hover:text-white hover:border-[#00d4ff] transition-all cursor-pointer flex items-center gap-1.5 font-bold min-h-[36px]"
                title="Scroll back to top"
              >
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2 text-[11px] text-neutral-500">
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-neutral-950 rounded-lg hover:bg-neutral-900 text-neutral-400 hover:text-[#00d4ff] border border-neutral-800 hover:border-[#00d4ff]/40 transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-neutral-950 rounded-lg hover:bg-neutral-900 text-neutral-400 hover:text-[#00d4ff] border border-neutral-800 hover:border-[#00d4ff]/40 transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              {personalInfo.twitter && (
                <a
                  href={personalInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-neutral-950 rounded-lg hover:bg-neutral-900 text-neutral-400 hover:text-[#00d4ff] border border-neutral-800 hover:border-[#00d4ff]/40 transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center"
                  title="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>

            <div className="text-center sm:text-right font-mono">
              © {new Date().getFullYear()} Clayde Arnaiz. Computer Engineering Portfolio.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
