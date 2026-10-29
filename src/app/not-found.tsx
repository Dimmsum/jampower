import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="mx-auto flex max-w-2xl flex-col items-start gap-4 px-4 py-32 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">404</p>
          <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
          <p className="text-muted">The page you are looking for does not exist or has moved.</p>
          <Link
            href="/"
            className="mt-4 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-hover"
          >
            Back to home
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
