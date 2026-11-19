import { createFileRoute } from "@tanstack/react-router";
import { ClosingBand, PageHero } from "@/components/site";
import { TechLogoGrid } from "@/components/tech-logo-grid";
import { pageMeta, technologyPage } from "@/lib/content";

export const Route = createFileRoute("/technology-ecosystem")({
  head: () => pageMeta(technologyPage.metaTitle, technologyPage.metaDescription),
  component: Tech,
});

function Tech() {
  return (
    <>
      <PageHero
        eyebrow={technologyPage.subline}
        title={technologyPage.heading}
        text={technologyPage.intro}
      />

      {/* Logo grid */}
      <section className="bg-night">
        <div className="shell section">
          <TechLogoGrid />
        </div>
      </section>

      <ClosingBand button={technologyPage.button} />
    </>
  );
}
