import { InspectableImage as Image } from "@/components/ui/InspectableImage";
import { LinisSystem } from "@/components/sections/LinisSystem";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { linisLayers, projectsData } from "@/data/projects";
import { personalInfo } from "@/data/personal";

const ayosScreens = [
  { file: "overview", title: "Home", detail: "Tasks, projects, and money in one daily overview", width: 1012, height: 664 },
  { file: "focus", title: "Focus", detail: "Space for the task at hand", width: 1013, height: 664 },
  { file: "calendar", title: "Calendar", detail: "Tasks, events, and renewals on a shared schedule", width: 1012, height: 667 },
  { file: "notes", title: "Notes", detail: "A place to capture ideas", width: 1017, height: 661 },
  { file: "welcome", title: "Welcome", detail: "The start of a local session", width: 1006, height: 656 },
];

function ProjectMeta({ index }: { index: number }) {
  const project = projectsData[index];
  return <div className="project-meta"><span>{project.kind}</span><span>{project.year}</span></div>;
}

function ProjectContribution({ index }: { index: number }) {
  return <div className="project-contribution"><p>Engineering contribution</p><p>{projectsData[index].problemSolved}</p></div>;
}

export function ProjectsSection() {
  const [ayos, linis, attendance] = projectsData;
  return (
    <section id="projects" className="work-section" aria-labelledby="projects-heading">
      <div className="work-intro page-width">
        <div className="work-rule" />
        <h2 id="projects-heading" className="work-title">Selected<br />work.</h2>
        <p className="work-intro-copy">Desktop, connected systems, and web.<br />Three projects, from interface to implementation.</p>
        <nav className="project-index" aria-label="Project index">
          <a href="#ayos"><span>01</span><strong>AyOS</strong><span>Desktop application</span><ArrowDownRight aria-hidden="true" size={20} /></a>
          <a href="#linis"><span>02</span><strong>LINIS</strong><span>Connected systems</span><ArrowDownRight aria-hidden="true" size={20} /></a>
          <a href="#qr-attendance"><span>03</span><strong>QR Attendance</strong><span>Web application</span><ArrowDownRight aria-hidden="true" size={20} /></a>
        </nav>
      </div>

      <article id="ayos" className="ayos-project" aria-labelledby="ayos-heading">
        <header className="project-header page-width">
          <ProjectMeta index={0} />
          <div className="project-heading-row"><h3 id="ayos-heading" className="project-title">AyOS</h3><div><p className="project-subtitle">Personal Productivity OS</p><p className="project-summary">{ayos.description}</p></div></div>
          <p className="technology-line">{ayos.technologies.join(" · ")}</p>
          <ProjectContribution index={0} />
        </header>

        <div className="ayos-scene">
          <div className="ayos-stage">
            <a className="gallery-skip text-link" href="#ayos-architecture">Skip to architecture <ArrowDownRight aria-hidden="true" size={16} /></a>
            {ayosScreens.map((screen, index) => <figure className="ayos-screen" key={screen.file}>
              <Image src={`/projects/ayos/${screen.file}.png`} alt={`AyOS ${screen.title} screen — ${screen.detail}`} width={screen.width} height={screen.height} sizes="(max-width: 899px) 100vw, 85vw" />
              <figcaption><span><strong>{screen.title}</strong><span>{screen.detail}</span></span><span className="ayos-count">0{index + 1} / 0{ayosScreens.length}</span></figcaption>
            </figure>)}
          </div>
        </div>
        <div className="page-width">
            <figure id="ayos-architecture" tabIndex={-1} className="ayos-architecture section-light" aria-labelledby="ayos-architecture-caption">
              <figcaption id="ayos-architecture-caption">Application architecture <ArrowDownRight aria-hidden="true" size={22} /></figcaption>
              <p className="architecture-statement">One desktop.<br />One local system.</p>
              <ol className="architecture-stack">
                <li className="architecture-layer"><span className="architecture-number">01</span><div><span className="architecture-label">Interface</span><strong>React <span>+ TypeScript</span></strong><p>Productivity, finance, fitness, and calendar</p></div></li>
                <li className="architecture-layer"><span className="architecture-number">02</span><div><span className="architecture-label">Native application</span><strong>Rust <span>+ Tauri</span></strong><p>Validation, backups, and native operations</p></div></li>
                <li className="architecture-layer"><span className="architecture-number">03</span><div><span className="architecture-label">Persistence</span><strong>SQLite</strong><p>Embedded storage, available offline</p></div></li>
              </ol>
              <p className="architecture-connection">Authenticated localhost API <span aria-hidden="true">↔</span> n8n automation</p>
            </figure>
        </div>
      </article>

      <article id="linis" className="linis-project section-light" aria-labelledby="linis-heading">
        <header className="project-header page-width">
          <ProjectMeta index={1} />
          <div className="project-heading-row"><h3 id="linis-heading" className="project-title">LINIS</h3><div><p className="project-subtitle linis-promise">Know which bin needs attention<br />before it overflows.</p><p className="project-summary">IoT System for Bin Time-to-Overflow Forecasting and Priority Collection</p></div></div>
          <p className="technology-line">{linis.technologies.join(" · ")}</p>
          <ProjectContribution index={1} />
        </header>
        <div className="linis-showcase page-width" aria-label="LINIS Android application screens">
          <figure><Image src="/projects/linis-app-2.png" alt="LINIS bin detail screen" width={162} height={338} sizes="(max-width: 599px) 58vw, 26vw" /><figcaption>Bin detail / Inspect an individual bin</figcaption></figure>
          <figure><Image src="/projects/linis-app-3.png" alt="LINIS notification history" width={178} height={367} sizes="(max-width: 599px) 58vw, 26vw" /><figcaption>Notifications / Review monitoring alerts</figcaption></figure>
        </div>
        <div className="linis-context page-width"><p className="eyebrow">From readings to decisions</p><p>{linis.description}</p></div>
        <div className="linis-scene">
          <div className="linis-stage">
            <div className="linis-stage-top"><span>From the physical world to the interface</span><span>LINIS</span></div>
            <div className="linis-composition">
              <figure className="linis-anchor">
                <div className="linis-image-frame"><Image src={linis.image} alt="LINIS Android application showing bin monitoring information" width={159} height={346} sizes="(max-width: 900px) 60vw, 28vw" className="linis-image" /></div>
                <figcaption>Android monitoring application</figcaption>
              </figure>
              <div className="linis-explanation">
                <ol className="linis-steps" aria-label="LINIS system layers">
                  {linisLayers.map((layer, index) => <li className="linis-step" key={layer.name}><span className="step-number">0{index + 1}</span><div><h4>{layer.name}</h4><p className="layer-tech">{layer.technology}</p><p className="layer-detail">{layer.detail}</p></div></li>)}
                </ol>
                <LinisSystem />
              </div>
            </div>
            <div className="linis-track" aria-hidden="true"><span /></div>
          </div>
        </div>
      </article>

      <article id="qr-attendance" className="attendance-project section-space" aria-labelledby="attendance-heading">
        <div className="page-width">
          <ProjectMeta index={2} />
          <div className="attendance-heading-row"><h3 id="attendance-heading" className="section-heading">QR Attendance<br /><span className="quiet-title">& Allowances</span></h3><div><p className="project-summary">{attendance.description}</p><p className="technology-line">{attendance.technologies.join(" · ")}</p></div></div>
          <ProjectContribution index={2} />
          <ol className="attendance-flow" aria-label="Attendance and allowance workflow">
            <li><span className="flow-number">01</span><h4>Create an event</h4><p>Define the event and its allowance amount.</p></li>
            <li><span className="flow-number">02</span><h4>Verify attendance</h4><p>Record attendance through the QR-based workflow.</p></li>
            <li><span className="flow-number">03</span><h4>Credit allowance</h4><p>Automatically credit eligible users after verification.</p></li>
          </ol>
          <div className="attendance-roles"><p>Role-based dashboards</p><ul><li>Admins</li><li>Workers</li><li>Attendees</li></ul></div>
          <a className="text-link project-inquiry" href={`mailto:${personalInfo.email}?subject=Project%20walkthrough`}>Talk through the projects <ArrowUpRight aria-hidden="true" size={18} /></a>
        </div>
      </article>
    </section>
  );
}
