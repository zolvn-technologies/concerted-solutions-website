import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { ClosingBand } from "@/components/site";
import { getSolution, pageMeta, technologies, technologyPage } from "@/lib/content";

export const Route = createFileRoute("/technology-ecosystem")({
  head: () => pageMeta(technologyPage.metaTitle, technologyPage.metaDescription),
  component: Tech,
});

const pad = (n: number) => String(n).padStart(2, "0");

const cellClass =
  "group relative flex aspect-[4/3] flex-col justify-between bg-background p-6 transition-colors duration-300";

function Tech() {
  return (
    <>
      {/* Hero */}
      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 md:pt-28">
          <p className="reveal text-xs font-bold uppercase tracking-[0.1em] text-primary">
            {technologyPage.subline}
          </p>
          <h1 className="reveal mt-6 text-5xl font-bold uppercase leading-[1.05] text-primary md:text-7xl">
            {technologyPage.heading}
          </h1>
          <p className="reveal mt-10 max-w-3xl border-l-4 border-brand pl-6 text-lg leading-relaxed text-foreground/80 md:text-xl">
            {technologyPage.intro}
          </p>
        </div>
      </section>

      {/* Logo grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <ul className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-5">
          {technologies.map((t, i) => {
            const solution = t.link ? getSolution(t.link) : undefined;
            const body: ReactNode = (
              <>
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="font-mono text-xs text-muted-foreground/60">{pad(i + 1)}</span>
                <p className="text-center font-display text-xl font-black text-primary transition-colors duration-300 group-hover:text-brand-text md:text-2xl">
                  {t.name}
                </p>
                <span className="flex min-h-4 items-end justify-between gap-2 text-xs text-muted-foreground">
                  {solution && (
                    <>
                      <span className="leading-snug">{solution.title}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-brand-text transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </>
                  )}
                </span>
              </>
            );
            return (
              <li key={t.name}>
                {t.link ? (
                  <Link
                    to="/solutions/$slug"
                    params={{ slug: t.link }}
                    className={`${cellClass} hover:bg-secondary`}
                  >
                    {body}
                  </Link>
                ) : (
                  <div className={cellClass}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <ClosingBand button={technologyPage.button} />
    </>
  );
}
