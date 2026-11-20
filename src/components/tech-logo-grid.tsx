import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { technologies } from "@/lib/content";

const cellClass = "group relative block h-full bg-white";

/**
 * White logo tiles on Line Blue rules, matching the About clients grid.
 * Rows wrap and the last row is centred; each tile's 1px ring fills the
 * 1px gap so the rules read as one continuous grid.
 */
export function TechLogoGrid({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap justify-center gap-px p-px ${className}`}>
      {technologies.map((t) => {
        const body: ReactNode = (
          <>
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
            />
            <span className="flex aspect-[3/2] items-center justify-center p-6 md:p-7">
              <img
                src={t.logo}
                alt={t.name}
                title={t.name}
                loading="lazy"
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </span>
          </>
        );
        return (
          <li
            key={t.name}
            className="basis-[calc(50%-1px)] ring-1 ring-line md:basis-[calc(33.333%-1px)] lg:basis-[calc(20%-1px)]"
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
