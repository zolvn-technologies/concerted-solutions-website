import { createFileRoute } from "@tanstack/react-router";
import heroBg from "@/assets/hero3.png";
import { ProjectCard } from "@/components/ProjectCard";
import {
  CTA,
  ClosingBand,
  Diamond,
  DiamondAccent,
  DiamondCluster,
  Heading,
  SolutionTile,
  Timeline,
} from "@/components/site";
import { home, lifecycle, pageMeta, philosophy, projects, solutions, stats } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => pageMeta(home.metaTitle, home.metaDescription),
  component: Home,
});

const featured = home.projects.names.map((n) => projects.find((p) => p.name === n)!);

function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-night">
        {/* Full-bleed image: wipes in, then drifts slowly */}
        <div aria-hidden className="hero-wipe absolute inset-0 -z-10">
          <img
            src={heroBg}
            alt=""
            width={1672}
            height={940}
            className="hero-kenburns h-full w-full object-cover object-[70%_center] saturate-[0.8]"
          />
        </div>
        {/* Night Navy grade: tints the daylight photo and keeps text readable */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-night/55 mix-blend-multiply" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/85 to-night/40 lg:bg-gradient-to-r lg:from-night lg:via-night/85 lg:to-night/10"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(to_right,black,transparent_55%)] opacity-30"
        />
        <DiamondCluster className="absolute bottom-24 right-[max(1.5rem,calc(50vw-620px))] -z-10 hidden h-72 w-[22rem] xl:block" />

        <div className="shell flex min-h-[36rem] flex-col justify-center py-20 lg:min-h-[min(100svh_-_134px,52rem)] lg:py-28">
          <div className="max-w-[52rem]">
            <p className="reveal eyebrow flex items-center gap-3">
              <Diamond className="h-3 w-3 text-brand" />
              {home.hero.eyebrow}
            </p>
            <h1 className="reveal type-h1 mt-7" style={{ animationDelay: "0.1s" }}>
              {home.hero.title} <span className="text-brand">{home.hero.titleAccent}</span>
            </h1>
            <p
              className="reveal label mt-8 text-sm tracking-[0.25em] text-mist"
              style={{ animationDelay: "0.2s" }}
            >
              {home.hero.tagline}
            </p>
            <p className="reveal type-body-lg mt-5 max-w-xl" style={{ animationDelay: "0.3s" }}>
              {home.hero.text}
            </p>
            <div
              className="reveal mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: "0.4s" }}
            >
              <CTA to="/solutions">{home.hero.primary}</CTA>
              <CTA to="/contact" variant="secondary">
                {home.hero.secondary}
              </CTA>
            </div>
          </div>
        </div>

        {/* Lifecycle ticker */}
        <div className="overflow-hidden border-y border-line bg-panel">
          <div aria-hidden className="hero-marquee flex w-max">
            {[0, 1].map((k) => (
              <ul key={k} className="flex shrink-0">
                {[...lifecycle, ...lifecycle].map((l, i) => (
                  <li
                    key={i}
                    className="label flex items-center gap-8 py-5 pl-8 text-[13px] tracking-[0.25em] text-mist"
                  >
                    {l}
                    <Diamond className="h-2.5 w-2.5 text-brand" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <p className="sr-only">{lifecycle.join(", ")}</p>
        </div>
      </section>

      {/* 2. Introduction */}
      <section className="bg-night">
        <div className="shell section grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Heading eyebrow={home.intro.eyebrow} title={home.intro.heading} />
            <DiamondAccent className="mt-8" />
          </div>
          <div className="lg:col-span-7">
            <p className="type-body-lg border-l-[3px] border-brand pl-6 text-mist">
              {home.intro.text}
            </p>
            <dl className="tile-grid mt-12">
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
        </div>
      </section>

      {/* 3. Our Philosophy */}
      <section className="border-y border-line bg-panel">
        <div className="shell section">
          <Heading eyebrow={home.philosophy.eyebrow} title={home.philosophy.heading} />
          <Timeline
            className="mt-14 lg:mt-18"
            items={philosophy.map((p) => ({ name: p.name, text: p.text }))}
          />
        </div>
      </section>

      {/* 4. Solutions */}
      <section className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Heading eyebrow={home.solutions.eyebrow} title={home.solutions.heading} />
          <CTA to="/solutions" variant="tertiary">
            {home.solutions.button}
          </CTA>
        </div>
        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s) => (
            <li key={s.slug}>
              <SolutionTile slug={s.slug} />
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Selected Projects */}
      <section className="border-y border-line bg-panel">
        <div className="shell section">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Heading eyebrow={home.projects.eyebrow} title={home.projects.heading} />
            <CTA to="/our-work" variant="tertiary">
              {home.projects.button}
            </CTA>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.name} p={p} compact />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Closing */}
      <ClosingBand />
    </>
  );
}
