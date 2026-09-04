"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, personalInfo } from "@/data/personal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const scrollPosition = window.scrollY + 180;
      let currentSection = "hero";

      for (const item of navItems) {
        const section = document.getElementById(item.href.slice(1));
        if (section && scrollPosition >= section.offsetTop) {
          currentSection = item.href.slice(1);
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-200",
        isScrolled ? "border-border bg-background" : "border-transparent bg-background/95"
      )}
    >
      <div className="mx-auto flex min-h-[72px] w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <a href="#hero" onClick={(event) => handleNavClick(event, "#hero")} className="group flex min-h-[44px] items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-accent text-sm font-bold tracking-[-0.08em] text-accent-foreground">
            CA
          </span>
          <span className="hidden text-xs font-medium tracking-[0.08em] text-foreground sm:block">
            CLAYDE ARNAIZ
          </span>
          <span className="hidden text-xs text-muted-foreground lg:block">/ {personalInfo.location}</span>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex">
          {navItems.map((item, index) => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={cn(
                  "relative flex min-h-[44px] items-center gap-2 text-xs transition-colors duration-200",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
                <span>{item.label}</span>
                <span className={cn("absolute inset-x-0 bottom-1 h-px origin-left bg-accent transition-transform duration-200", isActive ? "scale-x-100" : "scale-x-0")} />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href="/resume.pdf"
            target="_blank"
            variant="outline"
            size="sm"
            rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
            className="hidden sm:inline-flex"
          >
            Résumé
          </Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-accent hover:text-accent lg:hidden"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-5 pb-8 pt-5 sm:px-8 lg:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navItems.map((item, index) => {
              const sectionId = item.href.slice(1);
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={cn(
                    "flex min-h-[52px] items-center gap-4 border-b border-border text-2xl transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="font-mono text-xs text-accent">0{index + 1}</span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
          <Button href="/resume.pdf" target="_blank" variant="outline" size="md" rightIcon={<ArrowUpRight className="h-4 w-4" />} className="mt-6 w-full">
            Open résumé
          </Button>
        </div>
      )}
    </header>
  );
};
