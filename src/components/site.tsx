import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Building2,
  Calculator,
  ChartColumn,
  ChevronDown,
  Compass,
  Cpu,
  Factory,
  Layers,
  Map,
  Menu,
  Network,
  ScanLine,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { contact, getSolution, home, solutions } from "@/lib/content";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/solutions", label: "Solutions" },
  { to: "/sectors", label: "Sectors" },
  { to: "/our-work", label: "Our Work" },
  { to: "/approach", label: "Approach" },
  { to: "/partners-platforms", label: "Partners & Platforms" },
  { to: "/about", label: "About" },
] as const;

export const pad = (n: number) => String(n).padStart(2, "0");

// The logo artwork is navy and grey, so on Night Navy it is shown in white.
export function Logo() {
  return (
    <Link to="/" aria-label="Concerted Solutions home" className="flex shrink-0 items-center">
      <img
        src={logo}
        alt="Concerted Solutions"
        width={660}
        height={144}
        className="h-8 w-auto brightness-0 invert md:h-9"
      />
    </Link>
  );
}

/* ---------- Diamond motif ---------- */

export function Diamond({
  filled,
  className = "h-3 w-3 text-brand",
}: {
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`shrink-0 ${className}`}>
      <path
        d="M12 1.5 22.5 12 12 22.5 1.5 12Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2.5}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

// Interlocking outlines for hero and band backgrounds; hidden on small screens.
export function DiamondCluster({
  className = "",
  front = "text-brand",
  back = "text-white",
}: {
  className?: string;
  front?: string;
  back?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 200"
      fill="none"
      className={`pointer-events-none ${className}`}
    >
      <path
        d="M90 18 172 100 90 182 8 100Z"
        stroke="currentColor"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        className={back}
      />
      <path
        d="M150 46 204 100 150 154 96 100Z"
        stroke="currentColor"
        strokeWidth={3}
        vectorEffect="non-scaling-stroke"
        className={front}
      />
      <path
        d="M222 22 232 32 222 42 212 32Z"
        stroke="currentColor"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        className={front}
      />
    </svg>
  );
}

// Short orange rule ending in a diamond, used under headings.
export function DiamondAccent({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`flex items-center gap-2 ${className}`}>
      <span className="h-0.5 w-14 bg-brand" />
      <Diamond className="h-3 w-3 text-brand" />
    </span>
  );
}

