"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { site } from "@/data/site";

export const phoneHref = `tel:${site.contact.phone.replace(/[^+\d]/g, "")}`;

export type PageKey = "home" | "about" | "solutions" | "projects" | "consultation";

const navLinks: { href: string; label: string; page?: PageKey }[] = [
  { href: "/", label: "Home", page: "home" },
  { href: "/solutions", label: "Solutions", page: "solutions" },
  { href: "/projects", label: "Projects", page: "projects" },
  { href: "/about", label: "About", page: "about" },
];

/**
 * Scroll-driven effects shared by the landing pages: solid header after 40px,
 * scroll-in reveals for [data-stop], and hero copy ([data-fade]) fading out as it
 * slides under the header. `extra` runs on the same frame for page-specific effects.
 */
export function useLandingScroll(
  rootRef: RefObject<HTMLElement | null>,
  navRef: RefObject<HTMLElement | null>,
  heroRef: RefObject<HTMLElement | null>,
  extra?: (y: number, vh: number) => void,
) {
  const extraRef = useRef(extra);
  useEffect(() => {
    extraRef.current = extra;
  });

  useEffect(() => {
    let raf = 0;

    const apply = () => {
      const y = Math.max(0, window.scrollY);
      const vh = window.innerHeight || 800;

      extraRef.current?.(y, vh);

      rootRef.current?.querySelectorAll<HTMLElement>("[data-stop]").forEach((el) => {
        const b = el.getBoundingClientRect();
        const on = b.top < vh * 0.9 && b.bottom > 0;
        el.style.opacity = on ? "1" : "0";
        el.style.transform = on ? "none" : "translateY(40px)";
      });

      const nav = navRef.current;
      if (!nav) return;
      const solid = y > 40;
      nav.style.background = solid ? "rgba(14,17,22,0.85)" : "transparent";
      nav.style.backdropFilter = solid ? "blur(14px)" : "none";
      nav.style.padding = solid ? "10px clamp(20px,4vw,56px)" : "16px clamp(20px,4vw,56px)";
      nav.style.boxShadow = solid ? "0 1px 0 rgba(255,255,255,0.08)" : "none";

      const navBottom = nav.getBoundingClientRect().bottom;
      heroRef.current?.querySelectorAll<HTMLElement>("[data-fade]").forEach((el) => {
        const top = el.getBoundingClientRect().top;
        el.style.opacity =
          y === 0 ? "1" : String(Math.max(0, Math.min(1, (top - navBottom - 24) / 90)));
      });
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        apply();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply);
    apply();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
      cancelAnimationFrame(raf);
    };
  }, [rootRef, navRef, heroRef]);
}

