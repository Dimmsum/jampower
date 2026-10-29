import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { team } from "@/data/site";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the people behind JAMPOWER.",
};

export default function TeamPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="People"
            title="Our team"
            description="The engineers, installers and project leads who deliver every JAMPOWER project."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {team.map((member) => (
            <li key={member.name} className="overflow-hidden rounded-xl border border-border">
              <div className="relative aspect-[3/4] bg-surface">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold">{member.name}</h2>
                <p className="text-sm text-muted">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="relative mt-20 aspect-[21/9] min-h-56 overflow-hidden rounded-2xl">
          <Image
            src="/images/team-aerial.png"
            alt="Aerial view of the JAMPOWER team on site"
            fill
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
      </section>
    </>
  );
}
