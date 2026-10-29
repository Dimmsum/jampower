import { Manrope } from "next/font/google";

const manrope = Manrope({
  variable: "--font-manrope-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <div className={manrope.variable}>{children}</div>;
}