export function LandingHeader({
  current,
  navRef,
  entranceClass,
}: {
  current: PageKey;
  navRef: RefObject<HTMLElement | null>;
  /** Header entrance animation, timed per page against its hero animations. */
  entranceClass: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 ${entranceClass}`}>
        <nav
          ref={navRef}
          aria-label="Main"
          className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 bg-transparent px-[clamp(20px,4vw,56px)] py-4 [transition:background_300ms_ease,padding_300ms_ease,box-shadow_300ms_ease]"
        >
          <Link href="/" aria-label={`${site.name} home`} className="flex items-center justify-self-start">
            <Wordmark className="h-[22px]" priority />
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-white/14 bg-[rgba(18,20,26,0.5)] p-[5px] text-sm tracking-[0.01em] backdrop-blur-[14px] min-[820px]:flex">
            {navLinks.map((link) =>
              link.page === current ? (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current="page"
                  className="rounded-full bg-white px-[18px] py-2.5 font-bold text-jp-ink"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-[18px] py-2.5 font-semibold text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="inline-flex size-11 cursor-pointer items-center justify-center justify-self-end rounded-full border border-white/14 bg-[rgba(18,20,26,0.5)] p-0 text-white backdrop-blur-[14px] min-[820px]:hidden"
          >
            <Menu size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>

          {/* On the consultation page this pill dials; everywhere else it leads to the form. */}
          <Link
            href={current === "consultation" ? phoneHref : "/consultation"}
            aria-label={current === "consultation" ? `Call ${site.contact.phone}` : "Book a free consultation"}
            className={`inline-flex items-center gap-3 justify-self-end whitespace-nowrap rounded-full border py-[11px] pl-3.5 pr-3.5 text-sm font-bold transition-colors duration-200 min-[820px]:pr-5 ${
              current === "consultation"
                ? "border-white bg-white text-jp-ink"
                : "border-white/14 bg-[rgba(18,20,26,0.5)] text-white backdrop-blur-[14px] hover:border-white"
            }`}
          >
            <span className="inline-flex size-7 flex-none items-center justify-center rounded-full bg-jp-red text-white">
              <Phone size={13} strokeWidth={2.4} aria-hidden="true" />
            </span>
            <span className="hidden min-[820px]:inline">{site.contact.phone}</span>
          </Link>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-label="Menu">
          <div
            onClick={closeMenu}
            className="absolute inset-0 bg-jp-ink/60 backdrop-blur-[4px] animate-[jpFade_300ms_ease_both]"
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(84vw,360px)] flex-col border-l border-white/10 bg-jp-ink px-6 pb-8 pt-5 animate-[jpSlideIn_400ms_cubic-bezier(.2,.7,.2,1)_both]">
            <div className="flex items-center justify-between">
              <Wordmark className="h-[18px]" />
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-transparent p-0 text-white"
              >
                <X size={18} strokeWidth={2.2} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-12 flex flex-col">
              {navLinks.map((link, i) => {
                const active = link.page === current;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between border-t border-white/10 py-[18px] text-[26px] font-bold tracking-[-0.02em] hover:text-white ${
                      active ? "text-white" : "text-white/75"
                    } ${i === navLinks.length - 1 ? "border-b" : ""}`}
                  >
                    {link.label}
                    {active && <span className="size-2 rounded-full bg-jp-red" />}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto flex flex-col gap-3.5">
              {current === "consultation" ? (
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border-[1.5px] border-white/30 px-6 py-[15px] text-[15px] font-semibold text-white"
                >
                  Call {site.contact.phone}
                </a>
              ) : (
                <>
                  <Link
                    href="/consultation"
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-base font-bold text-jp-ink"
                  >
                    Free consultation
                  </Link>
                  <Link
                    href="/consultation"
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center gap-2.5 rounded-full border-[1.5px] border-white/30 px-6 py-[15px] text-[15px] font-semibold text-white"
                  >
                    {site.contact.phone}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function LandingFooter() {
  return (
    <footer className="relative overflow-hidden bg-jp-ink px-[clamp(20px,6vw,96px)] pb-8 pt-[clamp(80px,10vw,140px)] text-white">
      <div className="mx-auto max-w-[1200px]">
        <div data-stop className="jp-reveal flex flex-col items-center text-center">
          <h2 className="m-0 max-w-[14ch] text-[clamp(40px,6vw,96px)] font-bold leading-[0.98] tracking-[-0.04em] text-balance">
            Power your business. <span className="font-normal text-jp-cream">Power your future.</span>
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <PrimaryCta href="/consultation" label="Free consultation" />
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/30 px-[26px] py-[17px] text-base font-semibold text-white transition-colors duration-200 hover:border-white"
            >
              {site.contact.phone}
            </Link>
          </div>
        </div>

        <div className="mt-[clamp(80px,10vw,140px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] items-start gap-x-12 gap-y-8 border-t border-white/12 pt-8">
          <div className="flex flex-col gap-4">
            <Wordmark className="h-5 self-start" />
            <p className="m-0 max-w-[30ch] text-sm leading-[1.6] text-white/60">
              Energy and construction solutions engineered for Caribbean sun, storms and budgets.
            </p>
          </div>
          <FooterColumn title="Explore">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white hover:text-jp-red">
                {link.label}
              </Link>
            ))}
          </FooterColumn>
          <FooterColumn title="Contact">
            <a href={phoneHref} className="text-white hover:text-jp-red">
              {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="text-white hover:text-jp-red">
              {site.contact.email}
            </a>
            <span className="font-medium text-white/60">{site.contact.location}</span>
          </FooterColumn>
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">Follow</span>
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 text-white [transition:background_200ms_ease,border-color_200ms_ease] hover:border-jp-red hover:bg-jp-red"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3 text-xs text-white/45">
          <span>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>Engineered in Jamaica</span>
        </div>
      </div>
    </footer>
  );
}

export function PrimaryCta({
  href,
  label,
  shadow = true,
}: {
  href: string;
  label: string;
  shadow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3.5 rounded-full bg-white py-2 pl-[26px] pr-2 text-base font-bold text-jp-ink [transition:transform_200ms_ease,box-shadow_200ms_ease] hover:-translate-y-0.5 ${
        shadow
          ? "shadow-[0_12px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
          : ""
      }`}
    >
      {label}
      <span className="inline-flex size-10 items-center justify-center rounded-full bg-jp-red text-white">
        <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden="true" />
      </span>
    </Link>
  );
}

export function Eyebrow({
  children,
  tone,
  centered = false,
}: {
  children: React.ReactNode;
  tone: "dark" | "light";
  centered?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3.5 text-xs font-bold uppercase tracking-[0.2em] ${
        tone === "dark" ? "text-white/70" : "text-jp-ink/55"
      }`}
    >
      <span className="h-px w-7 bg-jp-red" />
      {children}
      {centered && <span className="h-px w-7 bg-jp-red" />}
    </div>
  );
}

