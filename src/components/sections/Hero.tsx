import { ArrowDown } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="hero" className="identity-scene" aria-labelledby="hero-heading">
      <div className="hero-stage">
        <div className="hero-art" aria-hidden="true"><div className="hero-art-settle"><Image src="/artwork/noragami.jpg" alt="" width={736} height={736} sizes="(max-width: 599px) 80vw, 48vw" priority /></div></div>
        <div className="hero-topline"><span className="hero-location">Philippines</span></div>
        <h1 id="hero-heading" className="hero-name">
          <span className="name-mask"><span>Clayde</span></span>
          <span className="name-mask"><span>Arnaiz</span></span>
        </h1>
        <div className="hero-support">
          <p>Computer Engineering graduate building desktop and web applications, from interfaces to the systems behind them.</p>
          <a className="text-link" href="#projects">Explore the work <ArrowDown aria-hidden="true" size={18} /></a>
        </div>
        <div className="hero-plane" aria-hidden="true" />
      </div>
    </section>
  );
}
