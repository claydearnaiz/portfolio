import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { personalInfo } from "@/data/personal";

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="border-b border-border bg-background pt-28 sm:pt-32">
      <Container size="full" className="pb-10 sm:pb-12">
        <div className="grid gap-3 border-y border-border py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:grid-cols-[1fr_auto] sm:text-xs">
          <span className="text-accent">00 / Computer engineer</span>
          <span>{personalInfo.location} / UTC+8</span>
        </div>

        <div className="grid gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:py-28">
          <div className="lg:col-span-8">
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Software, cloud, and embedded systems — the working space between a clean interface and the machine underneath it.
            </p>
            <h1 id="hero-heading" className="mt-8 max-w-5xl text-[clamp(4rem,13vw,11rem)] font-bold leading-[0.82] tracking-[-0.085em] text-foreground">
              <span className="hero-line"><span>Clayde</span></span>
              <span className="hero-line"><span>Arnaiz</span></span>
            </h1>
          </div>

          <aside className="self-end border-l border-accent pl-5 lg:col-span-3 lg:col-start-10 lg:pb-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">Selected project / 01</p>
            <h2 className="mt-5 text-2xl font-medium leading-tight tracking-[-0.03em] text-foreground sm:text-3xl">
              LINIS Smart Bin Monitoring
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A thesis system connecting sensors, edge vision, cloud data, and overflow forecasting across three canteen sites.
            </p>
          </aside>
        </div>

        <div className="grid gap-8 border-t border-border pt-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
          <div className="flex flex-wrap gap-3">
            <Button href="#projects" variant="primary" size="md" rightIcon={<ArrowDownRight className="h-4 w-4" />}>
              View featured work
            </Button>
            <Button href={`mailto:${personalInfo.email}?subject=${encodeURIComponent("Résumé request")}`} variant="outline" size="md" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
              Request résumé
            </Button>
          </div>
          <p className="hidden max-w-xs text-sm leading-relaxed text-muted-foreground sm:block">
            From the interface to the infrastructure. Built with the whole system in mind.
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-right">
            Scroll to read the work ↓
          </span>
        </div>
      </Container>
    </section>
  );
};
