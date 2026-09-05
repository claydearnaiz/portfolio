import { skillGroups } from "@/data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="capabilities-scene section-space" aria-labelledby="skills-heading">
      <div className="page-width">
        <header className="evidence-heading"><p className="eyebrow">Capabilities</p><h2 id="skills-heading">Tools across<br />the stack.</h2></header>
        <div className="skill-groups">
          {skillGroups.map(group => <div className="skill-row" key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}
        </div>
      </div>
    </section>
  );
}
