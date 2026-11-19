import { clientLogos } from "@/lib/content";

/** White logo tiles on the dark line grid, used for the About clients section. */
export function ClientLogoGrid({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 ${className}`}
    >
      {clientLogos.map((c) => (
        <li key={c.name} className="group relative bg-white">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
          />
          <div className="flex aspect-[3/2] items-center justify-center p-4 md:p-5">
            <img
              src={c.logo}
              alt={c.name}
              title={c.name}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
