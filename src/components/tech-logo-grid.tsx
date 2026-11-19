import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Diamond, pad } from "@/components/site";
import { technologies } from "@/lib/content";

const cellClass =
  "group relative flex h-full flex-col gap-3 bg-white p-4 transition-colors duration-300 md:p-5";

/**
 * Numbered logo tiles for the technology ecosystem. Rows wrap and the last
 * row is centred, so any number of technologies lays out evenly.
 */
export function TechLogoGrid({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap justify-center gap-px ${className}`}>
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
            <span className="flex h-24 items-center justify-center px-2 pb-4 md:h-28">
              <img
                src={t.logo}
                alt={t.name}
                loading="lazy"
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </span>
          </>
        );
        return (
          <li
            key={t.name}
            className="basis-[calc(50%-1px)] md:basis-[calc(33.333%-1px)] lg:basis-[calc(20%-1px)]"
          >
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
