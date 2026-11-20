import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClosingBand, PageHero } from "@/components/site";
import { ProjectCard } from "@/components/ProjectCard";
import { pageMeta, projectFilters, projects, projectsPage } from "@/lib/content";

export const Route = createFileRoute("/our-work")({
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
      <PageHero
        eyebrow={projectsPage.eyebrow}
        title={projectsPage.heading}
        text={projectsPage.text}
      />

      {/* Filters + grid */}
      <section className="bg-night">
        <div className="shell section">
          <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
            {projectFilters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={`inline-flex shrink-0 items-center gap-3 border px-4 py-3 font-display text-sm font-bold transition-colors ${
                    active
                      ? "border-brand bg-brand text-night"
                      : "border-line bg-panel text-white hover:border-brand"
                  }`}
                >
                  {f}
                  <span className={`text-[11px] ${active ? "text-night/75" : "text-slate-grey"}`}>
                    {String(countFor(f)).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-12 grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(320px,100%),1fr))]">
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
