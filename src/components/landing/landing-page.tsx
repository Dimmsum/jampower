"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { testimonials } from "@/data/site";
import {
  ChatWidget,
  Eyebrow,
  LandingFooter,
  LandingHeader,
  PrimaryCta,
  useLandingScroll,
} from "@/components/landing/chrome";

// Scroll distance (px) on either side of a timeline dot over which its ring fills.
const RING_HALF = 90;

export function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const teamImgRef = useRef<HTMLDivElement>(null);

  useLandingScroll(rootRef, navRef, heroRef, (y, vh) => {
    const p = Math.min(y / vh, 1);

    if (bgRef.current) {
      bgRef.current.style.transform = `translate3d(0,${(y * 0.45).toFixed(1)}px,0) scale(${1 + p * 0.1})`;
    }
    if (textRef.current) {
      textRef.current.style.transform = `translate3d(0,${(-y * 0.25).toFixed(1)}px,0)`;
    }

    // Partner timeline: the rail tip tracks a reading line at 55% of the viewport.
    // While a numbered dot crosses that line the tip rests on the dot and its ring
    // loops around; between dots the tip moves faster to catch up, so the rail
    // never lags behind the scroll position.
    const tl = tlRef.current;
    if (tl) {
      const r = tl.getBoundingClientRect();
      const s = vh * 0.55 - r.top;
      const dots = [...tl.querySelectorAll<HTMLElement>("[data-dot]")];
      const centers = dots.map((dot) => {
        const d = dot.getBoundingClientRect();
        return d.top + d.height / 2 - r.top;
      });

      // Piecewise-linear map from reading-line position to rail length.
      const knots: [number, number][] = [[0, 0]];
      for (const c of centers) knots.push([c - RING_HALF, c], [c + RING_HALF, c]);
      knots.push([r.height, r.height]);
      let fill = s <= 0 ? 0 : r.height;
      for (let k = 1; k < knots.length; k++) {
        const [s0, f0] = knots[k - 1];
        const [s1, f1] = knots[k];
        if (s <= s1) {
          fill = s1 > s0 ? f0 + ((f1 - f0) * Math.max(0, s - s0)) / (s1 - s0) : f1;
          break;
        }
      }

      dots.forEach((dot, k) => {
        const ring = Math.max(0, Math.min(1, (s - (centers[k] - RING_HALF)) / (2 * RING_HALF)));
        const arc = dot.querySelector<SVGCircleElement>("[data-ring]");
        if (arc) arc.style.strokeDashoffset = (1 - ring).toFixed(4);
      });

      const y = `${Math.max(0, Math.min(r.height, fill)).toFixed(1)}px`;
      if (railRef.current) railRef.current.style.height = y;
      if (markerRef.current) markerRef.current.style.top = y;
    }

    if (teamRef.current && teamImgRef.current) {
      const tr = teamRef.current.getBoundingClientRect();
      const t = Math.max(-1, Math.min(1, (tr.top + tr.height / 2 - vh / 2) / vh));
      teamImgRef.current.style.transform = `translate3d(0,${(t * -10).toFixed(2)}%,0)`;
    }
  });

  return (
    <div ref={rootRef} className="bg-jp-ink font-manrope text-white antialiased">
      <LandingHeader
        current="home"
        navRef={navRef}
        entranceClass="animate-[jpDown_900ms_cubic-bezier(.2,.7,.2,1)_600ms_both]"
      />

      <main id="main">
        <section
          ref={heroRef}
          aria-label="Introduction"
          className="relative min-h-[max(100vh,760px)] overflow-hidden bg-jp-ink"
        >
          <div ref={bgRef} className="absolute inset-0 will-change-transform">
            <div className="relative size-full animate-[jpZoom_2600ms_cubic-bezier(.2,.7,.2,1)_both]">
              <Image
                src="/images/landing/hero-technicians.avif"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_45%] animate-[jpDrift_18s_ease-in-out_2300ms_infinite_alternate]"
              />
            </div>
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 48%,rgba(14,17,22,0.55) 0%,rgba(14,17,22,0.2) 60%,rgba(14,17,22,0) 100%),linear-gradient(180deg,rgba(14,17,22,0.4) 0%,rgba(14,17,22,0) 22%,rgba(14,17,22,0) 55%,#0E1116 100%)",
            }}
          />

          <div
            aria-hidden="true"
            className="absolute right-[clamp(20px,3vw,44px)] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3.5 animate-[jpFade_1200ms_ease_1200ms_both] min-[1100px]:flex"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 [writing-mode:vertical-rl]">
              Scroll
            </span>
            <span className="relative h-16 w-px overflow-hidden bg-white/18">
              <span className="absolute left-0 top-0 h-[40%] w-full bg-white animate-[jpScroll_1.8s_ease-in-out_infinite]" />
            </span>
          </div>

          <div className="relative z-[2] mx-auto flex min-h-[max(100vh,760px)] max-w-[1400px] flex-col px-[clamp(20px,6vw,96px)] pb-6 pt-28">
            <div className="flex flex-1 items-center justify-center py-6">
              <div ref={textRef} className="flex flex-col items-center text-center will-change-transform">
                <h1 className="mt-[26px] max-w-[14ch] text-[clamp(44px,6.4vw,104px)] font-bold leading-[1.02] tracking-[-0.035em] text-balance">
                  <span data-fade className="-mt-[0.12em] block overflow-hidden pb-[0.06em] pt-[0.12em]">
                    <span className="block animate-[jpRise_1000ms_cubic-bezier(.2,.7,.2,1)_750ms_both]">
                      Power your business.
                    </span>
                  </span>
                  <span data-fade className="-mt-[0.12em] block overflow-hidden pb-[0.06em] pt-[0.12em]">
                    <span className="block font-normal tracking-[-0.02em] text-jp-cream animate-[jpRise_1000ms_cubic-bezier(.2,.7,.2,1)_900ms_both]">
                      Build it to last.
                    </span>
                  </span>
                </h1>
                <div data-fade>
                  <p className="mx-auto mt-[26px] max-w-[44ch] text-[clamp(17px,1.45vw,22px)] font-medium leading-[1.6] text-white text-pretty [text-shadow:0_2px_24px_rgba(14,17,22,0.9),0_1px_2px_rgba(14,17,22,0.8)] animate-[jpUp_1000ms_cubic-bezier(.2,.7,.2,1)_1150ms_both]">
                    Affordable energy and construction solutions, engineered for Caribbean sun, storms
                    and budgets.
                  </p>
                </div>
                <div data-fade>
                  <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5 animate-[jpUp_1000ms_cubic-bezier(.2,.7,.2,1)_1300ms_both]">
                    <PrimaryCta href="/consultation" label="Free consultation" />
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-2.5 rounded-full border border-white/30 px-[26px] py-[17px] text-base font-semibold text-white [transition:border-color_200ms_ease,background_200ms_ease] hover:border-white hover:bg-white/8"
                    >
                      View our projects
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="partners"
          aria-labelledby="partners-heading"
          className="relative bg-jp-ink px-[clamp(20px,6vw,96px)] pb-[clamp(96px,12vw,160px)] pt-[clamp(40px,6vw,80px)] text-white"
        >
          <div className="mx-auto max-w-[1200px]">
            <div data-stop className="jp-reveal flex flex-col items-center text-center">
              <Eyebrow centered tone="dark">Trusted partners</Eyebrow>
              <h2
                id="partners-heading"
                className="mt-5 max-w-[16ch] text-[clamp(34px,4.4vw,68px)] font-bold leading-[1.02] tracking-[-0.035em] text-balance"
              >
                Trusted across the region.{" "}
                <span className="font-normal text-jp-cream">A few of the people we work with.</span>
              </h2>
            </div>

            <div ref={tlRef} className="relative mt-[clamp(56px,7vw,96px)]">
              <div className="absolute inset-y-0 left-[14px] w-0.5 -translate-x-1/2 rounded-[1px] bg-white/12 min-[820px]:left-1/2" />
              <div
                ref={railRef}
                className="absolute left-[14px] top-0 h-0 w-0.5 -translate-x-1/2 rounded-[1px] bg-jp-red will-change-[height] min-[820px]:left-1/2"
              />
              <div
                ref={markerRef}
                className="absolute left-[14px] top-0 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-jp-red shadow-[0_0_0_6px_rgba(227,38,43,0.2)] will-change-[top] min-[820px]:left-1/2"
              />

              <ol className="flex flex-col gap-[clamp(56px,8vw,120px)]">
                {testimonials.map((t, i) => {
                  const left = i % 2 === 0;
                  return (
                    <li
                      key={t.project}
                      data-stop
                      className="jp-reveal grid grid-cols-[28px_minmax(0,1fr)] items-center gap-x-[clamp(20px,4vw,64px)] [--jp-dur:900ms] [--jp-shift:40px] min-[820px]:grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)]"
                    >
                      <div
                        className={`relative col-start-2 row-start-1 ${
                          left ? "min-[820px]:col-start-1" : "min-[820px]:col-start-3"
                        }`}
                      >
                        {t.image ? (
                          <>
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
                              <Image
                                src={t.image}
                                alt={t.alt ?? ""}
                                fill
                                sizes="(min-width: 820px) 40vw, 90vw"
                                className="object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-[18px] left-4 inline-flex items-center rounded-md bg-jp-cream px-4 py-2.5 text-[13px] font-bold text-jp-ink shadow-[0_14px_30px_rgba(0,0,0,0.35)]">
                              {t.project} · {t.location}
                            </div>
                          </>
                        ) : (
                          <ClientPanel project={t.project} location={t.location} />
                        )}
                      </div>

                      <div
                        data-dot
                        className="relative z-10 col-start-1 row-start-1 flex size-7 items-center justify-center self-start justify-self-center rounded-full bg-jp-ink text-[11px] font-extrabold text-white min-[820px]:col-start-2 min-[820px]:self-center"
                      >
                        <svg viewBox="0 0 28 28" className="absolute inset-0 -rotate-90" aria-hidden="true">
                          <circle cx="14" cy="14" r="13" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
                          <circle
                            data-ring
                            cx="14"
                            cy="14"
                            r="13"
                            fill="none"
                            stroke="#E3262B"
                            strokeWidth="2"
                            pathLength={1}
                            strokeDasharray="1"
                            strokeDashoffset="1"
                          />
                        </svg>
                        <span className="relative">{String(i + 1).padStart(2, "0")}</span>
                      </div>

                      <figure
                        className={`col-start-2 row-start-2 pt-8 min-[820px]:row-start-1 min-[820px]:pt-0 ${
                          left ? "min-[820px]:col-start-3" : "min-[820px]:col-start-1"
                        }`}
                      >
                        <QuoteMark />
                        <blockquote className="mt-5 max-w-[32ch] text-[clamp(18px,1.7vw,27px)] font-medium leading-[1.4] tracking-[-0.02em] text-pretty">
                          {t.quote}
                        </blockquote>
                        <figcaption className="mt-7 flex items-center gap-4 border-t border-white/14 pt-6">
                          <span className="relative size-[88px] flex-none overflow-hidden rounded-full ring-[1.5px] ring-white/20">
                            <Image src={t.photo} alt={`Portrait of ${t.author}`} fill sizes="88px" className="object-cover" />
                          </span>
                          <span>
                            <span className="block text-base font-bold">{t.author}</span>
                            <span className="mt-0.5 block text-[13px] text-white/60">{t.role}</span>
                          </span>
                        </figcaption>
                      </figure>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div
              data-stop
              className="jp-reveal mt-[clamp(72px,9vw,128px)] flex flex-wrap items-center justify-between gap-6 border-t border-white/14 pt-8"
            >
              <p className="m-0 max-w-[36ch] text-[clamp(20px,2vw,30px)] font-semibold leading-[1.3] tracking-[-0.02em] text-balance">
                Want to see what they helped us build?
              </p>
              <PrimaryCta href="/projects" label="View our projects" shadow={false} />
            </div>
          </div>
        </section>

        <section
          id="about"
          aria-labelledby="about-heading"
          className="relative overflow-hidden bg-jp-cream px-[clamp(20px,6vw,96px)] py-[clamp(80px,10vw,150px)] text-jp-ink"
        >
          <div className="mx-auto max-w-[1200px]">
            <div
              data-stop
              className="jp-reveal grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-x-16 gap-y-6"
            >
              <div>
                <Eyebrow tone="light">Who we are</Eyebrow>
                <h2
                  id="about-heading"
                  className="mt-5 text-[clamp(34px,4.2vw,64px)] font-bold leading-[1.02] tracking-[-0.035em] text-balance"
                >
                  Jampower. <span className="font-normal text-jp-red">The commercial solar experts.</span>
                </h2>
              </div>
              <p className="m-0 text-[clamp(16px,1.2vw,19px)] leading-[1.65] text-jp-ink/75 text-pretty">
                Our know-how in Commercial &amp; Industrial solar projects gave us the opportunity to
                work with the best clients around the region, and we are glad about the confidence we
                built up with our clients-partners during all these years.
              </p>
            </div>

            <div className="mt-[clamp(40px,5vw,72px)] grid grid-cols-[minmax(0,1fr)] items-start gap-[clamp(24px,4vw,56px)] min-[820px]:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              <div
                ref={teamRef}
                data-stop
                className="jp-reveal relative aspect-video w-full overflow-hidden rounded-lg [--jp-dur:900ms]"
              >
                <div ref={teamImgRef} className="absolute inset-x-0 -inset-y-[10%] will-change-transform">
                  <Image
                    src="/images/team-aerial.png"
                    alt="The Jampower team on a rooftop installation"
                    fill
                    sizes="(min-width: 820px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div
                data-stop
                className="jp-reveal flex flex-col min-[820px]:pt-2 [--jp-delay:150ms] [--jp-dur:900ms]"
              >
                <p className="mb-7 text-[clamp(16px,1.2vw,19px)] leading-[1.65] text-jp-ink/75 text-pretty">
                  Jampower focuses on high quality solutions to ensure the longest system lifespan. Our
                  O&amp;M solutions play a main role in reaching those lifespan targets.
                </p>
                <ul>
                  {["Commercial & Industrial", "Design & Install", "Operations & Maintenance"].map(
                    (item, i, all) => (
                      <li
                        key={item}
                        className={`flex items-center justify-between gap-4 border-t border-jp-ink/14 py-[18px] ${
                          i === all.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <span className="text-base font-bold">{item}</span>
                        <span className="text-xs font-bold text-jp-red">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          id="solutions"
          aria-labelledby="solutions-heading"
          className="relative overflow-hidden bg-jp-ink px-[clamp(20px,6vw,96px)] py-[clamp(80px,10vw,150px)] text-white"
        >
          <Image
            src="/images/landing/why-solar-bg.avif"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,17,22,0.92)_0%,rgba(14,17,22,0.72)_45%,rgba(14,17,22,0.88)_100%)]" />
          <div className="relative mx-auto max-w-[1200px]">
            <div
              data-stop
              className="jp-reveal grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-end gap-x-16 gap-y-6"
            >
              <div>
                <Eyebrow tone="dark">Why solar</Eyebrow>
                <h2
                  id="solutions-heading"
                  className="mt-5 text-[clamp(34px,4.4vw,68px)] font-bold leading-[1.02] tracking-[-0.035em] text-balance"
                >
                  Get rid of <span className="font-normal text-jp-cream">your energy bill.</span>
                </h2>
              </div>
              <p className="m-0 max-w-[46ch] text-[clamp(16px,1.2vw,19px)] leading-[1.6] text-white/80 text-pretty">
                Harness the sun to generate your own electricity, cut your dependence on the grid and
                reduce your environmental impact.
              </p>
            </div>

            <div className="mt-[clamp(48px,6vw,88px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
              <SolutionCard label="Savings" num="01">
                <div className="text-[clamp(44px,4.6vw,72px)] font-extrabold leading-none tracking-[-0.04em]">
                  100%
                </div>
                <SolutionBody title="We save our clients up to 100% on their electric bill.">
                  Solar PV turns abundant sunlight into power for your business, so you rely less on
                  costly grid electricity and its unpredictable rate hikes.
                </SolutionBody>
              </SolutionCard>

              <SolutionCard label="Design" num="02" highlight>
                <div className="text-[clamp(28px,2.6vw,40px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
                  Built for the <span className="font-normal text-jp-cream">Caribbean</span>
                </div>
                <SolutionBody title="Solar solutions tailored for Caribbean climate." highlight>
                  Our team designs and installs systems for optimal mechanical and electrical
                  performance, engineered to withstand the region&apos;s most adverse conditions for
                  decades.
                </SolutionBody>
              </SolutionCard>

              <SolutionCard label="Our results" num="03">
                <ul className="flex flex-col gap-2.5">
                  {[
                    "Lower, predictable energy costs",
                    "Control over your own supply",
                    "A cleaner, more sustainable future",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[15px] font-semibold">
                      <span className="size-2 flex-none rounded-full bg-jp-red" />
                      {item}
                    </li>
                  ))}
                </ul>
                <SolutionBody title="A win for your budget and the environment.">
                  Say goodbye to high electricity bills and hello to substantial savings. Contact us
                  today to start your journey towards a brighter, more cost-effective energy future.
                </SolutionBody>
              </SolutionCard>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
      <ChatWidget />
    </div>
  );
}

function SolutionCard({
  label,
  num,
  highlight = false,
  children,
}: {
  label: string;
  num: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      data-stop
      className={`jp-reveal flex flex-col gap-7 rounded-lg p-[clamp(24px,2.6vw,36px)] ${
        highlight ? "bg-jp-red text-white" : "border border-white/14 bg-[rgba(20,24,31,0.78)]"
      }`}
    >
      <div
        className={`flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] ${
          highlight ? "text-white/80" : "text-white/60"
        }`}
      >
        <span>{label}</span>
        <span className="text-[13px] font-extrabold text-white">{num}</span>
      </div>
      {children}
    </div>
  );
}

function SolutionBody({
  title,
  highlight = false,
  children,
}: {
  title: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="m-0 text-xl font-bold tracking-[-0.02em]">{title}</h3>
      <p
        className={`mt-3 text-[15px] leading-[1.6] text-pretty ${
          highlight ? "text-white/90" : "text-white/72"
        }`}
      >
        {children}
      </p>
    </div>
  );
}


// Stands in for the site photo when a testimonial has none: same footprint,
// so the timeline keeps its rhythm, with the client name set large instead.
function ClientPanel({ project, location }: { project: string; location: string }) {
  return (
    <div className="relative flex aspect-[16/9] w-full flex-col justify-end overflow-hidden rounded-lg border border-white/10 bg-[#151a21] p-[clamp(24px,3vw,40px)] shadow-[0_30px_60px_rgba(0,0,0,0.45)] min-[820px]:aspect-[4/3]">
      <div
        aria-hidden="true"
        className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_30px] [mask-image:radial-gradient(120%_90%_at_100%_0%,#000_10%,transparent_70%)]"
      />
      <div aria-hidden="true" className="absolute right-0 top-0 h-1 w-1/3 bg-jp-red" />
      <span className="relative text-[12px] font-bold uppercase tracking-[0.18em] text-white/50">Client</span>
      <span className="relative mt-3 text-[clamp(44px,6vw,88px)] font-bold leading-none tracking-[-0.04em]">
        {project}
      </span>
      <span className="relative mt-5 text-[13px] font-bold text-white/70">
        {location}
      </span>
    </div>
  );
}

function QuoteMark() {
  return (
    <svg width="36" height="27" viewBox="0 0 40 30" fill="#E3262B" aria-hidden="true">
      <path d="M0 30V17.6C0 7.9 5.6 1.9 16.2 0l2 4.4c-5.2 1.4-8.4 4.4-9 9H17V30H0zm23 0V17.6C23 7.9 28.6 1.9 39.2 0l2 4.4c-5.2 1.4-8.4 4.4-9 9H40V30H23z" />
    </svg>
  );
}
