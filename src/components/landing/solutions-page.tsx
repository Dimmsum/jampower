"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { solutions, type Solution } from "@/data/site";
import {
  ChatWidget,
  Eyebrow,
  LandingFooter,
  LandingHeader,
  useLandingScroll,
} from "@/components/landing/chrome";

const num = (i: number) => String(i + 1).padStart(2, "0");

export function SolutionsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const explorerRef = useRef<HTMLElement>(null);
  // -1 = every accordion item closed (phone layout only).
  const [active, setActive] = useState(0);

  useLandingScroll(rootRef, navRef, heroRef);

  const count = solutions.length;
  const current = solutions[Math.max(0, active)];

  // Desktop: switch tabs, and if the reader has scrolled down the panel, bring
  // its top back into view so the new image is visible.
  const selectTab = (i: number) => {
    setActive(i);
    const sec = explorerRef.current;
    if (!sec) return;
    const top = sec.getBoundingClientRect().top + window.scrollY - 56;
    if (window.scrollY > top + 40) window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div ref={rootRef} className="bg-jp-ink font-manrope text-white antialiased">
      <LandingHeader
        current="solutions"
        navRef={navRef}
        entranceClass="animate-[jpDown_900ms_cubic-bezier(.2,.7,.2,1)_200ms_both]"
      />

      <main id="main">
        <section
          ref={heroRef}
          aria-labelledby="solutions-heading"
          className="relative flex min-h-[max(72vh,560px)] items-end overflow-hidden bg-jp-ink"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/solar-building.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_45%] animate-[jpKen_2600ms_cubic-bezier(.2,.7,.2,1)_both]"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,17,22,0.55)_0%,rgba(14,17,22,0.1)_35%,rgba(14,17,22,0.3)_65%,#0E1116_100%)]" />
          <div className="relative z-[2] mx-auto grid w-full max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-x-[clamp(32px,5vw,80px)] gap-y-6 px-[clamp(20px,6vw,96px)] pb-[clamp(40px,5vw,64px)] pt-40">
            <h1
              id="solutions-heading"
              className="m-0 text-[clamp(40px,5.6vw,88px)] font-bold leading-none tracking-[-0.035em] text-balance"
            >
              <span className="-mt-[0.12em] block overflow-hidden pb-[0.06em] pt-[0.12em]">
                <span className="block animate-[jpRise_1000ms_cubic-bezier(.2,.7,.2,1)_400ms_both]">
                  Clean power,
                </span>
              </span>
              <span className="-mt-[0.12em] block overflow-hidden pb-[0.06em] pt-[0.12em]">
                <span className="block font-normal tracking-[-0.02em] text-jp-cream animate-[jpRise_1000ms_cubic-bezier(.2,.7,.2,1)_500ms_both]">
                  built end to end.
                </span>
              </span>
            </h1>
            <p className="m-0 max-w-[44ch] text-[clamp(16px,1.25vw,19px)] font-medium leading-[1.6] text-white text-pretty [text-shadow:0_2px_24px_rgba(14,17,22,0.9)] animate-[jpUp_1000ms_cubic-bezier(.2,.7,.2,1)_750ms_both]">
              From the first energy audit to the last panel bolted down, we design, build and
              maintain renewable energy and green construction projects for commercial and industrial
              clients across the Caribbean.
            </p>
          </div>
        </section>

        {/* Desktop: sticky tab list beside the selected solution. */}
        <section
          ref={explorerRef}
          id="solutions"
          aria-label="Our solutions"
          className="hidden bg-jp-ink px-[clamp(20px,6vw,96px)] pb-[clamp(80px,10vw,140px)] pt-[clamp(40px,5vw,80px)] min-[820px]:block"
        >
          <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(260px,0.9fr)_minmax(0,2fr)] items-start gap-[clamp(32px,5vw,80px)]">
            <div className="sticky top-24 flex flex-col">
              <div className="pb-5">
                <Eyebrow tone="dark">
                  <span className="text-white/80">Our solutions</span>
                </Eyebrow>
              </div>
              <div role="tablist" aria-orientation="vertical" className="flex flex-col">
                {solutions.map((s, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      aria-controls="solution-panel"
                      onClick={() => selectTab(i)}
                      className={`grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-0 border-t border-white/12 bg-transparent py-4 text-left font-[inherit] transition-colors duration-[250ms] hover:text-white ${
                        on ? "text-white" : "text-white/45"
                      }`}
                    >
                      <span className="text-[clamp(17px,1.5vw,22px)] font-bold leading-[1.1] tracking-[-0.02em]">
                        {s.title}
                      </span>
                      <span
                        className={`h-0.5 bg-jp-red transition-[width] duration-[350ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
                          on ? "w-7" : "w-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-2.5 border-t border-white/12 pt-5">
                <StepButton label="Previous" onClick={() => setActive((a) => (Math.max(0, a) - 1 + count) % count)}>
                  <ArrowLeft size={16} strokeWidth={2.4} aria-hidden="true" />
                </StepButton>
                <StepButton label="Next" onClick={() => setActive((a) => (Math.max(0, a) + 1) % count)}>
                  <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
                </StepButton>
              </div>
            </div>

            <div key={current.id} id="solution-panel" role="tabpanel" className="flex min-w-0 flex-col">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg animate-[jpSwapImg_600ms_cubic-bezier(.2,.7,.2,1)_both]">
                <Image src={current.image} alt={current.alt} fill sizes="66vw" className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,17,22,0)_45%,rgba(14,17,22,0.85)_100%)]" />
                <div className="absolute inset-x-[clamp(20px,3vw,36px)] bottom-[clamp(20px,3vw,32px)] flex flex-col gap-2.5">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">{current.tagline}</span>
                  <h2 className="m-0 text-[clamp(32px,4vw,60px)] font-bold leading-none tracking-[-0.035em] text-balance">
                    {current.title}
                  </h2>
                </div>
              </div>
              <div className="mt-[clamp(28px,3vw,40px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[clamp(24px,3vw,48px)] animate-[jpSwap_600ms_cubic-bezier(.2,.7,.2,1)_120ms_both]">
                <div>
                  <p className="m-0 max-w-[44ch] text-[clamp(16px,1.25vw,19px)] leading-[1.6] text-white/85 text-pretty">
                    {current.lead}
                  </p>
                  <ConsultCta className="mt-7" />
                </div>
                <ItemList solution={current} />
              </div>
            </div>
          </div>
        </section>

        {/* Phone: accordion. */}
        <section aria-label="Our solutions" className="bg-jp-ink px-5 pb-20 pt-6 min-[820px]:hidden">
          <div className="pb-4">
            <Eyebrow tone="dark">
              <span className="text-white/80">Our solutions</span>
            </Eyebrow>
          </div>
          {solutions.map((s, i) => {
            const open = i === active;
            return (
              <div key={s.id} className="border-t border-white/12">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`solution-${s.id}`}
                  onClick={() => setActive((a) => (a === i ? -1 : i))}
                  className={`grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-0 bg-transparent py-[18px] text-left font-[inherit] ${
                    open ? "text-white" : "text-white/45"
                  }`}
                >
                  <span className="text-[22px] font-bold leading-[1.1] tracking-[-0.02em]">{s.title}</span>
                  <span
                    className={`inline-flex size-9 items-center justify-center rounded-full border border-white/25 text-white transition-transform duration-300 ${
                      open ? "rotate-45" : ""
                    }`}
                  >
                    <Plus size={14} strokeWidth={2.4} aria-hidden="true" />
                  </span>
                </button>
                {open && (
                  <div
                    id={`solution-${s.id}`}
                    className="flex flex-col gap-5 pb-7 animate-[jpSwap_500ms_cubic-bezier(.2,.7,.2,1)_both]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image src={s.image} alt={s.alt} fill sizes="100vw" className="object-cover" />
                    </div>
                    <p className="m-0 text-base leading-[1.6] text-white/85 text-pretty">{s.lead}</p>
                    <ItemList solution={s} compact />
                    <ConsultCta className="self-start" />
                  </div>
                )}
              </div>
            );
          })}
          <div className="border-t border-white/12" />
        </section>

        <section
          aria-labelledby="audit-heading"
          className="bg-jp-cream px-[clamp(20px,6vw,96px)] py-[clamp(64px,8vw,120px)] text-jp-ink"
        >
          <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-[clamp(32px,5vw,80px)]">
            <h2
              id="audit-heading"
              className="m-0 text-[clamp(32px,4.2vw,64px)] font-bold leading-none tracking-[-0.035em] text-balance"
            >
              Not sure where to start? <span className="font-normal text-jp-ink/60">Start with an audit.</span>
            </h2>
            <div>
              <p className="m-0 max-w-[44ch] text-[clamp(16px,1.25vw,19px)] leading-[1.6] text-jp-ink/80 text-pretty">
                Most projects begin with a site visit and an energy audit. We measure what your
                facility uses, where it leaks, and which of these eight disciplines will pay back
                fastest. Then you decide.
              </p>
              <Link
                href="/consultation"
                className="mt-7 inline-flex items-center gap-3.5 rounded-full bg-jp-ink py-2 pl-6 pr-2 text-[15px] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                Book a consultation
                <span className="inline-flex size-[38px] items-center justify-center rounded-full bg-jp-red">
                  <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
      <ChatWidget />
    </div>
  );
}

function ItemList({ solution, compact = false }: { solution: Solution; compact?: boolean }) {
  return (
    <ol className="flex flex-col border-b border-white/14">
      {solution.items.map((it, j) => (
        <li
          key={it.name}
          className={`grid grid-cols-[2em_minmax(0,1fr)] gap-x-3 gap-y-1 border-t border-white/14 ${
            compact ? "py-3.5" : "py-[18px]"
          }`}
        >
          <span className={`text-xs font-extrabold tracking-[0.1em] text-jp-red ${compact ? "pt-[3px]" : "pt-1"}`}>
            {num(j)}
          </span>
          <h3 className="m-0 text-base font-bold tracking-[-0.01em]">{it.name}</h3>
          <p className="col-start-2 m-0 text-sm leading-[1.6] text-white/68 text-pretty">{it.desc}</p>
        </li>
      ))}
    </ol>
  );
}

function ConsultCta({ className }: { className: string }) {
  return (
    <Link
      href="/consultation"
      className={`inline-flex items-center gap-3.5 rounded-full bg-white py-2 pl-6 pr-2 text-[15px] font-bold text-jp-ink transition-transform duration-200 hover:-translate-y-0.5 ${className}`}
    >
      Get free consultation
      <span className="inline-flex size-[38px] items-center justify-center rounded-full bg-jp-red text-white">
        <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden="true" />
      </span>
    </Link>
  );
}

function StepButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-transparent text-white transition-colors duration-200 hover:border-white"
    >
      {children}
    </button>
  );
}
