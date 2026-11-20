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
import { ClosingBand, Diamond, PageHero, pad } from "@/components/site";
import { industries, industriesPage, pageMeta } from "@/lib/content";

export const Route = createFileRoute("/sectors")({
  head: () => pageMeta(industriesPage.metaTitle, industriesPage.metaDescription),
  component: Industries,
});

const icons = [Landmark, Waypoints, Hotel, Stethoscope, Plane, Building2, Factory, Server];

const itemClass =
  "group relative flex h-full flex-col bg-panel p-7 transition-colors duration-300 md:p-8";

function Industries() {
  return (
    <>
      <PageHero
        eyebrow={industriesPage.subline}
        title={industriesPage.heading}
        text={industriesPage.intro}
      />

      {/* Sectors */}
      <section className="bg-night">
        <div className="shell section">
          <ul className="tile-grid">
            {industries.map((ind, i) => {
              const Icon = icons[i] ?? Building2;
              const body: ReactNode = (
                <>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
                  />
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center border border-line text-brand transition-colors duration-300 group-hover:border-brand">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    {ind.link ? (
                      <ArrowUpRight className="h-5 w-5 text-brand transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    ) : (
                      <span className="label text-slate-grey">{pad(i + 1)}</span>
                    )}
                  </div>
                  <h2 className="type-h4 mt-10">{ind.t}</h2>
                  <p className="type-small mt-3 text-steel">{ind.d}</p>
                  <span className="mt-auto pt-8">
                    <Diamond className="h-2.5 w-2.5 text-line transition-colors group-hover:text-brand" />
                  </span>
                </>
              );
              return (
                <li key={ind.t} className="bg-panel">
                  {ind.link ? (
                    <Link
                      to="/solutions/$slug"
                      params={{ slug: ind.link }}
                      className={`${itemClass} hover:bg-night`}
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
        </div>
      </section>

      <ClosingBand button={industriesPage.button} />
    </>
  );
}
