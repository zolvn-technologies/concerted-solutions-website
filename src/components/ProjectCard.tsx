import type { Project } from "@/lib/content";
import { Diamond } from "@/components/site";
import hero from "@/assets/hero.jpg";
import fakeeh from "@/assets/projects/fakeeh-hospital.jpg";
import masar from "@/assets/projects/masar-destination.jpg";
import sharjah from "@/assets/projects/sharjah-airport.jpg";
import ace from "@/assets/projects/ace.jpeg";
import schools from "@/assets/projects/abu-dhabi-schools.jpg";
import markets from "@/assets/projects/abu-dhabi-city.avif";
import alfagih from "@/assets/projects/alfagih-hospital.jpg";
import parsons from "@/assets/projects/parsons-cost.jpg";
import olaya from "@/assets/projects/olaya-towers.jpg";
import granada from "@/assets/projects/granada-business-park.jpg";
import uptown from "@/assets/projects/uptown-dubai.jpg";
import difc from "@/assets/projects/difc-living.jpg";

// One image per project, keyed by project name in src/lib/content.ts
const projectImages: Record<string, string> = {
  "Fakeeh University Hospital": fakeeh,
  "Masar Destination": masar,
  "Sharjah International Airport Expansion": sharjah,
  "Al Ain Consulting Engineers (ACE)": ace,
  "Abu Dhabi & Al Ain Schools": schools,
  "Abu Dhabi City Municipality – Public Markets": markets,
  "Dr. Mohammad Alfagih Hospital": alfagih,
  "Parsons – Cost Estimating Platform": parsons,
  "Olaya Towers": olaya,
  "Granada Business Park": granada,
  "Uptown Dubai – Towers 3 & 4": uptown,
  "DIFC Living & Innovation Two (CP-02)": difc,
};

export const imgFor = (p: Project) => projectImages[p.name] ?? hero;

function ProjectImage({ p }: { p: Project }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b-[3px] border-brand bg-night">
      <img
        src={imgFor(p)}
        alt={p.name}
        loading="lazy"
        width={1200}
        height={800}
        className="img-grade h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgb(2_27_51/0.45),transparent_55%)]"
      />
    </div>
  );
}

// Full card for /our-work; `compact` shows image, name and outcome only (Home).
export function ProjectCard({ p, compact }: { p: Project; compact?: boolean }) {
  const meta = [
    ["Client", p.client],
    ["Location", p.location],
    ...(p.scale !== "–" ? [["Scale", p.scale]] : []),
  ];
  return (
    <article className="group flex h-full flex-col border border-line bg-panel transition-colors duration-300 hover:border-brand/60">
      <ProjectImage p={p} />
      <div className="flex flex-1 flex-col p-6 md:p-7">
        {!compact && <p className="label text-brand">{p.service}</p>}
        <h3 className={`type-h4 ${compact ? "" : "mt-3"}`}>{p.name}</h3>
        {compact ? (
          <p className="type-small mt-4 flex gap-3 text-steel">
            <Diamond className="mt-1 h-2.5 w-2.5 text-brand" />
            {p.outcome}
          </p>
        ) : (
          <>
            <p className="type-small mt-2 text-steel">{p.desc}</p>
            <dl className="mt-5 grid gap-2 border-t border-line pt-4 text-[13px] leading-snug">
              {meta.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-3">
                  <dt className="label pt-px text-[11px] text-slate-grey">{k}</dt>
                  <dd className="text-slate-grey">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto pt-6">
              <p className="flex gap-3 border border-line bg-night px-4 py-3.5 text-sm leading-relaxed text-mist">
                <Diamond className="mt-1.5 h-2.5 w-2.5 text-brand" />
                {p.outcome}
              </p>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
