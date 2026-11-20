import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CTA, Diamond, Heading, PageHero, Timeline, pad } from "@/components/site";
import { assetTimeline, deliver, deliverSteps, pageMeta } from "@/lib/content";

export const Route = createFileRoute("/approach")({
  head: () => pageMeta(deliver.metaTitle, deliver.metaDescription),
  component: HowWeDeliver,
});

function HowWeDeliver() {
  return (
    <>
      {/* Expert-led. AI-enabled. */}
      <PageHero eyebrow={deliver.eyebrow} title={deliver.heading} text={deliver.text} />

      {/* Define → Accelerate → Assure */}
      <section className="bg-night">
        <div className="shell section-compact">
          <ol className="tile-grid [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]">
            {deliverSteps.map((s, i) => {
              const last = i === deliverSteps.length - 1;
              return (
                <li key={s} className={`relative p-8 md:p-10 ${last ? "bg-brand" : "bg-panel"}`}>
                  <div className="flex items-center justify-between">
                    <span className={`label ${last ? "text-night" : "text-slate-grey"}`}>
                      {pad(i + 1)}
                    </span>
                    <Diamond
                      filled={last}
                      className={`h-5 w-5 ${last ? "text-night" : "text-white"}`}
                    />
                  </div>
                  <p
                    className={`type-h3 mt-10 uppercase tracking-wide ${last ? "text-night" : "text-white"}`}
                  >
                    {s}
                  </p>
                  {!last && (
                    <ArrowRight
                      aria-hidden
                      className="absolute bottom-8 right-8 hidden h-5 w-5 text-brand lg:block"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* From Physical Asset to Performance */}
      <section className="border-y border-line bg-panel">
        <div className="shell section">
          <Heading title={deliver.timelineHeading} />
          <Timeline className="mt-14 lg:mt-18" items={assetTimeline.map((name) => ({ name }))} />

          {/* Timeline summary + next step */}
          <div className="relative mt-16 border border-line bg-night">
            <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-brand" />
            <div className="flex flex-col gap-8 px-7 py-9 md:px-12 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="flex items-center gap-3">
                  <Diamond className="h-5 w-5 text-white" />
                  <span className="label text-sm text-white">{assetTimeline[0]}</span>
                </span>
                <span aria-hidden className="flex items-center text-brand">
                  <span className="h-px w-10 bg-line md:w-16" />
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span className="flex items-center gap-3">
                  <Diamond filled className="h-5 w-5 text-brand" />
                  <span className="label text-sm text-brand">
                    {assetTimeline[assetTimeline.length - 1]}
                  </span>
                </span>
              </div>
              <CTA to="/solutions" className="w-full shrink-0 sm:w-auto">
                {deliver.button}
              </CTA>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
