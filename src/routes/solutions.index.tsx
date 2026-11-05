import { createFileRoute } from "@tanstack/react-router";
import { ClosingBand, PageHero, SolutionCard, Timeline } from "@/components/site";
import { lifecycle, pageMeta, solutions, solutionsPage } from "@/lib/content";

export const Route = createFileRoute("/solutions/")({
  head: () => pageMeta(solutionsPage.metaTitle, solutionsPage.metaDescription),
  component: Solutions,
});

function Solutions() {
  return (
    <>
      <PageHero
        eyebrow={solutionsPage.eyebrow}
        title={solutionsPage.heading}
        text={solutionsPage.text}
      />

      {/* Solution cards */}
      <section className="bg-night">
        <div className="shell section">
          <ul className="tile-grid">
            {solutions.map((s) => (
              <li key={s.slug}>
                <SolutionCard slug={s.slug} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lifecycle band */}
      <section className="border-y border-line bg-panel">
        <div className="shell section-compact">
          <Timeline wideAt="md" items={lifecycle.map((name) => ({ name }))} />
        </div>
      </section>

      <ClosingBand button={solutionsPage.button} />
    </>
  );
}
