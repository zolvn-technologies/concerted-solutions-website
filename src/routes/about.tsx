import { createFileRoute } from "@tanstack/react-router";
import { Diamond, DiamondAccent, Heading, PageHero, pad } from "@/components/site";
import { ClientLogoGrid } from "@/components/client-logo-grid";
import { about, experts, leadership, pageMeta, stats, whyCS } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => pageMeta(about.metaTitle, about.metaDescription),
  component: About,
});

function About() {
  return (
    <>
      {/* 1. Our Story */}
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

      {/* 2. Leadership */}
      <section className="border-y border-line bg-panel">
        <div className="shell section">
          <Heading eyebrow={leadership.eyebrow} title={leadership.heading} />
          <ul className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {leadership.people.map((p, i) => (
              <li
                key={`${p.name}-${i}`}
                className="group relative flex flex-col gap-7 bg-night p-7 sm:flex-row md:flex-col md:p-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
                />
                <div className="relative w-40 shrink-0 sm:w-44">
                  <span
                    aria-hidden
                    className="absolute -bottom-2 -right-2 h-full w-full rounded-full border border-brand/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                  />
                  <div className="relative aspect-square overflow-hidden rounded-full bg-panel ring-2 ring-brand">
                    {p.img ? (
                      <img
                        src={p.img}
                        alt={p.name}
                        loading="lazy"
                        className="img-grade h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                      />
                    ) : (
                      <span className="grid h-full w-full place-items-center font-display text-4xl font-extrabold text-line">
                        {initials(p.name)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="type-h3 text-white">{p.name}</h3>
                  <p className="label mt-2 text-brand">{p.role}</p>
                  <p className="type-small mt-4 flex-1 text-steel">{p.bio}</p>
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.name} on LinkedIn`}
                    className="mt-6 inline-flex w-fit items-center gap-2.5 border border-line px-4 py-2.5 font-display text-sm font-bold text-white transition-colors hover:border-brand hover:bg-brand"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Expert Network */}
      <section className="bg-night">
        <div className="shell section">
          <Heading eyebrow={experts.eyebrow} title={experts.heading} />
          <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {experts.people.map((p) => (
              <li key={p.name} className="group flex flex-col items-center text-center">
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute -inset-1.5 rounded-full border border-line transition-colors duration-300 group-hover:border-brand/60"
                  />
                  <div className="relative h-24 w-24 overflow-hidden rounded-full bg-panel ring-2 ring-brand md:h-28 md:w-28">
                    <img
                      src={p.img}
                      alt={p.name}
                      width={224}
                      height={224}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <h3 className="mt-5 font-display text-base font-bold leading-snug text-white">
                  {p.name}
                </h3>
                <p className="type-small mt-1 max-w-[15rem] text-steel">{p.org}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Why Concerted Solutions */}
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

      {/* 5. Our Clients */}
      <section className="bg-night">
        <div className="shell section">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Heading eyebrow={about.clients.eyebrow} title={about.clients.heading} />
            </div>
            <p className="type-body-lg lg:col-span-5">{about.clients.text}</p>
          </div>
          <ClientLogoGrid className="mt-14" />
        </div>
      </section>
    </>
  );
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
