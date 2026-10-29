import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Building2,
  Factory,
  Hotel,
  Landmark,
  Plane,
  Server,
  Stethoscope,
  Waypoints,
} from "lucide-react";
import type { ReactNode } from "react";
import { ClosingBand } from "@/components/site";
import { industries, industriesPage, pageMeta } from "@/lib/content";

export const Route = createFileRoute("/industries")({
  head: () => pageMeta(industriesPage.metaTitle, industriesPage.metaDescription),
  component: Industries,
});

const icons = [Landmark, Waypoints, Hotel, Stethoscope, Plane, Building2, Factory, Server];

const pad = (n: number) => String(n).padStart(2, "0");

const itemClass = "group relative block h-full border-t border-border py-8";

function Industries() {
  return (
    <>
      {/* Hero */}
      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 md:pt-28">
          <p className="reveal text-xs font-bold uppercase tracking-[0.1em] text-primary">
            {industriesPage.subline}
          </p>
          <h1 className="reveal mt-6 text-5xl font-bold uppercase leading-[1.05] text-primary md:text-7xl">
            {industriesPage.heading}
          </h1>
          <p className="reveal mt-10 max-w-2xl border-l-4 border-brand pl-6 text-lg leading-relaxed text-foreground/80 md:text-xl">
            {industriesPage.intro}
          </p>
        </div>
      </section>

      {/* Sectors */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => {
            const Icon = icons[i] ?? Building2;
            const body: ReactNode = (
              <>
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 w-0 bg-brand transition-all duration-500 group-hover:w-full"
                />
                <div className="flex items-start justify-between">
                  <Icon className="h-8 w-8 text-brand-text" strokeWidth={1.5} />
                  {ind.link ? (
                    <ArrowUpRight className="h-5 w-5 text-brand-text transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  ) : (
                    <span className="font-mono text-xs text-muted-foreground/60">{pad(i + 1)}</span>
                  )}
                </div>
                <h2 className="mt-10 text-lg font-bold leading-snug text-primary">{ind.t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ind.d}</p>
              </>
            );
            return (
              <li key={ind.t}>
                {ind.link ? (
                  <Link
                    to="/solutions/$slug"
                    params={{ slug: ind.link }}
                    className={itemClass}
                  >
                    {body}
                  </Link>
                ) : (
                  <div className={itemClass}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <ClosingBand button={industriesPage.button} />
    </>
  );
}
