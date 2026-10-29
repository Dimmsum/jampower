"use client";

import Image from "next/image";
import { useRef } from "react";
import { Building2, Droplet, Flag, Globe, Leaf, Sun, Wind, type LucideIcon } from "lucide-react";
import { team } from "@/data/site";
import { ChatWidget, Eyebrow, LandingFooter, LandingHeader, useLandingScroll } from "@/components/landing/chrome";

const facts: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Flag, value: "2014", label: "Founded" },
  { icon: Globe, value: "Caribbean", label: "Market focus" },
  { icon: Leaf, value: "C&I", label: "Turnkey green solutions" },
];

const story: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Leaf,
    title: "The only way to go",
    body: "For us, renewable energy, energy efficiency and green buildings are the only way to go and that is what we have been doing for the last decade.",
  },
  {
    icon: Sun,
    title: "Solar, wind and geothermal",
    body: "We are highly specialized in these installations because they are the most cost-effective way to get rid of fossil fuels and preserve our environment.",
  },
  {
    icon: Building2,
    title: "Eco-friendly construction",
    body: "We offer commercial and industrial turnkey solutions to power enterprises. The construction of eco-friendly edifications is our passion and our focus is in the Caribbean market.",
  },
];

const sources: { icon: LucideIcon; label: string }[] = [
  { icon: Sun, label: "Solar" },
  { icon: Wind, label: "Wind" },
  { icon: Droplet, label: "Geothermal" },
];

const delay = (ms: number) => ({ "--jp-delay": `${ms}ms` }) as React.CSSProperties;

