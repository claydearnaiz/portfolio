import React from "react";
import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { skillsData } from "@/data/skills";

const domains = [
  {
    id: "software",
    number: "02.1",
    title: "Software foundations",
    description: "Programming languages, web interfaces, and relational data used to build working applications.",
    skills: ["Python", "C++", "PHP", "SQL & Relational DBs", "React / HTML / CSS"],
  },
  {
    id: "applications",
    number: "02.2",
    title: "Applications and cloud",
    description: "Mobile delivery, server-side JavaScript, and managed services for synchronized application data.",
    skills: ["Expo / React Native", "Flutter", "Node.js", "Firebase & Firestore", "Supabase"],
  },
  {
    id: "embedded",
    number: "02.3",
    title: "Embedded intelligence",
    description: "The physical and machine-learning layer behind the LINIS smart-bin monitoring system.",
    skills: ["Raspberry Pi & Arduino", "YOLOv8n-NCNN Edge AI", "Random Forest Regression"],
  },
  {
    id: "operations",
    number: "02.4",
    title: "Operations and delivery",
    description: "Version control, service management, team coordination, and technical handoff practices.",
    skills: ["GitHub", "Freshservice (ITSM)", "Monday.com", "Technical Documentation"],
  },
];

const skillLookup = new Map(skillsData.map((skill) => [skill.name, skill]));

export const SkillsSection: React.FC = () => (
  <section
    id="skills"
    aria-labelledby="skills-heading"
    className="scroll-mt-20 bg-background py-20 sm:py-28"
  >
    <Container>
      <AnimateOnScroll direction="none">
        <header className="grid gap-8 border-b border-border pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              02 / Capabilities
            </p>
            <h2
              id="skills-heading"
              className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-foreground sm:text-6xl"
            >
              A connected engineering practice.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground lg:col-span-4 lg:col-start-9">
            Grouped by how the tools are used in a system—not reduced to percentage scores. The evidence comes from coursework, internship work, and the LINIS thesis deployment.
          </p>
        </header>
      </AnimateOnScroll>

      <div className="border-b border-border">
        {domains.map((domain, index) => {
          const domainSkills = domain.skills.flatMap((skillName) => {
            const skill = skillLookup.get(skillName);
            return skill ? [skill] : [];
          });

          return (
            <AnimateOnScroll key={domain.id} direction="none" delay={index * 0.06}>
              <article className="grid gap-7 border-t border-border py-9 sm:py-11 lg:grid-cols-12">
                <p className="font-mono text-xs tracking-[0.14em] text-accent lg:col-span-2">
                  {domain.number}
                </p>
                <div className="lg:col-span-4">
                  <h3 className="text-2xl font-semibold tracking-[-0.025em] text-foreground sm:text-3xl">
                    {domain.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    {domain.description}
                  </p>
                </div>
                <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-6" aria-label={`${domain.title} skills`}>
                  {domainSkills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex min-h-11 items-center border-t border-border text-sm text-foreground first:border-t-0 sm:[&:nth-child(2)]:border-t-0"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </article>
            </AnimateOnScroll>
          );
        })}
      </div>
    </Container>
  </section>
);
