import React from "react";
import { ArrowDownRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { personalInfo } from "@/data/personal";

const profileFacts = [
  ["Based in", personalInfo.location],
  ["Core languages", "Python, C++, PHP, and SQL"],
  ["Applied work", "Mobile apps, cloud services, and embedded IoT systems"],
  ["Career direction", "Software engineering and cloud engineering"],
];

export const AboutSection: React.FC = () => (
  <section
    id="about"
    aria-labelledby="about-heading"
    className="section-light scroll-mt-20 border-y border-border bg-muted py-20 sm:py-28"
  >
    <Container>
      <AnimateOnScroll direction="none">
        <header className="grid gap-8 border-b border-border pb-10 lg:grid-cols-12 lg:items-end">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent lg:col-span-3">
            01 / About
          </p>
          <div className="lg:col-span-8 lg:col-start-5">
            <h2
              id="about-heading"
              className="chapter-heading max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-foreground sm:text-6xl"
            >
              Engineering across software, cloud, and the edge.
            </h2>
          </div>
        </header>
      </AnimateOnScroll>

      <div className="grid gap-12 pt-10 lg:grid-cols-12 lg:pt-14">
        <AnimateOnScroll direction="none" className="lg:col-span-3">
          <aside aria-label="Profile summary">
            <p className="max-w-xs text-sm leading-6 text-muted-foreground">
              A computer engineering foundation applied to connected products—from interface code to cloud data and physical devices.
            </p>
            <dl className="mt-8 border-t border-border">
              {profileFacts.map(([label, value]) => (
                <div key={label} className="border-b border-border py-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    {label}
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </AnimateOnScroll>

        <AnimateOnScroll direction="none" className="lg:col-span-7 lg:col-start-5">
          <div className="space-y-6">
            {personalInfo.bio.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "text-2xl leading-snug tracking-[-0.02em] text-foreground sm:text-3xl"
                    : "max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <a
            href="#projects"
            className="mt-10 inline-flex min-h-11 items-center gap-2 border-b border-accent font-mono text-xs uppercase tracking-[0.14em] text-foreground transition-colors hover:text-accent"
          >
            Read the LINIS case study
            <ArrowDownRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </AnimateOnScroll>
      </div>
    </Container>
  </section>
);
