import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/About";
import { SkillsSection } from "@/components/sections/Skills";
import { ProjectsSection } from "@/components/sections/Projects";
import { ExperienceSection } from "@/components/sections/Experience";
import { ContactSection } from "@/components/sections/Contact";
import { FooterSection } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground font-sans antialiased">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}
