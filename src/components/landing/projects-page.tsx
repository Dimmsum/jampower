"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/site";
import { ChatWidget, LandingFooter, LandingHeader, useLandingScroll } from "@/components/landing/chrome";

export function ProjectsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useLandingScroll(rootRef, navRef, heroRef);

  return (
    <div ref={rootRef} className="bg-jp-ink font-manrope text-white antialiased">
      <LandingHeader
        current="projects"
        navRef={navRef}
        entranceClass="animate-[jpDown_900ms_cubic-bezier(.2,.7,.2,1)_200ms_both]"
      />

      <main id="main">
        <section
          ref={heroRef}
          aria-labelledby="projects-heading"
          className="relative flex min-h-[max(64vh,520px)] items-end overflow-hidden bg-jp-ink"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/landing/why-solar-bg.avif"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_40%] animate-[jpKen_2600ms_cubic-bezier(.2,.7,.2,1)_both]"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,17,22,0.55)_0%,rgba(14,17,22,0.1)_35%,rgba(14,17,22,0.35)_65%,#0E1116_100%)]" />
          <div className="relative z-[2] mx-auto grid w-full max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-x-[clamp(32px,5vw,80px)] gap-y-6 px-[clamp(20px,6vw,96px)] pb-[clamp(40px,5vw,64px)] pt-40">
            <h1
              id="projects-heading"
              className="m-0 text-[clamp(40px,5.6vw,88px)] font-bold leading-none tracking-[-0.035em] text-balance"
            >
              <span className="-mt-[0.12em] block overflow-hidden pb-[0.06em] pt-[0.12em]">
                <span className="block animate-[jpRise_1000ms_cubic-bezier(.2,.7,.2,1)_400ms_both]">
                  Built across
                </span>
              </span>
              <span className="-mt-[0.12em] block overflow-hidden pb-[0.06em] pt-[0.12em]">
                <span className="block font-normal tracking-[-0.02em] text-jp-cream animate-[jpRise_1000ms_cubic-bezier(.2,.7,.2,1)_500ms_both]">
                  the island.
                </span>
              </span>
            </h1>
            <p className="m-0 max-w-[44ch] text-[clamp(16px,1.25vw,19px)] font-medium leading-[1.6] text-white text-pretty [text-shadow:0_2px_24px_rgba(14,17,22,0.9)] animate-[jpUp_1000ms_cubic-bezier(.2,.7,.2,1)_750ms_both]">
              Sites that show how we work: the roof, the land and the people behind each install.
              Commercial and industrial solar, engineered for Caribbean sun and storms.
            </p>
          </div>
        </section>

        <section
          id="projects"
          aria-label="Our projects"
          className="overflow-hidden bg-jp-ink pb-[clamp(80px,10vw,140px)] pt-[clamp(24px,4vw,56px)]"
        >
          <div className="flex flex-col gap-[clamp(64px,8vw,112px)]">
            {projects.map((project, i) => (
              <ProjectStrip key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="next-heading"
          className="bg-jp-cream px-[clamp(20px,6vw,96px)] py-[clamp(64px,8vw,120px)] text-jp-ink"
        >
          <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-[clamp(32px,5vw,80px)]">
            <h2
              id="next-heading"
              className="m-0 text-[clamp(32px,4.2vw,64px)] font-bold leading-none tracking-[-0.035em] text-balance"
            >
              Your site could be next. <span className="font-normal text-jp-ink/60">Start with an audit.</span>
            </h2>
            <div>
              <p className="m-0 max-w-[44ch] text-[clamp(16px,1.25vw,19px)] leading-[1.6] text-jp-ink/80 text-pretty">
                Every project here began with a site visit and an energy audit. We measure what your
                facility uses and show you what a system like these would return.
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

/** One project: heading row, a horizontally scrolling photo strip, then the summary. */
function ProjectStrip({ project, index }: { project: Project; index: number }) {
  const photos = [{ src: project.image, alt: project.alt }, ...(project.gallery ?? [])];
  const meta = [
    { k: "Scope", v: project.category },
    { k: "Location", v: project.location },
  ];

  return (
    <article aria-labelledby={`${project.slug}-title`} className="flex flex-col gap-[clamp(20px,2.5vw,32px)]">
      <div
        data-stop
        className="jp-reveal mx-auto flex w-full max-w-[1200px] flex-wrap items-end justify-between gap-x-10 gap-y-5 px-[clamp(20px,6vw,96px)]"
      >
        <div className="flex min-w-0 flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
            <span className="text-jp-red">{String(index + 1).padStart(2, "0")}</span> &middot; {project.location}
          </span>
          <h2
            id={`${project.slug}-title`}
            className="m-0 text-[clamp(28px,3.4vw,52px)] font-bold leading-none tracking-[-0.035em] text-balance"
          >
            {project.title}
          </h2>
        </div>
        <dl className="m-0 flex gap-7 pb-1">
          {meta.map((m) => (
            <div key={m.k} className="flex flex-col gap-1">
              <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">{m.k}</dt>
              <dd className="m-0 text-[15px] font-bold">{m.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <PhotoStrip photos={photos} />

      <div data-stop className="jp-reveal mx-auto w-full max-w-[1200px] px-[clamp(20px,6vw,96px)]">
        <p className="m-0 max-w-[60ch] text-[clamp(15px,1.1vw,17px)] leading-[1.6] text-white/75 text-pretty">
          {project.summary}
        </p>
      </div>
    </article>
  );
}

/**
 * Horizontally scrolling photo strip. With more than one photo the set is rendered three times
 * and the scroll position is recentred on the middle copy, so scrolling past either end wraps.
 */
function PhotoStrip({ photos }: { photos: { src: string; alt: string }[] }) {
  const single = photos.length === 1;
  const copies = single ? [0] : [0, 1, 2];
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || single) return;

    const setWidth = () => {
      const first = el.querySelector<HTMLElement>('[data-copy="0"]');
      const second = el.querySelector<HTMLElement>('[data-copy="1"]');
      return first && second ? second.offsetLeft - first.offsetLeft : 0;
    };

    el.scrollLeft = setWidth();

    // Recentre only once scrolling has settled: jumping scrollLeft mid-momentum or mid-snap
    // cancels the animation and makes the wrap visibly stutter. Copies are identical, so the
    // jump by exactly one set width lands on the same visual position.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const recentre = () => {
      const w = setWidth();
      if (!w) return;
      if (el.scrollLeft < w * 0.5) el.scrollLeft += w;
      else if (el.scrollLeft >= w * 1.5) el.scrollLeft -= w;
    };
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(recentre, 150);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      el.removeEventListener("scroll", onScroll);
    };
  }, [single]);

  return (
    // Side padding lines the first photo up with the 1200px content column.
    <div
      ref={scrollerRef}
      data-stop
      className="jp-reveal flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{
        ["--jp-delay" as string]: "100ms",
        paddingInline: "max(20px, calc((100% - 1200px) / 2 + clamp(20px, 6vw, 96px)))",
      }}
    >
      {copies.flatMap((copy) =>
        photos.map((photo, i) => (
          <div
            key={`${copy}-${photo.src}`}
            data-copy={i === 0 ? copy : undefined}
            aria-hidden={copy === 1 || single ? undefined : true}
            className={`relative flex-none snap-start overflow-hidden rounded-lg bg-[#171B22] ${
              single
                ? "aspect-[4/3] w-full max-w-[1008px] sm:aspect-[21/9]"
                : "aspect-[4/3] w-[clamp(260px,42vw,560px)]"
            }`}
          >
            <Image
              src={photo.src}
              alt={copy === 1 || single ? photo.alt : ""}
              fill
              sizes={single ? "(min-width: 1200px) 1008px, 100vw" : "(min-width: 1334px) 560px, 42vw"}
              className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:scale-[1.03]"
            />
          </div>
        )),
      )}
    </div>
  );
}
