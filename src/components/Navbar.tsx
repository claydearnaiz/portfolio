"use client";

import React, { useState, useEffect } from "react";
import { navItems, personalInfo } from "@/data/personal";
import { Button } from "@/components/ui/Button";
import { Menu, X, ArrowUpRight, Clock, Terminal } from "lucide-react";
import { cn } from "@/utils/cn";

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + " UTC+8"
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-3.5 px-4 sm:px-8",
        isScrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-neutral-800/90 py-3 shadow-2xl"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Live Time */}
        <a
          href="#"
          className="flex items-center gap-3 group cursor-pointer text-white font-mono min-h-[44px]"
        >
          <div className="w-9 h-9 rounded-lg bg-[#00d4ff] text-black font-black flex items-center justify-center text-sm tracking-tighter shadow-md shadow-[#00d4ff]/20 group-hover:scale-105 transition-all duration-300">
            CA
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-xs tracking-tight text-white group-hover:text-[#00d4ff] transition-colors">
              {personalInfo.name.toUpperCase()}
            </span>
            <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#00d4ff]" />
              {timeString || "00:00:00 UTC+8"}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (Restrained Outlined HUD Pill for Active State) */}
        <nav className="hidden lg:flex items-center gap-1 bg-neutral-950/90 backdrop-blur-xl border border-neutral-800/90 p-1.5 rounded-full shadow-2xl">
          {navItems.map((item, index) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            const indexStr = `0${index + 1}`;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "px-4 py-1.5 text-xs font-mono tracking-wider rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1.5 relative min-h-[36px]",
                  isActive
                    ? "bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/40 font-bold shadow-[0_0_12px_rgba(0,212,255,0.15)]"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900/90 border border-transparent"
                )}
              >
                <span className={isActive ? "text-[#00d4ff] font-semibold" : "text-neutral-500"}>
                  {indexStr}
                </span>
                <span>{item.label.toUpperCase()}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Button & Mobile Menu */}
        <div className="flex items-center gap-3">
          <Button
            href="/resume.pdf"
            target="_blank"
            variant="outline"
            size="sm"
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            className="hidden md:inline-flex border-neutral-700 hover:border-[#00d4ff] hover:text-[#00d4ff]"
          >
            RESUME
          </Button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white hover:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff] cursor-pointer flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#00d4ff]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-black/95 backdrop-blur-2xl z-50 p-6 flex flex-col justify-between animate-fade-in border-t border-neutral-800">
          <div className="space-y-6 pt-4">
            <div className="text-xs font-mono tracking-widest text-[#00d4ff] uppercase flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" /> // INDEX NAVIGATION
            </div>
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;
                const indexStr = `0${index + 1}`;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "text-2xl sm:text-3xl font-black tracking-tight transition-all flex items-baseline gap-4 border-b border-neutral-900 pb-3 cursor-pointer min-h-[44px]",
                      isActive
                        ? "text-[#00d4ff] translate-x-2 font-mono"
                        : "text-neutral-400 hover:text-white font-mono"
                    )}
                  >
                    <span className="text-xs font-mono text-neutral-500">{indexStr}</span>
                    <span>{item.label.toUpperCase()}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-neutral-900">
            <Button
              href="/resume.pdf"
              target="_blank"
              variant="outline"
              size="lg"
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full justify-center border-neutral-700 text-white hover:border-[#00d4ff] hover:text-[#00d4ff]"
            >
              DOWNLOAD RESUME
            </Button>
            <div className="text-xs font-mono text-center text-neutral-400">
              LOCAL TIME: {timeString}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
