import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Equal, Layers, Plus } from "lucide-react";
import { CTA, ClosingBand, Heading, SolutionCard, solutionIcons } from "@/components/site";
import { getSolution, pageMeta, solutions, solutionsPage } from "@/lib/content";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const s = getSolution(params.slug);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData }) =>
    loaderData ? pageMeta(loaderData.metaTitle, loaderData.metaDescription) : {},
  component: SolutionPage,
});

const pad = (n: number) => String(n).padStart(2, "0");

function SolutionPage() {
  const s = Route.useLoaderData();
  const idx = solutions.findIndex((x) => x.slug === s.slug);
  const Icon = solutionIcons[s.slug] ?? Layers;
  const button = s.button ?? solutionsPage.button;

  return (
    <>
      {/* Hero (light) */}
      <section className="bg-card">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-16 lg:pb-24">
          <div className="reveal lg:col-span-7">
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.1em]">
              <Link
                to="/solutions"
                className="group inline-flex items-center gap-2 text-primary transition-colors hover:text-brand-text"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                {solutionsPage.eyebrow}
              </Link>
              <span className="h-px w-8 bg-border" />
              <span className="font-mono tracking-[0.2em] text-muted-foreground">
                {pad(idx + 1)} / {pad(solutions.length)}
              </span>
            </div>
            <span className="mt-10 grid h-16 w-16 place-items-center bg-brand text-brand-foreground">
              <Icon className="h-7 w-7" strokeWidth={1.5} />
            </span>
            <h1 className="mt-8 text-4xl font-bold uppercase leading-[1.05] text-primary md:text-6xl">
              {s.h1}
            </h1>
            <span aria-hidden className="mt-8 block h-1.5 w-20 bg-brand" />
          </div>
          <div className="reveal flex flex-col justify-end gap-10 lg:col-span-5">
            <p className="border-l-4 border-brand pl-6 text-lg leading-[1.9] text-foreground/80 md:text-xl md:leading-[1.9]">
              {s.intro}
            </p>
            <div>
              <CTA to="/contact" variant="dark">
                {button}
              </CTA>
            </div>
          </div>
        </div>
      </section>

      {/* Digital twin equation (brand band) */}
      {s.graphic && (
        <section className="bg-brand text-brand-foreground">
          <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-12 lg:flex-nowrap lg:justify-between">
            {s.graphic.map((g, i) => (
              <li key={g} className="flex items-center gap-3">
                <span className="border border-brand-foreground/25 px-5 py-3 text-sm font-bold uppercase tracking-wide">
                  {g}
                </span>
                {i < s.graphic!.length - 1 ? (
                  <Plus aria-hidden className="h-4 w-4 text-brand-foreground/60" />
                ) : (
                  <Equal aria-hidden className="h-5 w-5 text-brand-foreground/60" />
                )}
              </li>
            ))}
            <li className="bg-brand-foreground px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-brand">
              {s.graphicResult}
            </li>
          </ol>
        </section>
      )}

      {/* Capabilities (numbered rows) */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <span className="grid h-14 w-14 place-items-center border border-brand/20 bg-card text-brand-text">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <p className="mt-6 text-2xl font-bold leading-snug text-primary">{s.title}</p>
              <span aria-hidden className="mt-6 block h-1 w-12 bg-brand" />
            </div>
          </div>
          <ol className="border-t border-border lg:col-span-8">
            {s.cards.map((c, i) => (
              <li
                key={c.t}
                className="group relative grid grid-cols-[3.5rem_1fr] gap-x-6 gap-y-3 border-b border-border py-8 transition-colors duration-300 hover:bg-card md:grid-cols-[5rem_1fr_1fr] md:gap-x-10 md:py-10"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100"
                />
                <span className="row-span-2 pl-4 text-4xl font-extrabold leading-none text-transparent transition-colors duration-300 [-webkit-text-stroke:1.5px_var(--color-brand-text)] group-hover:text-brand-text md:row-span-1 md:text-5xl">
                  {pad(i + 1)}
                </span>
                <h2 className="text-lg font-bold leading-snug text-primary md:text-xl">{c.t}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground md:pr-6 md:text-base">
                  {c.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How it starts (light) */}
      {s.steps && (
        <section className="bg-card">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
            <Heading title={s.stepsLabel ?? ""} />
            <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-0">
              {s.steps.map((st, i) => {
                const last = i === s.steps!.length - 1;
                return (
                  <li key={st} className="group relative flex items-center gap-5 md:block">
                    {!last && (
                      <span
                        aria-hidden
                        className="absolute -bottom-8 left-8 top-16 w-px bg-border md:hidden"
                      />
                    )}
                    <div className="flex items-center">
                      <span className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-brand bg-card font-mono text-lg font-bold text-brand-text transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-foreground">
                        {pad(i + 1)}
                      </span>
                      {!last && (
                        <span aria-hidden className="hidden flex-1 items-center md:flex">
                          <span className="relative mx-4 h-px flex-1 bg-border">
                            <span className="absolute inset-y-0 left-0 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                          </span>
                          <ArrowRight className="mr-4 h-4 w-4 text-brand-text" />
                        </span>
                      )}
                    </div>
                    <p className="text-xl font-bold text-primary md:mt-8 md:pr-8">{st}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      {/* Related (light) */}
      <section className={`bg-card ${s.steps ? "border-t border-border" : ""}`}>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <Heading title={solutionsPage.related} />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {s.related.map((r) => (
              <li key={r}>
                <SolutionCard slug={r} as="h3" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingBand button={button} />
    </>
  );
}
