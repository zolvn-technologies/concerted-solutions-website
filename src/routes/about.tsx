import { createFileRoute } from "@tanstack/react-router";
import { Diamond, DiamondAccent, Heading, PageHero, pad } from "@/components/site";
import { TechLogoGrid } from "@/components/tech-logo-grid";
import { about, experts, pageMeta, stats, whyCS } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => pageMeta(about.metaTitle, about.metaDescription),
  component: About,
});

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

      {/* Partners & Subject Matter Experts */}
      <section className="border-t border-line bg-night">
        <div className="shell section">
          <Heading eyebrow={experts.eyebrow} title={experts.heading} />
          <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
            {experts.people.map((p) => (
              <li key={p.name} className="group flex flex-col items-center text-center">
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute -inset-2 rounded-full border border-line transition-colors duration-300 group-hover:border-brand/60"
                  />
                  <div className="relative h-32 w-32 overflow-hidden rounded-full bg-panel ring-[3px] ring-brand md:h-36 md:w-36 lg:h-40 lg:w-40">
                    <img
                      src={p.img}
                      alt={p.name}
                      width={320}
                      height={320}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <h3 className="type-h4 mt-7 text-white">{p.name}</h3>
                <p className="type-small mt-1.5 max-w-[16rem] text-steel">{p.org}</p>
              </li>
            ))}
          </ul>
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
          <TechLogoGrid className="mt-14" />
        </div>
      </section>
    </>
  );
}
