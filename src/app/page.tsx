import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/About";
import { SkillsSection } from "@/components/sections/Skills";
import { ProjectsSection } from "@/components/sections/Projects";
import { ExperienceSection } from "@/components/sections/Experience";
import { ContactSection } from "@/components/sections/Contact";
import { FooterSection } from "@/components/sections/Footer";
import { CinematicSectionWrapper } from "@/components/ui/CinematicSectionWrapper";
import { CurtainReveal } from "@/components/ui/CurtainReveal";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#00d4ff] selection:text-black font-sans antialiased overflow-x-hidden">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        
        <CinematicSectionWrapper>
          <AboutSection />
        </CinematicSectionWrapper>

        <CinematicSectionWrapper>
          <SkillsSection />
        </CinematicSectionWrapper>

        {/* Curtain Reveal on Featured Projects Section */}
        <CurtainReveal leftTitle="FEATURED" rightTitle="PROJECTS">
          <ProjectsSection />
        </CurtainReveal>

        <CinematicSectionWrapper>
          <ExperienceSection />
        </CinematicSectionWrapper>

        <CinematicSectionWrapper>
          <ContactSection />
        </CinematicSectionWrapper>
      </main>
      <FooterSection />
    </div>
  );
}