export function Wordmark({ className, priority = false }: { className: string; priority?: boolean }) {
  return (
    <Image
      src="/images/landing/wordmark-white.png"
      alt={site.name}
      width={2053}
      height={211}
      priority={priority}
      className={`block w-auto ${className}`}
    />
  );
}

/** Slim footer for focused pages (the consultation form). */
export function CompactFooter() {
  return (
    <footer className="bg-jp-ink px-[clamp(20px,6vw,96px)] py-8 text-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-white/12 pt-8">
        <Wordmark className="h-[18px]" />
        <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm font-semibold">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-white/75 hover:text-jp-red">
              {link.label}
            </Link>
          ))}
        </nav>
        <span className="text-xs text-white/45">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

const chatShortcuts = [
  { href: "/consultation", label: "Book a consultation" },
  { href: "/solutions", label: "What do you offer?" },
  { href: "/projects", label: "Show me past projects" },
];

/**
 * Floating chat launcher. There is no live chat backend yet, so a typed message
 * carries over into the consultation form instead of going nowhere.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    setOpen(false);
    setMessage("");
    router.push(`/consultation?message=${encodeURIComponent(text)}`);
  };

  return (
    <div className="fixed bottom-[clamp(16px,2.5vw,32px)] right-[clamp(16px,2.5vw,32px)] z-[100] flex flex-col items-end gap-3 font-manrope">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Jampower"
          className="w-[min(92vw,340px)] overflow-hidden rounded-[14px] bg-jp-cream text-jp-ink shadow-[0_30px_80px_rgba(0,0,0,0.5)] animate-[jpUp_400ms_cubic-bezier(.2,.7,.2,1)_both]"
        >
          <div className="flex items-center gap-3 bg-jp-ink px-4 py-3.5 text-white">
            <span className="inline-flex size-9 flex-none items-center justify-center rounded-full bg-jp-red text-[13px] font-extrabold">
              JP
            </span>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-sm font-bold">Jampower assistant</span>
              <span className="flex items-center gap-1.5 text-xs text-white/60">
                <span className="size-[7px] rounded-full bg-[#3FBF6A]" />
                Typically replies in minutes
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="ml-auto inline-flex size-8 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-transparent p-0 text-white"
            >
              <X size={14} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-col gap-3 p-4">
            <p className="max-w-[85%] self-start rounded-[12px_12px_12px_4px] bg-white px-3.5 py-3 text-sm leading-normal text-pretty">
              Hi there. Looking at solar, EV charging or a new build? Tell me a bit about your site
              and I&apos;ll point you in the right direction.
            </p>
            <div className="flex flex-wrap gap-2">
              {chatShortcuts.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-jp-ink/25 px-3.5 py-2 text-[13px] font-semibold text-jp-ink [transition:background_200ms_ease,color_200ms_ease] hover:bg-jp-ink hover:text-white"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
          <form onSubmit={send} className="flex items-center gap-2 border-t border-jp-ink/12 bg-white py-2.5 pl-4 pr-2.5">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              aria-label="Message"
              className="min-w-0 flex-1 border-0 bg-transparent py-2 font-[inherit] text-sm text-jp-ink outline-none"
            />
            <button
              type="submit"
              aria-label="Send"
              className="inline-flex size-9 flex-none cursor-pointer items-center justify-center rounded-full border-0 bg-jp-red p-0 text-white"
            >
              <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Chat with us"}
        aria-expanded={open}
        className="inline-flex size-14 cursor-pointer items-center justify-center rounded-full border-0 bg-jp-red p-0 text-white shadow-[0_14px_36px_rgba(227,38,43,0.4)] transition-transform duration-200 hover:-translate-y-0.5"
      >
        {open ? (
          <ChevronDown size={20} strokeWidth={2.4} aria-hidden="true" />
        ) : (
          <MessageCircle size={24} strokeWidth={2.2} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 text-[15px] font-semibold">
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">{title}</span>
      {children}
    </div>
  );
}

// Lucide no longer ships brand marks, so the social icons stay inline.
const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.5 8.5H3.3V21h3.2V8.5zM4.9 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM21 21v-6.9c0-3.4-.7-6-4.7-6-1.9 0-3.2 1-3.7 2h-.1V8.5h-3V21h3.2v-6.2c0-1.6.3-3.2 2.3-3.2s2 1.9 2 3.3V21H21z" />
      </svg>
    ),
  },
];
