import { experienceData } from "@/data/experience";

export function ExperienceSection() {
  const [work, education] = experienceData;
  return (
    <section id="experience" className="section-light section-space experience-scene" aria-labelledby="experience-heading">
      <div className="page-width">
        <header className="evidence-heading"><p className="eyebrow">Experience & education</p><h2 id="experience-heading">Working with people,<br />devices, and systems.</h2></header>
        <article className="experience-row"><p className="quiet">{work.period}</p><div><h3>{work.organization}</h3><p className="role">{work.title}</p></div><p className="experience-detail">{work.description}</p></article>
        <div className="education-row"><p className="quiet">Education · {education.period}</p><div><h3>{education.title}</h3><p>{education.organization}</p></div></div>
      </div>
    </section>
  );
}
