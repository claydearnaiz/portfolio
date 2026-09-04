"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { personalInfo, navItems } from "@/data/personal";
import { useCurrentTime } from "@/hooks/useCurrentTime";

export const FooterSection: React.FC = () => {
  const timeString = useCurrentTime(true);
  const socialLinks = [
    { label: "GitHub", href: personalInfo.github },
    { label: "LinkedIn", href: personalInfo.linkedin },
    ...(personalInfo.twitter ? [{ label: "X / Twitter", href: personalInfo.twitter }] : []),
  ];

  return (
    <footer className="border-t border-border bg-background py-10 text-muted-foreground sm:py-12">
      <Container>
        <div className="grid gap-10 border-b border-border pb-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-2xl font-semibold tracking-[-0.03em] text-foreground">
              Clayde Nhicos Arnaiz
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6">
              Computer engineer building software, cloud, and connected systems from Mandaluyong City.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="mt-5 inline-flex min-h-11 items-center border-b border-accent text-sm text-foreground transition-colors hover:text-accent"
            >
              {personalInfo.email}
            </a>
          </div>

          <nav aria-label="Footer navigation" className="lg:col-span-3 lg:col-start-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Index</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex min-h-11 items-center border-b border-border text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social profiles" className="lg:col-span-3 lg:col-start-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Elsewhere</p>
            <ul className="mt-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center border-b border-border text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="grid gap-4 pt-6 font-mono text-[10px] uppercase tracking-[0.12em] sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© {new Date().getFullYear()} Clayde Arnaiz</span>
            <span aria-live="off">
              {timeString ? `Mandaluyong · ${timeString} UTC+8` : "Mandaluyong · UTC+8"}
            </span>
          </div>
          <a
            href="#hero"
            className="inline-flex min-h-11 items-center gap-2 justify-self-start text-foreground transition-colors hover:text-accent sm:justify-self-end"
          >
            Back to top
            <ArrowUp aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </footer>
  );
};
