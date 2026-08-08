"use client";

import React, { useState, useEffect } from "react";
import { navItems, personalInfo } from "@/data/personal";
import { Button } from "@/components/ui/Button";
import { Menu, X, ArrowUpRight, Clock, Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/utils/cn";

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
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
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-4 px-4 sm:px-8",
        isScrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-neutral-800 py-3 shadow-2xl"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Live Time */}
        <a
          href="#"
          className="flex items-center gap-3.5 group cursor-pointer text-white font-mono"
        >
          <div className="w-9 h-9 rounded-lg bg-white text-black font-black flex items-center justify-center text-sm tracking-tighter shadow-md shadow-white/20 group-hover:scale-105 group-hover:bg-neutral-100 transition-all duration-300">
            CA
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-xs tracking-tight text-white group-hover:text-neutral-300 transition-colors">
              {personalInfo.name.toUpperCase()}
            </span>
            <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 text-neutral-400" />
              {timeString || "00:00:00 UTC"}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
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
                  "px-4 py-1.5 text-xs font-mono tracking-wider rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1.5 relative",
                  isActive
                    ? "bg-white text-black font-bold shadow-md shadow-white/10"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900/90"
                )}
              >
                <span className={isActive ? "text-black/60 font-semibold" : "text-neutral-500"}>
                  {indexStr}
                </span>
                <span>{item.label.toUpperCase()}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Button & Theme Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full border border-neutral-800 bg-neutral-950/80 text-white hover:border-neutral-500 transition-all cursor-pointer shadow-sm"
            aria-label="Toggle Light / Dark Mode"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-neutral-200" /> : <Moon className="w-4 h-4 text-neutral-800" />}
          </button>

          <Button
            href="/resume.pdf"
            target="_blank"
            variant="primary"
            size="sm"
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            className="hidden md:inline-flex"
          >
            RESUME
          </Button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white hover:border-white focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-black/95 backdrop-blur-2xl z-50 p-6 flex flex-col justify-between animate-fade-in border-t border-neutral-800">
          <div className="space-y-6 pt-4">
            <div className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
              // INDEX NAVIGATION
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
                      "text-3xl sm:text-4xl font-black tracking-tight transition-all flex items-baseline gap-4 border-b border-neutral-900 pb-3 cursor-pointer",
                      isActive
                        ? "text-white translate-x-2"
                        : "text-neutral-500 hover:text-neutral-200"
                    )}
                  >
                    <span className="text-sm font-mono text-neutral-500">{indexStr}</span>
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
              variant="primary"
              size="lg"
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full justify-center"
            >
              DOWNLOAD RESUME
            </Button>
            <div className="text-xs font-mono text-center text-neutral-500">
              LOCAL TIME: {timeString}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
