import type { Metadata } from "next";
import { ConsultationPage } from "@/components/landing/consultation-page";

export const metadata: Metadata = {
  title: "Free consultation",
  description: "Tell us about your facility and an engineer will call you within one business day.",
};

export default function Page() {
  return <ConsultationPage />;
}
