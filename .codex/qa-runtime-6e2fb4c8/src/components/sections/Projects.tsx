import React from "react";
import Image from "next/image";
import { ArrowUpRight, Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { projectsData } from "@/data/projects";
import { personalInfo } from "@/data/personal";

const pipeline = [
  ["01", "Sense", "Weight and fill sensors collect the state of six shared bins."],
  ["02", "Interpret", "A Raspberry Pi runs YOLOv8n-NCNN for ROI-based people counting."],
  ["03", "Synchronize", "A Python service aligns multi-source timestamps in Firebase."],
  ["04", "Forecast", "Feature engineering feeds a Random Forest overflow estimate."],
];

export const ProjectsSection: React.FC = () => {
  const project = projectsData[0];

  if (!project) return null;

  return (
    <section id="projects" className="border-b border-border bg-surface">
      <Container size="full" className="py-20 sm:py-28">
        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">02 / Selected work</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-foreground sm:text-6xl">
              One system, fully explained.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9">
            LINIS is the main case study: a computer engineering thesis that turns a physical waste stream into a readable operational signal.
          </p>
        </div>

        <article className="grid gap-10 py-12 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="lg:col-span-4">
            <div className="flex items-center justify-between border-t border-accent pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <span>Thesis / 2025—26</span>
              <span>01</span>
            </div>
            <h3 className="mt-8 max-w-sm text-4xl font-semibold leading-[0.92] tracking-[-0.06em] text-foreground sm:text-5xl">
              {project.title.replace(" – Smart Bin Monitoring System", "")}
            </h3>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-8 border-t border-border pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Role / Systems architecture, application, edge integration</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Stack / React Native · Raspberry Pi · Python · Firebase</p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <figure className="border border-border bg-background p-3 sm:p-5">
              <div className="flex min-h-[28rem] items-center justify-center bg-surface-strong p-5 sm:min-h-[38rem]">
                <Image
                  src={project.image}
                  alt="LINIS mobile monitoring dashboard"
                  width={159}
                  height={346}
                  priority
                  className="h-[min(72vh,34rem)] w-auto object-contain"
                  sizes="(max-width: 1024px) 90vw, 55vw"
                />
              </div>
              <figcaption className="flex flex-wrap justify-between gap-3 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                <span>LINIS / Monitoring overview</span>
                <span>Mobile interface</span>
              </figcaption>
            </figure>
          </div>
        </article>

        <div className="grid gap-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">The engineering question</p>
            <h3 className="mt-5 max-w-xs text-3xl font-semibold leading-[0.95] tracking-[-0.05em] text-foreground sm:text-4xl">
              When does a shared bin become an operational problem?
            </h3>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="max-w-2xl text-lg leading-relaxed text-foreground sm:text-xl">
              {project.problemSolved}
            </p>

            <ol className="mt-10 border-y border-border">
              {pipeline.map(([number, title, detail]) => (
                <li key={number} className="grid gap-3 border-b border-border py-5 last:border-b-0 sm:grid-cols-[3.5rem_8rem_1fr] sm:items-start">
                  <span className="font-mono text-xs text-accent">{number}</span>
                  <h4 className="text-sm font-medium uppercase tracking-[0.08em] text-foreground">{title}</h4>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-border pt-10 sm:grid-cols-3">
          {[
            ["/projects/linis-app-1.png", "Monitoring overview"],
            ["/projects/linis-app-2.png", "Bin-level status"],
            ["/projects/linis-app-3.png", "Notification log"],
          ].map(([src, alt]) => (
            <figure key={src} className="border border-border bg-background p-3">
              <div className="flex h-80 items-center justify-center bg-surface-strong p-3">
                <Image src={src} alt={alt} width={178} height={367} className="h-full w-auto object-contain" sizes="(max-width: 640px) 90vw, 30vw" />
              </div>
              <figcaption className="pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{alt}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-border pt-6">
          <Button href={`mailto:${personalInfo.email}?subject=${encodeURIComponent("LINIS project walkthrough")}`} variant="primary" size="md" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
            Request a walkthrough
          </Button>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Lock className="h-4 w-4 text-accent" /> Private thesis code</span>
        </div>
      </Container>
    </section>
  );
};
