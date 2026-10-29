import type { Project } from "@/lib/content";
import hospital from "@/assets/p-hospital.jpg";
import towers from "@/assets/p-towers.jpg";
import airport from "@/assets/p-airport.jpg";
import scan from "@/assets/scan.jpg";
import hero from "@/assets/hero.jpg";

export const imgFor = (p: Project) => {
  if (p.name.includes("Hospital")) return hospital;
  if (p.name.includes("Airport")) return airport;
  if (p.service === "Reality Capture") return scan;
  if (p.service === "Digital Engineering & BIM") return towers;
  return hero;
};

export function ProjectCard({ p }: { p: Project }) {
  const meta = [
    ["Client", p.client],
    ["Location", p.location],
    ...(p.scale !== "–" ? [["Scale", p.scale]] : []),
  ];
  return (
    <article className="group relative flex flex-col border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imgFor(p)}
          alt={p.name}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 bg-card/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-text backdrop-blur">
          {p.service}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold leading-snug text-primary">{p.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
        <dl className="mt-5 grid gap-2 border-t border-border pt-4 text-xs">
          {meta.map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <dt className="w-16 shrink-0 font-mono uppercase text-muted-foreground">{k}</dt>
              <dd className="text-foreground/85">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto pt-5">
          <p className="border-l-2 border-brand bg-secondary px-4 py-3 text-sm font-medium text-primary">
            {p.outcome}
          </p>
        </div>
      </div>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-1 w-0 bg-brand transition-all duration-500 group-hover:w-full"
      />
    </article>
  );
}
