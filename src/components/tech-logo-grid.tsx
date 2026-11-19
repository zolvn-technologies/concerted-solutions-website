import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Diamond, pad } from "@/components/site";
import { technologies } from "@/lib/content";

// Logo files in public/tech, keyed by technology name
const logos: Record<string, string> = {
  "Nemetschek Group": "/tech/nemetschek-group.png",
  dTwin: "/tech/dtwin.png",
  Solibri: "/tech/solibri.png",
  Bluebeam: "/tech/bluebeam.png",
  Spacewell: "/tech/spacewell.png",
  OMEO: "/tech/omeo.png",
  SCENARIO: "/tech/scenario.png",
  CostOS: "/tech/cost-os_logo.webp",
  "ABOT Systems®": "/tech/abot-systems.png",
};

const cellClass =
  "group relative flex h-full min-h-48 flex-col justify-between gap-4 bg-white p-3 md:min-h-30 md:p-3 transition-colors duration-300";

/** Numbered logo tiles for the technology list; used on Technology and About. */
export function TechLogoGrid({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-3 ${className}`}
    >
      {technologies.map((t, i) => {
        const body: ReactNode = (
          <>
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
            />
            <span className="flex items-center justify-between">
              <span className="label text-slate-grey">{pad(i + 1)}</span>
              <Diamond
                className={`h-2.5 w-2.5 transition-colors ${t.link ? "text-brand" : "text-line"}`}
              />
            </span>
            {logos[t.name] ? (
              <span className="flex h-24 items-center justify-center bg-white p-3">
                <img
                  src={logos[t.name]}
                  alt={t.name}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </span>
            ) : (
              <p className="flex h-24 items-center justify-center text-center font-display text-lg font-extrabold leading-tight text-white md:text-xl">
                {t.name}
              </p>
            )}
            <span className="min-h-8" />
          </>
        );
        return (
          <li key={t.name}>
            {t.link ? (
              <Link to="/solutions/$slug" params={{ slug: t.link }} className={cellClass}>
                {body}
              </Link>
            ) : (
              <div className={cellClass}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