// Full-width technical divider with a centred diamond.
export function DiamondRule({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`shell flex items-center gap-4 ${className}`}>
      <span className="h-px flex-1 bg-line" />
      <Diamond className="h-3.5 w-3.5 text-brand" />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

/* ---------- Header ---------- */

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="absolute inset-x-0 top-full border-y border-line bg-panel shadow-2xl shadow-black/40">
      <div className="shell py-10">
        <ul className="grid grid-cols-3 gap-px border border-line bg-line xl:grid-cols-4">
          {solutions.map((s, i) => {
            const Icon = solutionIcons[s.slug] ?? Layers;
            return (
              <li key={s.slug} className="bg-panel">
                <Link
                  to="/solutions/$slug"
                  params={{ slug: s.slug }}
                  onClick={onNavigate}
                  className="group relative flex h-full gap-4 p-5 transition-colors hover:bg-night data-[status=active]:bg-night"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100 group-data-[status=active]:scale-y-100"
                  />
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.5} />
                  <span>
                    <span className="label block text-slate-grey">{pad(i + 1)}</span>
                    <span className="mt-1 block font-display text-[15px] font-bold leading-snug text-white">
                      {s.title}
                    </span>
                    <span className="type-small mt-1.5 line-clamp-2 text-steel">{s.card}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex justify-end">
          <Link
            to="/solutions"
            onClick={onNavigate}
            className="group inline-flex items-center gap-2 font-display text-sm font-bold text-white hover:text-brand"
          >
            {home.solutions.button}
            <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

const navLink =
  "group relative flex h-full items-center whitespace-nowrap px-3.5 font-display text-[15px] font-semibold text-mist transition-colors hover:text-white data-[status=active]:text-white xl:px-4";
const navBar =
  "absolute inset-x-3.5 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100 group-data-[status=active]:scale-x-100 xl:inset-x-4";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Close both menus on every navigation.
  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-night text-mist">
      <div className="shell flex h-[76px] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden h-full items-stretch lg:flex">
          {nav.map((n) =>
            n.to === "/solutions" ? (
              <div
                key={n.to}
                className="relative flex"
                onMouseEnter={() => setMega(true)}
                onMouseLeave={() => setMega(false)}
                onKeyDown={(e) => e.key === "Escape" && setMega(false)}
              >
                <Link to={n.to} className={`${navLink} pr-1.5 xl:pr-1.5`}>
                  {n.label}
                  <span aria-hidden className={navBar} />
                </Link>
                <button
                  type="button"
                  aria-label="Show all solutions"
                  aria-expanded={mega}
                  aria-controls="mega-menu"
                  onClick={() => setMega((m) => !m)}
                  className="flex items-center pr-3 text-mist hover:text-brand"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${mega ? "rotate-180 text-brand" : ""}`}
                  />
                </button>
              </div>
            ) : (
              <Link key={n.to} to={n.to} className={navLink}>
                {n.label}
                <span aria-hidden className={navBar} />
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn btn-secondary btn-sm hidden sm:inline-flex">
            Talk to Our Team
          </Link>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center border border-line text-white lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mega && (
        <div
          id="mega-menu"
          className="hidden lg:block"
          onMouseEnter={() => setMega(true)}
          onMouseLeave={() => setMega(false)}
          onKeyDown={(e) => e.key === "Escape" && setMega(false)}
        >
          <MegaMenu onNavigate={() => setMega(false)} />
        </div>
      )}

      {open && (
        <nav
          aria-label="Mobile"
          className="max-h-[calc(100svh-76px)] overflow-y-auto border-t border-line bg-night lg:hidden"
        >
          <ul className="shell py-4">
            {[...nav, { to: "/contact", label: "Contact" } as const].map((n) => (
              <li key={n.to} className="border-b border-line last:border-b-0">
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between py-4 font-display text-lg font-semibold text-mist data-[status=active]:text-white"
                >
                  {n.label}
                  <Diamond className="h-3 w-3 text-line transition-colors group-hover:text-brand group-data-[status=active]:text-brand" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

/* ---------- Footer ---------- */

const footLink = "text-steel transition-colors hover:text-brand";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-night">
      <DiamondCluster
        className="absolute -right-24 -top-10 hidden h-[22rem] w-[26rem] opacity-25 lg:block"
        front="text-brand"
        back="text-line"
      />
      <div className="shell relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo />
          <p className="eyebrow mt-6 flex items-center gap-2.5">
            <Diamond className="h-2.5 w-2.5 text-brand" />
            Align – Orchestrate – Achieve
          </p>
        </div>
        <div className="lg:col-span-3">
          <p className="label mb-5 text-white">Solutions</p>
          <ul className="type-small space-y-2.5">
            {solutions.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to="/solutions/$slug" params={{ slug: s.slug }} className={footLink}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className="label mb-5 text-white">Company</p>
          <ul className="type-small space-y-2.5">
            {[...nav, { to: "/contact", label: "Contact" } as const].map((n) => (
              <li key={n.to}>
                <Link to={n.to} className={footLink}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="label mb-5 text-white">Dubai – Headquarters</p>
          <address className="type-small space-y-2.5 not-italic text-slate-grey">
            <p>{contact.address}</p>
            <p>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={footLink}>
                T: {contact.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className={footLink}>
                E: {contact.email}
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="relative border-t border-line">
        <div className="shell flex items-center justify-between gap-4 py-6">
          <p className="type-small text-slate-grey">© Concerted Solutions · {contact.web}</p>
          <span aria-hidden className="flex gap-1.5">
            <Diamond className="h-2.5 w-2.5 text-line" />
            <Diamond className="h-2.5 w-2.5 text-line" />
            <Diamond className="h-2.5 w-2.5 text-brand" />
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Buttons ---------- */

export function CTA({
  to,
  children,
  variant = "primary",
  className = "",
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "night";
  className?: string;
}) {
  const v = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    tertiary: "btn-tertiary",
    night: "btn-night",
  }[variant];
  return (
    <Link to={to} className={`group btn ${v} ${className}`}>
      {children}
      <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/* ---------- Page structure ---------- */

// Shared inner-page hero: eyebrow, H1, intro and optional actions or side content.
export function PageHero({
  eyebrow,
  title,
  sub,
  text,
  children,
  aside,
}: {
  eyebrow?: ReactNode;
  title: string;
  sub?: string;
  text?: string;
  children?: ReactNode;
  /** Visual for the right-hand column on large screens; replaces the diamond cluster. */
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-night">
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(to_left,black,transparent_60%)] opacity-35"
      />
      {!aside && (
        <DiamondCluster className="absolute -right-10 top-1/2 hidden h-80 w-96 -translate-y-1/2 lg:block xl:right-[max(2rem,calc(50vw-660px))]" />
      )}
      <div
        className={`shell relative pb-18 pt-16 md:pb-24 md:pt-24 ${aside ? "lg:grid lg:grid-cols-12 lg:items-center lg:gap-10" : ""}`}
      >
        <div className={aside ? "max-w-4xl lg:col-span-7" : "max-w-4xl"}>
          {eyebrow && <div className="reveal eyebrow">{eyebrow}</div>}
          <h1 className="reveal type-h1 mt-6">{title}</h1>
          {sub && <p className="reveal type-h4 mt-6 text-mist">{sub}</p>}
          <DiamondAccent className="reveal mt-8" />
          {text && <p className="reveal type-body-lg mt-8 max-w-2xl">{text}</p>}
          {children && <div className="reveal mt-10">{children}</div>}
        </div>
        {aside && <div className="hidden lg:col-span-5 lg:block">{aside}</div>}
      </div>
    </section>
  );
}

export function Heading({
  eyebrow,
  title,
  center,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  center?: boolean;
  as?: "h2" | "h3";
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`eyebrow mb-4 flex items-center gap-2.5 ${center ? "justify-center" : ""}`}>
          <Diamond className="h-2.5 w-2.5 text-brand" />
          {eyebrow}
        </p>
      )}
      <Tag className="type-h2">{title}</Tag>
    </div>
  );
}

/* ---------- Timeline ---------- */

// Horizontal on wide screens, vertical below. Intermediate markers are white
// diamonds; the final marker is CS Orange.
export function Timeline({
  items,
  wideAt = "lg",
  className = "",
}: {
  items: { name: string; text?: string }[];
  wideAt?: "md" | "lg";
  className?: string;
}) {
  const wide = {
    md: {
      ol: "md:grid md:gap-0",
      li: "md:block md:pb-0",
      v: "md:hidden",
      h: "md:block",
      txt: "md:mt-6 md:pr-6",
    },
    lg: {
      ol: "lg:grid lg:gap-0",
      li: "lg:block lg:pb-0",
      v: "lg:hidden",
      h: "lg:block",
      txt: "lg:mt-6 lg:pr-6",
    },
  }[wideAt];
  return (
    <ol
      className={`flex flex-col ${wide.ol} ${className}`}
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <li key={it.name} className={`relative flex gap-5 pb-10 last:pb-0 ${wide.li}`}>
            {!last && (
              <>
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-[11px] top-7 w-px bg-line ${wide.v}`}
                />
                <span
                  aria-hidden
                  className={`absolute left-9 right-3 top-[11px] hidden h-px bg-line ${wide.h}`}
                />
              </>
            )}
            <Diamond
              filled={last}
              className={`relative h-[23px] w-[23px] ${last ? "text-brand" : "text-white"}`}
            />
            <div className={wide.txt}>
              <span className={`label block ${last ? "text-brand" : "text-slate-grey"}`}>
                {pad(i + 1)}
              </span>
              <p
                className={`mt-1.5 ${it.text ? "type-h4 text-white" : "font-display text-[15px] font-bold uppercase leading-snug tracking-wide text-white"}`}
              >
                {it.name}
              </p>
              {it.text && <p className="type-small mt-2 max-w-[17rem] text-steel">{it.text}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- Solutions ---------- */

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

// Panel tile; place inside a .tile-grid so neighbouring tiles share 1px borders.
export function SolutionCard({ slug, as: Title = "h2" }: { slug: string; as?: "h2" | "h3" }) {
  const s = getSolution(slug)!;
  const Icon = solutionIcons[slug] ?? Layers;
  const index = solutions.findIndex((x) => x.slug === slug);
  return (
    <Link
      to="/solutions/$slug"
      params={{ slug }}
      className="group relative flex h-full flex-col bg-panel p-7 transition-colors duration-300 hover:bg-night md:p-8"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
      />
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center border border-line text-brand transition-colors duration-300 group-hover:border-brand">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <span className="label text-slate-grey">{pad(index + 1)}</span>
      </div>
      <Title className="type-h4 mt-8">{s.title}</Title>
      <p className="type-small mt-3 flex-1 text-steel">{s.card}</p>
      <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
        <Diamond className="h-2.5 w-2.5 text-line transition-colors group-hover:text-brand" />
        <ArrowRight className="h-5 w-5 text-brand transition-transform duration-300 group-hover:translate-x-1.5" />
      </div>
    </Link>
  );
}

// Home page tile: icon, title and an oversized line drawing of the same icon
// that redraws itself on hover. Place inside a .tile-grid.
export function SolutionTile({ slug }: { slug: string }) {
  const s = getSolution(slug)!;
  const Icon = solutionIcons[slug] ?? Layers;
  return (
    <Link
      to="/solutions/$slug"
      params={{ slug }}
      className="group relative isolate flex h-full min-h-72 flex-col overflow-hidden bg-panel p-7 transition-colors duration-500 hover:bg-[#0b3157] md:p-8"
    >
      {/* Fine blueprint grid, revealed on hover */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(circle_at_85%_85%,black,transparent_70%)] group-hover:opacity-60"
      />
      {/* Oversized vector: faint at rest, redraws in CS Orange on hover */}
      <Icon
        aria-hidden
        strokeWidth={0.6}
        className="draw-on-hover absolute -bottom-10 -right-10 -z-10 h-52 w-52 text-white/[0.06] transition-all duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:rotate-[-6deg] group-hover:text-brand/30"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
      />
      <div className="flex items-start justify-between">
        <span className="grid h-14 w-14 place-items-center border border-line text-white transition-colors duration-300 group-hover:border-brand group-hover:text-brand">
          <Icon className="draw-on-hover h-7 w-7" strokeWidth={1.4} />
        </span>
        <ArrowUpRight className="h-5 w-5 text-slate-grey transition-all duration-300 group-hover:rotate-45 group-hover:text-brand" />
      </div>
      <h3 className="type-h4 mt-auto pt-10 pr-6">{s.title}</h3>
    </Link>
  );
}

/* ---------- Closing band ---------- */

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
    <section className="shell section">
      <div className="relative overflow-hidden bg-brand px-7 py-14 md:px-14 md:py-18">
        <DiamondCluster
          className="absolute -right-10 top-1/2 hidden h-52 w-60 -translate-y-1/2 opacity-50 md:block"
          front="text-night"
          back="text-white"
        />
        <div className="relative flex flex-col items-start gap-10 md:pr-48 lg:flex-row lg:items-end lg:justify-between lg:pr-44">
          <div>
            <h2 className="type-h2 max-w-3xl text-night">{title}</h2>
            {line && <p className="label mt-5 text-sm tracking-[0.22em] text-night/80">{line}</p>}
          </div>
          <CTA to="/contact" variant="night" className="w-full shrink-0 sm:w-auto">
            {button}
          </CTA>
        </div>
      </div>
    </section>
  );
}
