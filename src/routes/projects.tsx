import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClosingBand } from "@/components/site";
import { ProjectCard } from "@/components/ProjectCard";
import { pageMeta, projectFilters, projects, projectsPage } from "@/lib/content";

export const Route = createFileRoute("/projects")({
  head: () => pageMeta(projectsPage.metaTitle, projectsPage.metaDescription),
  component: Projects,
});

const countFor = (f: string) =>
  f === "All" ? projects.length : projects.filter((p) => p.service === f).length;

function Projects() {
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.service === filter);
  return (
    <>
      {/* Heading */}
      <section className="bg-card">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-20 md:pt-28 lg:grid-cols-12 lg:gap-16 lg:pb-20">
          <div className="reveal lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-primary">
              {projectsPage.eyebrow}
            </p>
            <h1 className="mt-6 text-4xl font-bold uppercase leading-[1.05] text-primary md:text-6xl">
              {projectsPage.heading}
            </h1>
            <span aria-hidden className="mt-8 block h-1.5 w-20 bg-brand" />
          </div>
          <p className="reveal self-end border-l-4 border-brand pl-6 text-lg leading-[1.9] text-foreground/80 md:text-xl md:leading-[1.9] lg:col-span-5">
            {projectsPage.text}
          </p>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="flex flex-wrap gap-2">
            {projectFilters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={`inline-flex items-center gap-2.5 border px-4 py-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border bg-card text-primary hover:border-brand/50 hover:text-brand-text"
                  }`}
                >
                  {f}
                  <span
                    className={`font-mono text-[11px] ${active ? "text-brand-foreground/70" : "text-muted-foreground"}`}
                  >
                    {String(countFor(f)).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </section>

      <ClosingBand title={projectsPage.closing} line={null} button={projectsPage.button} />
    </>
  );
}
