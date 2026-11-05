import { createFileRoute } from "@tanstack/react-router";
import { Diamond, DiamondAccent, Heading, PageHero, pad } from "@/components/site";
import { about, pageMeta, stats, whyCS } from "@/lib/content";
import cloudalize from "@/assets/partner/partner1.png";
import transtek from "@/assets/partner/transtek.png";
import indoorview from "@/assets/partner/indoorview.png";
import scenario from "@/assets/partner/scenario.png";
import granlund from "@/assets/partner/granlund.png";
import nomitech from "@/assets/partner/nomitech.png";

export const Route = createFileRoute("/about")({
  head: () => pageMeta(about.metaTitle, about.metaDescription),
  component: About,
});

// Logo files in src/assets/partner, in the same order as about.clients.logos.
const logoSrcs = [cloudalize, transtek, indoorview, scenario, granlund, nomitech];

function About() {
  return (
    <>
      {/* Who we are */}
      <PageHero eyebrow={about.eyebrow} title={about.heading} />
      <section className="bg-night">
        <div className="shell section grid gap-12 lg:grid-cols-12 lg:gap-16">
          <p className="type-body-lg text-mist lg:col-span-7">{about.text}</p>
          <dl className="tile-grid content-start lg:col-span-5">
            {stats.map((s) => (
              <div key={s.label} className="relative bg-panel p-8">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-brand" />
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-5xl font-extrabold tracking-tight text-white">
                    {s.value}
                  </span>
                  <span className="label mt-4 block text-slate-grey">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Why Concerted Solutions */}
      <section className="border-y border-line bg-panel">
        <div className="shell section grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Heading title={about.whyHeading} />
              <DiamondAccent className="mt-8" />
            </div>
          </div>
          <ol className="tile-grid lg:col-span-8">
            {whyCS.map((w, i) => (
              <li key={w.t} className="group relative bg-night p-7 md:p-8">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
                />
                <div className="flex items-center gap-3">
                  <Diamond className="h-3 w-3 text-brand" />
                  <span className="label text-slate-grey">{pad(i + 1)}</span>
                </div>
                <h3 className="type-h4 mt-5">{w.t}</h3>
                <p className="type-small mt-2 text-steel">{w.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Our Clients */}
      <section className="bg-night">
        <div className="shell section">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Heading eyebrow={about.clients.eyebrow} title={about.clients.heading} />
            </div>
            <p className="type-body-lg lg:col-span-5">{about.clients.text}</p>
          </div>
          <ul className="tile-grid mt-14 [grid-template-columns:repeat(2,minmax(0,1fr))] sm:[grid-template-columns:repeat(3,minmax(0,1fr))]">
            {about.clients.logos.map((name, i) => (
              <li key={name} className="grid place-items-center bg-white p-3">
                {/* Multiply drops the white backgrounds baked into the logo files */}
                <img
                  src={logoSrcs[i]}
                  alt={name}
                  loading="lazy"
                  className="aspect-[2/1] w-full object-contain mix-blend-multiply bg-white"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
