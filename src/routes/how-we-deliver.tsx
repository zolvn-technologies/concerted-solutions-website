import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CTA, Heading } from "@/components/site";
import { assetTimeline, deliver, deliverSteps, pageMeta } from "@/lib/content";

export const Route = createFileRoute("/how-we-deliver")({
  head: () => pageMeta(deliver.metaTitle, deliver.metaDescription),
  component: HowWeDeliver,
});

const pad = (n: number) => String(n).padStart(2, "0");

// Arrow-shaped segments that nest into each other on desktop.
const chevron = [
  "md:[clip-path:polygon(0_0,calc(100%-32px)_0,100%_50%,calc(100%-32px)_100%,0_100%)]",
  "md:-ml-6 md:pl-14 md:[clip-path:polygon(0_0,calc(100%-32px)_0,100%_50%,calc(100%-32px)_100%,0_100%,32px_50%)]",
  "md:-ml-6 md:pl-14 md:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%,32px_50%)]",
];
const tone = ["bg-brand/70", "bg-brand/85", "bg-brand"];

function HowWeDeliver() {
  return (
    <>
      {/* Expert-led. AI-enabled. */}
      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:pt-28">
          <p className="reveal text-xs font-bold uppercase tracking-[0.1em] text-primary">
            {deliver.eyebrow}
          </p>
          <h1 className="reveal mt-6 text-5xl font-bold uppercase leading-[1.05] text-primary md:text-7xl">
            {deliver.heading}
          </h1>
          <p className="reveal mt-10 max-w-2xl border-l-4 border-brand pl-6 text-lg leading-relaxed text-foreground/80 md:text-xl">
            {deliver.text}
          </p>

          <ol className="reveal mt-16 flex flex-col gap-2 md:flex-row md:gap-0">
            {deliverSteps.map((s, i) => (
              <li
                key={s}
                className={`group relative flex-1 py-10 pl-8 pr-8 text-brand-foreground transition-[filter] duration-300 hover:brightness-110 md:py-12 ${chevron[i]} ${tone[i]}`}
              >
                <span className="text-xs font-bold tracking-[0.2em] text-brand-foreground/60">
                  {pad(i + 1)}
                </span>
                <p className="mt-4 text-3xl font-bold uppercase tracking-wide md:text-4xl">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* From Physical Asset to Performance */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-28">
          <Heading title={deliver.timelineHeading} />

          <ol className="mt-16 grid gap-8 lg:grid-cols-8 lg:gap-0">
            {assetTimeline.map((t, i) => {
              const last = i === assetTimeline.length - 1;
              return (
                <li key={t} className="group relative flex items-center gap-5 lg:block">
                  {/* Vertical connector on small screens */}
                  {!last && (
                    <span
                      aria-hidden
                      className="absolute -bottom-8 left-7 top-14 w-px bg-border lg:hidden"
                    />
                  )}
                  <div className="flex items-center">
                    <span
                      className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-brand font-mono text-sm font-bold transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-foreground ${last ? "bg-brand text-brand-foreground" : "bg-secondary text-brand-text"}`}
                    >
                      {pad(i + 1)}
                    </span>
                    {!last && (
                      <span aria-hidden className="hidden flex-1 items-center lg:flex">
                        <span className="relative mx-2 h-px flex-1 bg-border">
                          <span className="absolute inset-y-0 left-0 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                        </span>
                        <ArrowRight className="mr-2 h-3.5 w-3.5 text-brand-text" />
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs font-bold uppercase leading-snug tracking-wide lg:mt-6 lg:pr-4 ${last ? "text-brand-text" : "text-primary"}`}
                  >
                    {t}
                  </p>
                </li>
              );
            })}
          </ol>

          {/* Timeline summary + next step */}
          <div className="relative mt-16 overflow-hidden border border-border bg-card">
            <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-brand" />
            <div className="flex flex-col gap-8 px-8 py-10 md:flex-row md:items-center md:justify-between md:px-12">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-brand font-mono text-xs font-bold text-brand-text">
                    {pad(1)}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-wide text-primary">
                    {assetTimeline[0]}
                  </span>
                </span>
                <span aria-hidden className="flex items-center text-brand-text">
                  <span className="h-px w-10 bg-brand/40 md:w-16" />
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand font-mono text-xs font-bold text-brand-foreground">
                    {pad(assetTimeline.length)}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-wide text-brand-text">
                    {assetTimeline[assetTimeline.length - 1]}
                  </span>
                </span>
              </div>
              <CTA to="/solutions" variant="dark" className="shrink-0">
                {deliver.button}
              </CTA>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
