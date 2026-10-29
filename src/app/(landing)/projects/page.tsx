import type { Metadata } from "next";
import { ProjectsPage } from "@/components/landing/projects-page";

export const metadata: Metadata = {
  title: "Projects",
  description: "Commercial and industrial solar projects delivered by JAMPOWER across Jamaica.",
};

export default function Page() {
  return <ProjectsPage />;
}
