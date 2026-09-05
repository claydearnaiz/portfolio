import { ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/data/personal";

export function ContactSection() {
  return (
    <section id="contact" className="contact-scene section-space" aria-labelledby="contact-heading">
      <div className="page-width">
        <p className="eyebrow">Have a role or a project in mind?</p>
        <h2 id="contact-heading" className="contact-title">Get in touch.</h2>
        <a className="contact-email" href={`mailto:${personalInfo.email}`}>{personalInfo.email}<ArrowUpRight aria-hidden="true" /></a>
        <div className="contact-bottom"><p>{personalInfo.location}</p><nav aria-label="Professional profiles"><a className="text-link" href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight aria-hidden="true" size={16} /></a><a className="text-link" href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight aria-hidden="true" size={16} /></a><a className="text-link" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight aria-hidden="true" size={16} /></a></nav></div>
      </div>
    </section>
  );
}