export function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLandingScroll(rootRef, navRef, heroRef, (y) => {
    if (bgRef.current) bgRef.current.style.transform = `translate3d(0,${(y * 0.4).toFixed(1)}px,0)`;
    if (textRef.current) textRef.current.style.transform = `translate3d(0,${(-y * 0.2).toFixed(1)}px,0)`;
  });

  return (
    <div ref={rootRef} className="bg-jp-ink font-manrope text-white antialiased">
      <LandingHeader
        current="about"
        navRef={navRef}
        entranceClass="animate-[jpDown_900ms_cubic-bezier(.2,.7,.2,1)_200ms_both]"
      />

      <main id="main">
        <section
          ref={heroRef}
          aria-labelledby="about-heading"
          className="relative flex min-h-[max(100vh,720px)] items-center overflow-hidden bg-jp-ink"
        >
          <div ref={bgRef} className="absolute inset-0 will-change-transform">
            <Image
              src="/images/hero-sunset.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_55%] animate-[jpKen_2600ms_cubic-bezier(.2,.7,.2,1)_both]"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg,rgba(14,17,22,0.85) 0%,rgba(14,17,22,0.55) 50%,rgba(14,17,22,0.25) 100%),linear-gradient(180deg,rgba(14,17,22,0.5) 0%,rgba(14,17,22,0) 30%,rgba(14,17,22,0) 70%,#0E1116 100%)",
            }}
          />

          <div className="relative z-[2] mx-auto w-full max-w-[1200px] px-[clamp(20px,6vw,96px)] pb-24 pt-[140px]">
            <div
              ref={textRef}
              className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-[clamp(40px,6vw,96px)] gap-y-12 will-change-transform"
            >
              <div>
                <div data-fade>
                  <div className="animate-[jpFade_900ms_ease_300ms_both]">
                    <Eyebrow tone="dark">
                      <span className="text-white/80">About Jampower</span>
                    </Eyebrow>
                  </div>
                </div>
                <h1
                  id="about-heading"
                  className="mt-[22px] text-[clamp(40px,5.8vw,92px)] font-bold leading-none tracking-[-0.035em] text-balance"
                >
                  {[
                    { text: "Commercial &", delay: 400, light: false },
                    { text: "Industrial", delay: 500, light: false },
                    { text: "Solar Experts.", delay: 600, light: true },
                  ].map((line) => (
                    <span key={line.text} data-fade className="-mt-[0.12em] block overflow-hidden pb-[0.06em] pt-[0.12em]">
                      <span
                        className={`block animate-[jpRise_1000ms_cubic-bezier(.2,.7,.2,1)_both] ${
                          line.light ? "font-normal tracking-[-0.02em] text-jp-cream" : ""
                        }`}
                        style={{ animationDelay: `${line.delay}ms` }}
                      >
                        {line.text}
                      </span>
                    </span>
                  ))}
                </h1>
                <div data-fade>
                  <p className="mt-[26px] max-w-[46ch] text-[clamp(17px,1.35vw,20px)] font-medium leading-[1.6] text-white text-pretty [text-shadow:0_2px_24px_rgba(14,17,22,0.9)] animate-[jpUp_1000ms_cubic-bezier(.2,.7,.2,1)_850ms_both]">
                    We are a Jamaican-International company with a multicultural team highly
                    specialized in Renewable Energy and Green solutions, for commercial and industrial
                    projects.
                  </p>
                </div>
              </div>

              <div data-fade>
                <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-white/14 bg-white/14 animate-[jpUp_1000ms_cubic-bezier(.2,.7,.2,1)_1050ms_both]">
                  {facts.map(({ icon: Icon, value, label }) => (
                    <div key={label} className="flex flex-col bg-[rgba(14,17,22,0.6)] px-5 py-[22px] backdrop-blur-[12px]">
                      <Icon size={20} strokeWidth={1.8} className="text-jp-red" aria-hidden="true" />
                      <dt className="order-3 mt-1 text-xs text-white/70">{label}</dt>
                      <dd className="order-2 mt-3.5 text-[26px] font-extrabold tracking-[-0.03em]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="story-heading"
          className="relative bg-jp-ink px-[clamp(20px,6vw,96px)] pb-[clamp(96px,12vw,160px)] pt-[clamp(40px,5vw,80px)] text-white"
        >
          <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-[clamp(40px,6vw,96px)]">
            <div data-stop className="jp-reveal">
              <Eyebrow tone="dark">
                <span id="story-heading">Our story</span>
              </Eyebrow>
              <p className="mt-6 max-w-[24ch] text-[clamp(28px,3.4vw,52px)] font-bold leading-[1.08] tracking-[-0.03em] text-balance">
                Since 2014, we have been creating products and services for businesses that wish for
                a{" "}
                <span className="font-normal text-jp-cream">
                  better, cleaner, healthier, and greener world.
                </span>
              </p>
              <p className="mt-7 max-w-[46ch] text-[clamp(16px,1.2vw,19px)] leading-[1.65] text-white/78 text-pretty">
                We believe that the best heritage we can pass on to our next generation is green,
                sustainable, and cost-effective solutions.
              </p>
            </div>
            <ul className="flex flex-col border-b border-white/16">
              {story.map(({ icon: Icon, title, body }, i) => (
                <li
                  key={title}
                  data-stop
                  className="jp-reveal flex gap-[18px] border-t border-white/16 py-7"
                  style={delay(i * 100)}
                >
                  <span className="inline-flex size-11 flex-none items-center justify-center rounded-full border border-white/30 text-white">
                    <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-bold tracking-[-0.01em]">{title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-white/78 text-pretty">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-label="Energy sources"
          className="relative bg-jp-red px-[clamp(20px,6vw,96px)] py-[clamp(56px,7vw,96px)] text-white"
        >
          <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[clamp(24px,4vw,56px)]">
            {sources.map(({ icon: Icon, label }, i) => (
              <div key={label} data-stop className="jp-reveal flex flex-col gap-4" style={delay(i * 100)}>
                <span className="inline-flex size-[52px] items-center justify-center rounded-full bg-white text-jp-red">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="text-[clamp(26px,2.4vw,36px)] font-bold tracking-[-0.03em]">{label}</div>
              </div>
            ))}
            <div data-stop className="jp-reveal flex items-end" style={delay(300)}>
              <p className="m-0 text-[clamp(16px,1.2vw,19px)] font-medium leading-[1.5] text-pretty">
                Commercial and industrial turnkey solutions to power enterprises.
              </p>
            </div>
          </div>
        </section>

        <section
          id="team"
          aria-labelledby="team-heading"
          className="relative bg-jp-cream px-[clamp(20px,6vw,96px)] py-[clamp(80px,10vw,150px)] text-jp-ink"
        >
          <div className="mx-auto max-w-[1200px]">
            <div data-stop className="jp-reveal flex flex-col items-center text-center">
              <Eyebrow tone="light" centered>
                Meet the team
              </Eyebrow>
              <h2
                id="team-heading"
                className="mt-5 max-w-[18ch] text-[clamp(34px,4.4vw,68px)] font-bold leading-[1.02] tracking-[-0.035em] text-balance"
              >
                An A-team, <span className="font-normal text-jp-red">years in the making.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-[52ch] text-[clamp(16px,1.2vw,19px)] leading-[1.6] text-jp-ink/72 text-pretty">
                Working together for years in the solar field, always learning, always exploring,
                always pushing and fighting for excellence.
              </p>
            </div>

            <ul className="mx-auto mt-[clamp(56px,7vw,96px)] grid max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-x-[clamp(20px,2.5vw,36px)] gap-y-[clamp(32px,4vw,48px)]">
              {team.map((member, i) => (
                <li
                  key={member.name}
                  data-stop
                  className="jp-reveal group flex flex-col items-center gap-5 text-center"
                  style={delay(i * 70)}
                >
                  <div className="relative aspect-square w-[min(100%,200px)]">
                    <div className="absolute inset-0 rounded-full border-[1.5px] border-jp-ink/15" />
                    <div className="absolute inset-2 overflow-hidden rounded-full bg-[#E9E2D6]">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="200px"
                        className="object-cover object-top transition-transform duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-[17px] font-bold tracking-[-0.01em]">{member.name}</div>
                    <div className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-jp-red">
                      {member.role}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <LandingFooter />
      <ChatWidget />
    </div>
  );
}
