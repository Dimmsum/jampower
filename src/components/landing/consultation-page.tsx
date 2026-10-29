"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { site } from "@/data/site";
import {
  ChatWidget,
  CompactFooter,
  Eyebrow,
  LandingHeader,
  phoneHref,
  useLandingScroll,
} from "@/components/landing/chrome";

const steps = [
  {
    title: "Quick call",
    desc: "An engineer phones you within one business day to understand your site, your bills and your goals.",
  },
  {
    title: "Site visit and audit",
    desc: "We measure your consumption and inspect the roof, land or parking you have available. Usually one morning.",
  },
  {
    title: "Your proposal",
    desc: "A clear design, cost and payback estimate for the options that fit. You decide if and when to go ahead.",
  },
];

const parishes = [
  "Kingston", "St. Andrew", "St. Catherine", "Clarendon", "Manchester", "St. Elizabeth", "Westmoreland",
  "Hanover", "St. James", "Trelawny", "St. Ann", "St. Mary", "Portland", "St. Thomas", "Outside Jamaica",
];
const facilities = [
  "Warehouse or factory", "Office building", "Hotel or resort", "Retail or shopping centre",
  "Farm or agri-processing", "Telecom site", "Land for development", "Other",
];
const bills = ["Under J$250k", "J$250k to 1M", "J$1M to 5M", "Over J$5M", "Not sure"];
const interestOptions = [
  "Solar", "Green buildings", "Electric vehicles", "Wind", "Telecom", "Energy efficiency",
  "Industrial construction", "Consulting",
];
const contactMethods = ["Phone call", "WhatsApp", "Email"] as const;

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const fieldClass =
  "w-full rounded-md border border-jp-ink/18 bg-white px-4 py-3.5 font-[inherit] text-[15px] text-jp-ink outline-none transition-colors duration-200 placeholder:text-jp-ink/40 focus:border-jp-ink";

type Sent = { firstName: string; contactMethod: (typeof contactMethods)[number] };

