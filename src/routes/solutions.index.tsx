import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingBand, SolutionCard } from "@/components/site";
import { lifecycle, pageMeta, solutions, solutionsPage } from "@/lib/content";

export const Route = createFileRoute("/solutions/")({
  head: () => pageMeta(solutionsPage.metaTitle, solutionsPage.metaDescription),
  component: Solutions,
});

// Deepening brand tones along the lifecycle.
const tone = ["bg-brand/60", "bg-brand/70", "bg-brand/80", "bg-brand/85", "bg-brand/90", "bg-brand"];

const pad = (n: number) => String(n).padStart(2, "0");

function Solutions() {
  return (
    <>
      {/* Heading */}
      <section className="bg-card">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-20 md:pt-28 lg:grid-cols-12 lg:gap-16 lg:pb-24">
          <div className="reveal lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-primary">
              {solutionsPage.eyebrow}
            </p>
            <h1 className="mt-6 text-4xl font-bold uppercase leading-[1.05] text-primary md:text-6xl">
              {solutionsPage.heading}
            </h1>
            <span aria-hidden className="mt-8 block h-1.5 w-20 bg-brand" />
          </div>
          <p className="reveal self-end text-lg leading-[1.9] text-foreground/80 md:text-xl md:leading-[1.9] lg:col-span-5">
            {solutionsPage.text}
          </p>
        </div>
      </section>

      {/* Solution cards */}
      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <li key={s.slug}>
                <SolutionCard slug={s.slug} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lifecycle band */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:gap-0">
            {lifecycle.map((l, i) => {
              const first = i === 0;
              const last = i === lifecycle.length - 1;
              return (
                <li
                  key={l}
                  className={`group relative flex-1 px-6 py-8 text-brand-foreground transition-[filter] duration-300 hover:brightness-125 ${tone[i]} lg:py-10 ${first ? "" : "lg:-ml-4 lg:pl-10"} ${
                    first
                      ? "lg:[clip-path:polygon(0_0,calc(100%-24px)_0,100%_50%,calc(100%-24px)_100%,0_100%)]"
                      : last
                        ? "lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%,24px_50%)]"
                        : "lg:[clip-path:polygon(0_0,calc(100%-24px)_0,100%_50%,calc(100%-24px)_100%,0_100%,24px_50%)]"
                  }`}
                >
                  <span className="font-mono text-xs font-bold tracking-[0.2em] text-brand-foreground/70">
                    {pad(i + 1)}
                  </span>
                  <p className="mt-3 text-lg font-bold tracking-wide md:text-xl">{l}</p>
                  <span
                    aria-hidden
                    className="mt-5 block h-0.5 w-8 bg-brand-foreground/40 transition-all duration-300 group-hover:w-14 group-hover:bg-brand-foreground"
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <ClosingBand button={solutionsPage.button} />
    </>
  );
}
