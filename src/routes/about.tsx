import { createFileRoute } from "@tanstack/react-router";
import { Heading } from "@/components/site";
import { about, pageMeta, stats, whyCS } from "@/lib/content";
import partner1 from "@/assets/partner/partner1.png";
import partner2 from "@/assets/partner/partner2.png";
import partner3 from "@/assets/partner/partner3.jpg";
import partner4 from "@/assets/partner/partner4.jpg";
import partner5 from "@/assets/partner/partner5.jpg";
import partner6 from "@/assets/partner/partner6.jpg";

export const Route = createFileRoute("/about")({
  head: () => pageMeta(about.metaTitle, about.metaDescription),
  component: About,
});

// Logo files in src/assets/partner, in the same order as about.clients.logos.
const logoSrcs = [partner1, partner2, partner3, partner4, partner5, partner6];

function About() {
  return (
    <>
      {/* Who we are */}
      <section className="bg-card">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-20 md:pt-28 lg:grid-cols-12 lg:gap-16 lg:pb-24">
          <div className="reveal lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-primary">
              {about.eyebrow}
            </p>
            <h1 className="mt-6 text-5xl font-bold uppercase leading-[1.05] text-primary md:text-7xl">
              {about.heading}
            </h1>
            <span aria-hidden className="mt-8 block h-1.5 w-20 bg-brand" />
          </div>
          <p className="reveal text-lg leading-[1.9] text-foreground/80 md:text-xl md:leading-[1.9] lg:col-span-7 lg:pt-12">
            {about.text}
          </p>
        </div>
      </section>

      <section className="bg-brand text-brand-foreground">
        <dl className="mx-auto grid max-w-7xl divide-y divide-brand-foreground/20 px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {stats.map((s, i) => (
            <div key={s.label} className={`py-12 md:py-16 ${i ? "sm:pl-12" : "sm:pr-12"}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-5xl font-bold tracking-tight md:text-7xl">
                  {s.value}
                </span>
                <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.15em] text-brand-foreground/70">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Why Concerted Solutions */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Heading title={about.whyHeading} />
              <span aria-hidden className="mt-8 block h-1.5 w-20 bg-brand" />
            </div>
          </div>
          <ol className="grid gap-x-12 sm:grid-cols-2 lg:col-span-8">
            {whyCS.map((w, i) => (
              <li
                key={w.t}
                className="group flex gap-5 border-t border-border py-8 first:border-t-0 sm:[&:nth-child(2)]:border-t-0"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center bg-brand text-sm font-bold text-brand-foreground transition-colors duration-300 group-hover:bg-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-snug text-primary">{w.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Our Clients */}
      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Heading eyebrow={about.clients.eyebrow} title={about.clients.heading} />
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground lg:col-span-5">
              {about.clients.text}
            </p>
          </div>
          <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
            {about.clients.logos.map((name, i) => (
              <li
                key={name}
                className="overflow-hidden border border-border bg-[#efefef] transition-transform duration-300 hover:-translate-y-1"
              >
                <img
                  src={logoSrcs[i]}
                  alt={name}
                  loading="lazy"
                  className="aspect-[2/1] w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
