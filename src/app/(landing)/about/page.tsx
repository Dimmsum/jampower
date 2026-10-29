import type { Metadata } from "next";
import { AboutPage } from "@/components/landing/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "A Jamaican-International team specialised in renewable energy and green construction for commercial and industrial projects.",
};

export default function Page() {
  return <AboutPage />;
}
