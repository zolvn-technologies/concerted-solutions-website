import { createFileRoute } from "@tanstack/react-router";
import type { FormEvent, ReactNode } from "react";
import { ArrowRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import { contact, contactPage, pageMeta, solutions } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  head: () => pageMeta(contactPage.metaTitle, contactPage.metaDescription),
  component: Contact,
});

const f = contactPage.fields;
const field =
  "w-full border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 hover:border-brand/40 focus:border-brand focus:ring-2 focus:ring-brand/15";

function Field({
  label,
  required,
  wide,
  children,
}: {
  label: string;
  required?: boolean;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <label className={`grid gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-bold uppercase tracking-[0.1em] text-primary">
        {label}
        {required && <span className="ml-1 text-brand-text">*</span>}
      </span>
      {children}
    </label>
  );
}

function Contact() {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = Array.from(d.entries())
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    window.location.href = `mailto:${contact.email}?body=${encodeURIComponent(body)}`;
  };

  const details = [
    { icon: MapPin, text: contact.address },
    { icon: Phone, text: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { icon: Mail, text: contact.email, href: `mailto:${contact.email}` },
    { icon: Globe, text: contact.web, href: `https://${contact.web}` },
  ];

  return (
    <>
      {/* Heading */}
      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 md:pt-28 lg:pb-20">
          <p className="reveal inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-text">
            <span className="h-px w-8 bg-brand-text" />
            {contactPage.subline}
          </p>
          <h1 className="reveal mt-6 max-w-5xl text-4xl font-bold uppercase leading-[1.05] text-primary md:text-6xl">
            {contactPage.heading}
          </h1>
          <span aria-hidden className="mt-8 block h-1.5 w-20 bg-brand" />
        </div>
      </section>

      {/* Office + form */}
      <section className="border-t border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-12 lg:py-24">
          <aside className="relative overflow-hidden bg-brand p-8 text-brand-foreground md:p-10 lg:col-span-4">
            <div
              aria-hidden
              className="absolute inset-0 opacity-15 [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_top,black,transparent)]"
            />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-foreground/70">
                {contactPage.office}
              </p>
              <ul className="mt-8 space-y-6">
                {details.map(({ icon: Icon, text, href }) => (
                  <li key={text} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center border border-brand-foreground/25">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="self-center text-sm leading-relaxed underline-offset-4 hover:underline"
                        {...(href.startsWith("https")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      >
                        {text}
                      </a>
                    ) : (
                      <p className="self-center text-sm leading-relaxed">{text}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <form
            onSubmit={submit}
            className="grid content-start gap-6 border border-border bg-card p-8 sm:grid-cols-2 md:p-10 lg:col-span-8"
          >
            <Field label={f.name} required>
              <input required name={f.name} autoComplete="name" className={field} />
            </Field>
            <Field label={f.company}>
              <input name={f.company} autoComplete="organization" className={field} />
            </Field>
            <Field label={f.email} required>
              <input required type="email" name={f.email} autoComplete="email" className={field} />
            </Field>
            <Field label={f.phone}>
              <input type="tel" name={f.phone} autoComplete="tel" className={field} />
            </Field>
            <Field label={f.country}>
              <input name={f.country} autoComplete="country-name" className={field} />
            </Field>
            <Field label={f.interest}>
              <select name={f.interest} defaultValue="" className={field}>
                <option value="" disabled />
                {solutions.map((s) => (
                  <option key={s.slug}>{s.title}</option>
                ))}
              </select>
            </Field>
            <Field label={f.message} required wide>
              <textarea required name={f.message} rows={6} className={field} />
            </Field>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="group inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 dark:bg-brand dark:text-brand-foreground dark:hover:bg-brand/85"
              >
                {contactPage.button}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
