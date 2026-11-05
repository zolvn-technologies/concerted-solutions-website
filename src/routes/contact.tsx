import { createFileRoute } from "@tanstack/react-router";
import type { FormEvent, ReactNode } from "react";
import { ArrowRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import { Diamond, DiamondCluster, PageHero } from "@/components/site";
import { contact, contactPage, pageMeta, solutions } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  head: () => pageMeta(contactPage.metaTitle, contactPage.metaDescription),
  component: Contact,
});

const f = contactPage.fields;
const field = "field";

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
      <span className="label text-mist">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
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
      <PageHero eyebrow={contactPage.subline} title={contactPage.heading} />

      {/* Office + form */}
      <section className="bg-night">
        <div className="shell section grid gap-6 lg:grid-cols-12">
          <aside className="relative overflow-hidden border border-line bg-panel p-7 md:p-10 lg:col-span-4">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-brand" />
            <DiamondCluster
              className="absolute -bottom-16 -right-16 h-52 w-60 opacity-20"
              front="text-brand"
              back="text-steel"
            />
            <div className="relative">
              <p className="eyebrow flex items-center gap-2.5">
                <Diamond className="h-2.5 w-2.5 text-brand" />
                {contactPage.office}
              </p>
              <ul className="mt-8 space-y-6">
                {details.map(({ icon: Icon, text, href }) => (
                  <li key={text} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center border border-line text-brand">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="self-center break-words text-[15px] leading-relaxed text-mist underline-offset-4 transition-colors hover:text-brand"
                        {...(href.startsWith("https")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      >
                        {text}
                      </a>
                    ) : (
                      <p className="self-center text-[15px] leading-relaxed text-mist">{text}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <form
            onSubmit={submit}
            className="grid content-start gap-6 border border-line bg-panel p-7 sm:grid-cols-2 md:p-10 lg:col-span-8"
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
              <select
                name={f.interest}
                defaultValue=""
                className={`${field} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23F15923' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[length:18px] bg-[position:right_14px_center] bg-no-repeat pr-11`}
              >
                <option value="" disabled />
                {solutions.map((s) => (
                  <option key={s.slug}>{s.title}</option>
                ))}
              </select>
            </Field>
            <Field label={f.message} required wide>
              <textarea required name={f.message} rows={6} className={`${field} resize-y`} />
            </Field>
            <div className="sm:col-span-2">
              <button type="submit" className="group btn btn-primary w-full sm:w-auto">
                {contactPage.button}
                <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
