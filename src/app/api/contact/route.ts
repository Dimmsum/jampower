import { NextResponse } from "next/server";

type ContactPayload = Record<string, unknown>;

type Lead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  // Extra details collected by the consultation form; all optional.
  parish: string;
  facility: string;
  bill: string;
  interests: string;
  contactMethod: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function parseLead(body: ContactPayload): { lead?: Lead; error?: string } {
  const interests = Array.isArray(body.interests)
    ? body.interests.filter((i): i is string => typeof i === "string").join(", ")
    : body.interests;
  const lead: Lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 254),
    phone: clean(body.phone, 40),
    company: clean(body.company, 120),
    message: clean(body.message, 5000),
    parish: clean(body.parish, 60),
    facility: clean(body.facility, 80),
    bill: clean(body.bill, 40),
    interests: clean(interests, 400),
    contactMethod: clean(body.contactMethod, 40),
  };

  if (!lead.name) return { error: "Please add your name so we know who to ask for." };
  if (!lead.email && !lead.phone) return { error: "Add a phone number or email so we can reach you." };
  if (lead.email && !EMAIL_PATTERN.test(lead.email)) return { error: "That email address does not look right." };

  return { lead };
}

async function sendWithResend(lead: Lead): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "JAMPOWER Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL],
      ...(lead.email ? { reply_to: lead.email } : {}),
      subject: `New enquiry from ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      text: [
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Phone: ${lead.phone || "-"}`,
        `Company: ${lead.company || "-"}`,
        `Parish: ${lead.parish || "-"}`,
        `Facility: ${lead.facility || "-"}`,
        `Monthly bill: ${lead.bill || "-"}`,
        `Interested in: ${lead.interests || "-"}`,
        `Preferred contact: ${lead.contactMethod || "-"}`,
        "",
        lead.message || "(no message)",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend responded with ${response.status}: ${await response.text()}`);
  }
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { lead, error } = parseLead(body);
  if (!lead) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const configured = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);

  if (!configured) {
    if (process.env.NODE_ENV === "production") {
      console.error("Contact form submitted but RESEND_API_KEY / CONTACT_TO_EMAIL are not set.");
      return NextResponse.json(
        { error: "The contact form is temporarily unavailable. Please email us directly." },
        { status: 503 },
      );
    }
    // Development fallback: show the lead in the terminal instead of emailing it.
    console.info("[contact] (dev, email not configured)", lead);
    return NextResponse.json({ ok: true });
  }

  try {
    await sendWithResend(lead);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed to send email", err);
    return NextResponse.json(
      { error: "We could not send your message. Please try again later." },
      { status: 502 },
    );
  }
}
