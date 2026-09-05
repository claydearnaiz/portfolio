import { ArrowDown } from "lucide-react";
import { personalInfo } from "@/data/personal";

export function HeroSection() {
  return (
    <section id="hero" className="identity-scene" aria-labelledby="hero-heading">
      <div className="hero-stage">
        <div className="hero-topline"><span>Software & connected systems</span><span>Philippines</span></div>
        <h1 id="hero-heading" className="hero-name">
          <span className="name-mask"><span>Clayde</span></span>
          <span className="name-mask"><span>Arnaiz</span></span>
        </h1>
        <div className="hero-support">
          <p>{personalInfo.tagline}</p>
          <a className="text-link" href="#projects">Explore the work <ArrowDown aria-hidden="true" size={18} /></a>
        </div>
        <div className="hero-plane" aria-hidden="true" />
      </div>
    </section>
  );
}
