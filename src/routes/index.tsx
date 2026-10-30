import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import heroBg from "@/assets/hero3.png";
import { imgFor } from "@/components/ProjectCard";
import { ClosingBand, Heading } from "@/components/site";
import { home, lifecycle, pageMeta, philosophy, projects, solutions, stats } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => pageMeta(home.metaTitle, home.metaDescription),
  component: Home,
});

const featured = home.projects.names.map((n) => projects.find((p) => p.name === n)!);

function PillLink({
  to,
  variant = "brand",
  children,
}: {
  to: string;
  variant?: "brand" | "outline" | "white";
  children: ReactNode;
}) {
  const v = {
    brand: "bg-brand text-brand-foreground shadow-lg shadow-brand/25 hover:bg-brand/90",
    outline: "border border-brand/30 bg-card/70 text-brand-text backdrop-blur hover:bg-card",
    white: "bg-white text-brand shadow-lg shadow-black/10 hover:bg-white/90",
  }[variant];
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-all ${v}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-card">
        {/* Full-bleed image: wipes in, then drifts slowly */}
        <div aria-hidden className="hero-wipe absolute inset-0 -z-10">
          <img
            src={heroBg}
            alt=""
            width={1672}
            height={940}
            className="hero-kenburns h-full w-full object-cover object-[70%_center]"
          />
        </div>
        {/* Fade to the page colour so text stays readable in both themes */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-card via-card/80 to-card/30 lg:bg-gradient-to-r lg:from-card lg:via-card/85 lg:to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_right,black,transparent_55%)] opacity-40"
        />

        <div className="mx-auto flex min-h-[38rem] max-w-7xl flex-col justify-center px-6 py-24 lg:min-h-[calc(100svh-6rem)] lg:py-28">
          <div className="max-w-3xl">
            <p className="reveal inline-flex items-center gap-3 border border-brand/20 bg-card/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-brand-text backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse bg-brand" />
              {home.hero.eyebrow}
            </p>
            <h1
              className="reveal mt-8 text-4xl font-bold uppercase leading-[1.05] text-primary sm:text-5xl xl:text-7xl"
              style={{ animationDelay: "0.1s" }}
            >
              {home.hero.title} <span className="text-brand-text">{home.hero.titleAccent}</span>
            </h1>
            <p
              className="reveal mt-8 text-xs font-bold uppercase tracking-[0.25em] text-primary/70"
              style={{ animationDelay: "0.2s" }}
            >
              {home.hero.tagline}
            </p>
            <p
              className="reveal mt-5 max-w-xl text-lg leading-relaxed text-foreground/80"
              style={{ animationDelay: "0.3s" }}
            >
              {home.hero.text}
            </p>
            <div className="reveal mt-10 flex flex-wrap gap-3" style={{ animationDelay: "0.4s" }}>
              <PillLink to="/solutions">{home.hero.primary}</PillLink>
              <PillLink to="/contact" variant="outline">
                {home.hero.secondary}
              </PillLink>
            </div>
          </div>
        </div>

        {/* Lifecycle ticker */}
        <div className="overflow-hidden border-t border-brand/30 bg-brand text-brand-foreground">
          <div aria-hidden className="hero-marquee flex w-max">
            {[0, 1].map((k) => (
              <ul key={k} className="flex shrink-0">
                {[...lifecycle, ...lifecycle].map((l, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-8 py-4 pl-8 text-sm font-bold tracking-[0.25em]"
                  >
                    {l}
                    <span className="h-1.5 w-1.5 rotate-45 bg-brand-foreground/50" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <p className="sr-only">{lifecycle.join(", ")}</p>
        </div>
      </section>

      {/* 2. Introduction */}
      <section className="border-t border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:col-span-5">
            <Heading eyebrow={home.intro.eyebrow} title={home.intro.heading} />
          </div>
          <div className="lg:col-span-7">
            <p className="border-l-4 border-brand pl-6 text-lg leading-relaxed text-foreground/80 md:text-xl">
              {home.intro.text}
            </p>
            <dl className="mt-12 grid border-t-4 border-brand bg-card sm:grid-cols-2">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`border-x border-b border-border p-8 ${i ? "sm:border-l-0" : ""}`}
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                      {s.value}
                    </span>
                    <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 3. Our Philosophy */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <Heading eyebrow={home.philosophy.eyebrow} title={home.philosophy.heading} />
          <ol className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-0">
            {philosophy.map((p, i) => {
              const last = i === philosophy.length - 1;
              return (
                <li key={p.name} className="group relative flex gap-6 lg:block">
                  {/* Vertical connector on small screens */}
                  {!last && (
                    <span
                      aria-hidden
                      className="absolute -bottom-10 left-8 top-16 w-px bg-border lg:hidden"
                    />
                  )}
                  <div className="flex items-center">
                    <span className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-brand bg-card font-mono text-lg font-bold text-brand-text transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {!last && (
                      <span aria-hidden className="hidden flex-1 items-center lg:flex">
                        <span className="relative mx-4 h-px flex-1 bg-border">
                          <span className="absolute inset-y-0 left-0 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                        </span>
                        <ArrowRight className="mr-4 h-4 w-4 text-brand-text" />
                      </span>
                    )}
                  </div>
                  <div className="pt-3 lg:pr-8 lg:pt-8">
                    <h3 className="text-lg font-bold tracking-[0.18em] text-primary">{p.name}</h3>
                    <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
                      {p.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 4. Solutions */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading eyebrow={home.solutions.eyebrow} title={home.solutions.heading} />
          <PillLink to="/solutions">{home.solutions.button}</PillLink>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s, i) => (
            <Link
              key={s.slug}
              to="/solutions/$slug"
              params={{ slug: s.slug }}
              className="group flex min-h-40 flex-col justify-between border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:shadow-xl hover:shadow-brand/20"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-brand-text transition-colors group-hover:text-brand-foreground/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-brand-foreground" />
              </div>
              <h3 className="mt-8 text-lg font-bold leading-snug text-primary transition-colors group-hover:text-brand-foreground">
                {s.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Selected Projects */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading eyebrow={home.projects.eyebrow} title={home.projects.heading} />
            <PillLink to="/projects">{home.projects.button}</PillLink>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {featured.map((p) => (
              <article
                key={p.name}
                className="group flex flex-col overflow-hidden border border-border bg-card transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={imgFor(p)}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-xl font-bold leading-snug text-primary">{p.name}</h3>
                  <p className="mt-4 border-l-2 border-brand pl-4 text-sm leading-relaxed text-muted-foreground">
                    {p.outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Closing */}
      <ClosingBand />
    </>
  );
}
