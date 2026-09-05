import { personalInfo } from "@/data/personal";

const layers = [
  ["Applications", "Desktop, mobile, and web"],
  ["Software & data", "Native logic and persistence"],
  ["Services", "Synchronization and automation"],
  ["Embedded systems", "Sensors and edge computing"],
];

export function AboutSection() {
  return (
    <section id="about" className="section-light about-scene section-space" aria-labelledby="about-heading">
      <div className="page-width">
        <p className="eyebrow">Engineering perspective</p>
        <h2 id="about-heading" className="display-heading about-title">Software is only<br />one layer.</h2>
        <div className="about-body">
          <div className="about-copy"><p className="lead">{personalInfo.bio[0]}</p><p>{personalInfo.bio[1]}</p></div>
          <ol className="system-layers" aria-label="Connected areas of my work">
            {layers.map(([name, detail], index) => <li key={name}><span className="layer-index">0{index + 1}</span><div><h3>{name}</h3><p>{detail}</p></div></li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
