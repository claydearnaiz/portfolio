import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/About";
import { SkillsSection } from "@/components/sections/Skills";
import { ProjectsSection } from "@/components/sections/Projects";
import { ExperienceSection } from "@/components/sections/Experience";
import { ContactSection } from "@/components/sections/Contact";
import { FooterSection } from "@/components/sections/Footer";
import { PortfolioMotion } from "@/components/ui/PortfolioMotion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground font-sans antialiased">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PortfolioMotion>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <SkillsSection />
          <ContactSection />
        </PortfolioMotion>
      </main>
      <FooterSection />
    </div>
  );
}
