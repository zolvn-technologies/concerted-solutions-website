import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Equal, Layers, Plus } from "lucide-react";
import {
  CTA,
  ClosingBand,
  DiamondAccent,
  Heading,
  PageHero,
  SolutionCard,
  Timeline,
  pad,
  solutionIcons,
} from "@/components/site";
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

function SolutionPage() {
  const s = Route.useLoaderData();
  const idx = solutions.findIndex((x) => x.slug === s.slug);
  const Icon = solutionIcons[s.slug] ?? Layers;
  const button = s.button ?? solutionsPage.button;

  return (
    <>
      <PageHero
        eyebrow={
          <span className="flex items-center gap-4">
            <Link
              to="/solutions"
              className="group inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {solutionsPage.eyebrow}
            </Link>
            <span className="h-px w-8 bg-line" />
            <span className="text-slate-grey">
              {pad(idx + 1)} / {pad(solutions.length)}
            </span>
          </span>
        }
        title={s.h1}
        text={s.intro}
      >
        <CTA to="/contact" className="w-full sm:w-auto">
          {button}
        </CTA>
      </PageHero>

      {/* Digital twin equation */}
      {s.graphic && (
        <section className="border-b border-line bg-panel">
          <ol className="shell flex flex-wrap items-center gap-3 py-12 lg:flex-nowrap lg:justify-between">
            {s.graphic.map((g, i) => (
              <li key={g} className="flex items-center gap-3">
                <span className="label border border-line bg-night px-5 py-3.5 text-[13px] text-white">
                  {g}
                </span>
                {i < s.graphic!.length - 1 ? (
                  <Plus aria-hidden className="h-4 w-4 text-brand" />
                ) : (
                  <Equal aria-hidden className="h-5 w-5 text-brand" />
                )}
              </li>
            ))}
            <li className="label bg-brand px-6 py-3.5 text-[13px] text-night">{s.graphicResult}</li>
          </ol>
        </section>
      )}

      {/* Capabilities */}
      <section className="bg-night">
        <div className="shell section grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <span className="grid h-14 w-14 place-items-center border border-line text-brand">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <p className="type-h3 mt-6 text-white">{s.title}</p>
              <DiamondAccent className="mt-6" />
            </div>
          </div>
          <ol className="tile-grid content-start lg:col-span-8">
            {s.cards.map((c, i) => (
              <li key={c.t} className="group relative bg-panel p-7 md:p-8">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
                />
                <span className="block font-display text-4xl font-extrabold leading-none text-transparent transition-colors duration-300 [-webkit-text-stroke:1.5px_var(--orange)] group-hover:text-brand">
                  {pad(i + 1)}
                </span>
                <h2 className="type-h4 mt-6">{c.t}</h2>
                <p className="type-small mt-2.5 text-steel">{c.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How it starts */}
      {s.steps && (
        <section className="border-t border-line bg-panel">
          <div className="shell section">
            <Heading title={s.stepsLabel ?? ""} />
            <Timeline wideAt="md" className="mt-14" items={s.steps.map((name) => ({ name }))} />
          </div>
        </section>
      )}

      {/* Related */}
      <section className="border-t border-line bg-night">
        <div className="shell section">
          <Heading title={solutionsPage.related} />
          <ul className="tile-grid mt-12">
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
