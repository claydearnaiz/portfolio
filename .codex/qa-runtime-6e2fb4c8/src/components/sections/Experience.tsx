import React from "react";
import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { experienceData } from "@/data/experience";

export const ExperienceSection: React.FC = () => (
  <section
    id="experience"
    aria-labelledby="experience-heading"
    className="scroll-mt-20 border-y border-border bg-background py-20 sm:py-28"
  >
    <Container>
      <AnimateOnScroll direction="none">
        <header className="grid gap-8 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              04 / Experience
            </p>
            <h2
              id="experience-heading"
              className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-foreground sm:text-6xl"
            >
              Education and work, in context.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground lg:col-span-4 lg:col-start-9">
            Computer engineering study paired with operational experience in asset tracking, IT service management, workflow coordination, and documentation.
          </p>
        </header>
      </AnimateOnScroll>

      <div className="border-b border-border">
        {experienceData.map((item, index) => (
          <AnimateOnScroll key={item.id} direction="none" delay={index * 0.06}>
            <article className="grid gap-7 border-t border-border py-9 sm:py-11 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {String(index + 1).padStart(2, "0")} / {item.type}
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {item.period}
                </p>
              </div>

              <div className="lg:col-span-4">
                <h3 className="text-2xl font-semibold tracking-[-0.025em] text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.organization}
                </p>
              </div>

              <div className="lg:col-span-5">
                <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
                {item.technologies && item.technologies.length > 0 ? (
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      Scope
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs leading-5 text-foreground">
                      {item.technologies.map((technology, technologyIndex) => (
                        <li key={technology}>
                          {technology}
                          {technologyIndex < item.technologies!.length - 1 ? "," : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </article>
          </AnimateOnScroll>
        ))}
      </div>
    </Container>
  </section>
);
