import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  Boxes,
  Building2,
  Calculator,
  ChartColumn,
  Compass,
  Cpu,
  Factory,
  Layers,
  Map,
  Menu,
  Moon,
  Network,
  ScanLine,
  Sun,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { contact, getSolution, home, solutions } from "@/lib/content";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/about", label: "About" },
  { to: "/how-we-deliver", label: "How We Deliver" },
  { to: "/solutions", label: "Solutions" },
  { to: "/industries", label: "Industries" },
  { to: "/projects", label: "Projects" },
  { to: "/technology-ecosystem", label: "Technology" },
] as const;

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" aria-label="Concerted Solutions home" className="flex items-center">
      <img
        src={logo}
        alt="Concerted Solutions"
        width={660}
        height={144}
        className={`h-9 w-auto md:h-10 ${light ? "brightness-0 invert" : "dark:brightness-0 dark:invert"}`}
      />
    </Link>
  );
}

function ThemeToggle() {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="grid h-10 w-10 place-items-center border border-border text-muted-foreground transition-colors duration-300 hover:border-brand-text hover:text-brand-text"
    >
      <Moon className="h-4 w-4 dark:hidden" />
      <Sun className="hidden h-4 w-4 dark:block" />
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 text-foreground backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-3">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="group relative px-4 py-2 text-sm font-medium outline-none focus-visible:text-brand-text text-muted-foreground transition-colors duration-300 hover:text-brand-text data-[status=active]:text-brand-text"
            >
              {n.label}
              <span
                aria-hidden
                className="absolute inset-x-4 bottom-0 h-0.5 origin-left scale-x-0 bg-brand-text transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 group-data-[status=active]:scale-x-100"
              />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/contact"
            className="group relative hidden items-center gap-2 overflow-hidden bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:text-brand-foreground dark:bg-brand dark:text-brand-foreground dark:hover:text-primary-foreground sm:inline-flex"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-brand transition-transform duration-300 ease-out group-hover:translate-x-0 dark:bg-primary"
            />
            <span className="relative">Talk to Our Team</span>
            <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <button aria-label="Menu" className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border px-6 py-4 lg:hidden">
          {[...nav, { to: "/contact", label: "Contact" } as const].map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block border-l-2 border-transparent py-2.5 pl-3 text-muted-foreground transition-all duration-300 hover:border-brand-text hover:pl-4 hover:text-brand-text data-[status=active]:border-brand-text data-[status=active]:text-brand-text"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo light />
          <p className="mt-5 eyebrow text-accent">Align – Orchestrate – Achieve</p>
        </div>
        <div>
          <p className="eyebrow mb-4 text-ink-muted">Solutions</p>
          <ul className="space-y-2 text-sm">
            {solutions.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  to="/solutions/$slug"
                  params={{ slug: s.slug }}
                  className="text-ink-muted hover:text-accent"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 text-ink-muted">Company</p>
          <ul className="space-y-2 text-sm">
            {[...nav, { to: "/contact", label: "Contact" } as const].map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-ink-muted hover:text-accent">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 text-ink-muted">Dubai – Headquarters</p>
          <address className="space-y-2 text-sm not-italic text-ink-muted">
            <p>{contact.address}</p>
            <p>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                T: {contact.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className="hover:text-accent">
                E: {contact.email}
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-ink-border">
        <p className="mx-auto max-w-7xl px-6 py-6 font-mono text-xs text-ink-muted">
          © Concerted Solutions · {contact.web}
        </p>
      </div>
    </footer>
  );
}

export function CTA({
  to,
  children,
  variant = "accent",
  className = "",
}: {
  to: string;
  children: ReactNode;
  variant?: "accent" | "ghost" | "dark";
  className?: string;
}) {
  const v = {
    accent: "bg-accent text-accent-foreground hover:brightness-110",
    ghost: "border border-current/30 hover:bg-current/10",
    dark: "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-brand dark:text-brand-foreground dark:hover:bg-brand/85",
  }[variant];
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all ${v} ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        {eyebrow && <p className="eyebrow reveal text-accent">{eyebrow}</p>}
        <h1 className="reveal mt-5 max-w-4xl text-4xl font-black uppercase leading-[1.05] md:text-6xl">
          {title}
        </h1>
        {sub && <p className="reveal mt-6 max-w-2xl text-lg text-ink-muted">{sub}</p>}
        {children}
      </div>
    </section>
  );
}

export const solutionIcons: Record<string, LucideIcon> = {
  "strategic-advisory": Compass,
  "digital-engineering-bim": Layers,
  "reality-capture": ScanLine,
  "geospatial-intelligence": Map,
  "project-cost-information-management": Calculator,
  "systems-data-integration": Network,
  "digital-twins": Boxes,
  "asset-management": Wrench,
  "smart-cities": Building2,
  "smart-factories": Factory,
  "analytics-ai-automation": ChartColumn,
  "high-performance-computing": Cpu,
};

export function SolutionCard({ slug, as: Title = "h2" }: { slug: string; as?: "h2" | "h3" }) {
  const s = getSolution(slug)!;
  const Icon = solutionIcons[slug] ?? Layers;
  const index = solutions.findIndex((x) => x.slug === slug);
  return (
    <Link
      to="/solutions/$slug"
      params={{ slug }}
      className="group relative flex h-full flex-col border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-brand/0 transition-colors duration-300 group-hover:bg-brand"
      />
      <div className="flex items-start justify-between">
        <span className="grid h-14 w-14 place-items-center border border-brand/20 bg-secondary text-brand-text transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground">
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <span className="text-xs font-bold tracking-[0.15em] text-muted-foreground/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <Title className="mt-8 text-lg font-bold leading-snug text-primary">{s.title}</Title>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.card}</p>
      <div className="mt-8 flex items-center justify-end border-t border-border pt-5">
        <ArrowRight className="h-5 w-5 text-brand-text transition-transform duration-300 group-hover:translate-x-1.5" />
      </div>
    </Link>
  );
}

export function ClosingBand({
  title = home.closing.heading,
  line = home.closing.line,
  button = home.closing.button,
}: {
  title?: string;
  line?: string | null;
  button?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden bg-brand px-8 py-16 text-brand-foreground md:px-16 md:py-20">
        <div className="relative flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-3xl text-3xl font-extrabold uppercase leading-tight md:text-5xl">
              {title}
            </h2>
            {line && (
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.25em] text-brand-foreground/70">
                {line}
              </p>
            )}
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 bg-white px-6 py-3.5 text-sm font-semibold text-brand shadow-lg shadow-black/10 transition-all hover:bg-white/90"
          >
            {button}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Heading({
  eyebrow,
  title,
  center,
}: {
  eyebrow?: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-text">
          <span className="h-px w-8 bg-brand-text" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-extrabold uppercase leading-tight text-primary md:text-[2.75rem]">
        {title}
      </h2>
    </div>
  );
}
