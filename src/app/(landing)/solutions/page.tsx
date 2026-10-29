import type { Metadata } from "next";
import { SolutionsPage } from "@/components/landing/solutions-page";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Solar, green buildings, EV charging, wind, telecom, energy efficiency, industrial construction and consulting across the Caribbean.",
};

export default function Page() {
  return <SolutionsPage />;
}