export function ConsultationPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [bill, setBill] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [contactMethod, setContactMethod] = useState<(typeof contactMethods)[number]>("Phone call");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);

  useLandingScroll(rootRef, navRef, heroRef);

  // A message typed into the chat widget arrives as ?message= and pre-fills the form.
  useEffect(() => {
    const carried = new URLSearchParams(window.location.search).get("message");
    if (carried && messageRef.current && !messageRef.current.value) messageRef.current.value = carried;
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const value = (name: string) => String(new FormData(form).get(name) ?? "").trim();

    const name = value("name");
    const email = value("email");
    if (!name) return setError("Please add your name so we know who to ask for.");
    if (!value("phone") && !email) return setError("Add a phone number or email so we can reach you.");
    if (email && !EMAIL_PATTERN.test(email)) return setError("That email address does not look right.");

    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(new FormData(form)),
          bill,
          interests,
          contactMethod,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(result.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSent({ firstName: name.split(" ")[0], contactMethod });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setSent(null);
    setBill(null);
    setInterests([]);
    setError("");
  }

  const contactLabel =
    sent?.contactMethod === "Email" ? "email" : sent?.contactMethod === "WhatsApp" ? "WhatsApp" : "phone";

  return (
    <div ref={rootRef} className="flex min-h-screen flex-col bg-jp-ink font-manrope text-white antialiased">
      <LandingHeader
        current="consultation"
        navRef={navRef}
        entranceClass="animate-[jpDown_900ms_cubic-bezier(.2,.7,.2,1)_200ms_both]"
      />

      <main
        id="main"
        ref={heroRef}
        className="flex-1 px-[clamp(20px,6vw,96px)] pb-[clamp(80px,10vw,140px)] pt-[clamp(120px,16vw,170px)]"
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-[clamp(40px,6vw,96px)]">
          <div className="flex flex-col gap-[clamp(36px,4vw,56px)]">
            <div className="flex flex-col gap-6">
              <Eyebrow tone="dark">
                <span className="text-white/80">Free consultation</span>
              </Eyebrow>
              <h1 className="m-0 text-[clamp(40px,5.2vw,80px)] font-bold leading-none tracking-[-0.035em] text-balance">
                <span className="-mt-[0.12em] block overflow-hidden pb-[0.06em] pt-[0.12em]">
                  <span className="block animate-[jpRise_1000ms_cubic-bezier(.2,.7,.2,1)_300ms_both]">
                    Let&apos;s look at
                  </span>
                </span>
                <span className="-mt-[0.12em] block overflow-hidden pb-[0.06em] pt-[0.12em]">
                  <span className="block font-normal tracking-[-0.02em] text-jp-cream animate-[jpRise_1000ms_cubic-bezier(.2,.7,.2,1)_400ms_both]">
                    your site.
                  </span>
                </span>
              </h1>
              <p className="m-0 max-w-[44ch] text-[clamp(16px,1.25vw,19px)] leading-[1.6] text-white/80 text-pretty animate-[jpUp_1000ms_cubic-bezier(.2,.7,.2,1)_600ms_both]">
                Tell us a little about your facility and what you want to achieve. An engineer will
                call you within one business day to arrange a site visit. No cost, no obligation.
              </p>
            </div>

            <div className="flex flex-col animate-[jpUp_1000ms_cubic-bezier(.2,.7,.2,1)_800ms_both]">
              <h2 className="pb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">
                What happens next
              </h2>
              <ol className="border-b border-white/14">
                {steps.map((s, i) => (
                  <li
                    key={s.title}
                    className="grid grid-cols-[2em_minmax(0,1fr)] gap-x-3 gap-y-1 border-t border-white/14 py-[18px]"
                  >
                    <span className="pt-1 text-xs font-extrabold tracking-[0.1em] text-jp-red">0{i + 1}</span>
                    <h3 className="m-0 text-base font-bold tracking-[-0.01em]">{s.title}</h3>
                    <p className="col-start-2 m-0 text-sm leading-[1.6] text-white/68 text-pretty">{s.desc}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-x-8 gap-y-6 animate-[jpUp_1000ms_cubic-bezier(.2,.7,.2,1)_950ms_both]">
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">Prefer to call?</span>
                <a href={phoneHref} className="text-lg font-bold text-white hover:text-jp-red">
                  {site.contact.phone}
                </a>
                <span className="text-[13px] text-white/60">Mon to Fri, 8am to 5pm</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">Email</span>
                <a href={`mailto:${site.contact.email}`} className="text-lg font-bold text-white hover:text-jp-red">
                  {site.contact.email}
                </a>
                <span className="text-[13px] text-white/60">{site.contact.location}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-jp-cream p-[clamp(24px,3vw,44px)] text-jp-ink shadow-[0_30px_80px_rgba(0,0,0,0.45)] animate-[jpUp_1000ms_cubic-bezier(.2,.7,.2,1)_500ms_both]">
            {sent ? (
              <div
                role="status"
                className="flex min-h-[420px] flex-col justify-center gap-6 animate-[jpSwap_600ms_cubic-bezier(.2,.7,.2,1)_both]"
              >
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-jp-red text-white">
                  <Check size={24} strokeWidth={2.8} aria-hidden="true" />
                </span>
                <h2 className="m-0 text-[clamp(30px,3.4vw,48px)] font-bold leading-[1.02] tracking-[-0.035em] text-balance">
                  Thanks, {sent.firstName}. <span className="font-normal text-jp-ink/60">We&apos;ll be in touch.</span>
                </h2>
                <p className="m-0 max-w-[40ch] text-base leading-[1.6] text-jp-ink/80 text-pretty">
                  An engineer will contact you by {contactLabel} within one business day to arrange your
                  site visit. If it&apos;s urgent, call us on{" "}
                  <a href={phoneHref} className="font-bold text-jp-ink hover:text-jp-red">
                    {site.contact.phone}
                  </a>
                  .
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-3.5 rounded-full bg-jp-ink py-2 pl-6 pr-2 text-[15px] font-bold text-white"
                  >
                    See our projects
                    <span className="inline-flex size-[38px] items-center justify-center rounded-full bg-jp-red">
                      <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden="true" />
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={reset}
                    className="cursor-pointer rounded-full border border-jp-ink/30 bg-transparent px-6 py-[15px] font-[inherit] text-[15px] font-semibold text-jp-ink hover:border-jp-ink"
                  >
                    Send another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="flex flex-col gap-7">
                <FormGroup title="About you">
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3">
                    <Field label="Full name" required>
                      <input name="name" type="text" autoComplete="name" placeholder="Your name" className={fieldClass} />
                    </Field>
                    <Field label="Company">
                      <input name="company" type="text" autoComplete="organization" placeholder="Business or organisation" className={fieldClass} />
                    </Field>
                    <Field label="Phone" required>
                      <input name="phone" type="tel" autoComplete="tel" placeholder="1 (876) 000-0000" className={fieldClass} />
                    </Field>
                    <Field label="Email" required>
                      <input name="email" type="email" autoComplete="email" placeholder="you@company.com" className={fieldClass} />
                    </Field>
                  </div>
                </FormGroup>

                <FormGroup title="Your site">
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3">
                    <Field label="Parish">
                      <select name="parish" defaultValue="" className={fieldClass}>
                        <option value="">Select a parish</option>
                        {parishes.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Facility type">
                      <select name="facility" defaultValue="" className={fieldClass}>
                        <option value="">Select a type</option>
                        {facilities.map((f) => (
                          <option key={f}>{f}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <PillGroup label="Average monthly electricity bill">
                    {bills.map((b) => (
                      <Pill key={b} on={b === bill} onClick={() => setBill(b)}>
                        {b}
                      </Pill>
                    ))}
                  </PillGroup>
                </FormGroup>

                <FormGroup title="What are you interested in?">
                  <div role="group" aria-label="What are you interested in?" className="flex flex-wrap gap-2">
                    {interestOptions.map((label) => {
                      const on = interests.includes(label);
                      return (
                        <Pill
                          key={label}
                          on={on}
                          onClick={() =>
                            setInterests((list) => (on ? list.filter((x) => x !== label) : [...list, label]))
                          }
                        >
                          {on && <Check size={12} strokeWidth={3.2} className="text-jp-red" aria-hidden="true" />}
                          {label}
                        </Pill>
                      );
                    })}
                  </div>
                </FormGroup>

                <Field label="Anything else we should know?">
                  <textarea
                    ref={messageRef}
                    name="message"
                    rows={4}
                    placeholder="Roof age, backup power needs, timelines, budget range..."
                    className={`${fieldClass} resize-y leading-normal`}
                  />
                </Field>

                <PillGroup label="How should we reach you?">
                  {contactMethods.map((c) => (
                    <Pill key={c} on={c === contactMethod} onClick={() => setContactMethod(c)}>
                      {c}
                    </Pill>
                  ))}
                </PillGroup>

                {error && (
                  <div
                    role="alert"
                    className="flex items-center gap-2.5 rounded-md bg-jp-red/10 px-4 py-3 text-sm font-semibold text-[#B3161B] animate-[jpSwap_300ms_ease_both]"
                  >
                    <span className="size-2 flex-none rounded-full bg-jp-red" />
                    {error}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-jp-ink/12 pt-2">
                  <span className="max-w-[30ch] pt-2 text-[13px] leading-normal text-jp-ink/60">
                    We reply within one business day. Your details stay with us.
                  </span>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 inline-flex cursor-pointer items-center gap-3.5 rounded-full border-0 bg-jp-ink py-2 pl-6 pr-2 font-[inherit] text-[15px] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
                  >
                    {submitting ? "Sending…" : "Request my consultation"}
                    <span className="inline-flex size-[38px] items-center justify-center rounded-full bg-jp-red">
                      <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden="true" />
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <CompactFooter />
      <ChatWidget />
    </div>
  );
}

function FormGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="m-0 flex min-w-0 flex-col gap-3.5 border-0 p-0">
      <legend className="mb-3.5 p-0 text-xs font-bold uppercase tracking-[0.16em] text-jp-ink/55">{title}</legend>
      {children}
    </fieldset>
  );
}

function Field({ label, required = false, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-[13px] font-bold">
      <span>
        {label}
        {required && <span className="text-jp-red"> *</span>}
      </span>
      {children}
    </label>
  );
}

function PillGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[13px] font-bold">{label}</span>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

/** Toggle chip, used for both single-choice and multi-choice groups. */
function Pill({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 font-[inherit] text-sm font-semibold [transition:background_200ms_ease,color_200ms_ease,border-color_200ms_ease] hover:border-jp-ink ${
        on ? "border-jp-ink bg-jp-ink text-white" : "border-jp-ink/18 bg-white text-jp-ink"
      }`}
    >
      {children}
    </button>
  );
}
