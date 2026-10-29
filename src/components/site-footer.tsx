import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Image
            src="/images/logo-light.png"
            alt={site.name}
            width={186}
            height={100}
            className="h-16 w-auto"
          />
          <p className="max-w-xs text-sm text-white/70">{site.description}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            Explore
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/80 hover:text-sun">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            Contact
          </h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/80">
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-sun">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} className="hover:text-sun">
                {site.contact.phone}
              </a>
            </li>
            <li>{site.contact.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-white/50 sm:px-6">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
