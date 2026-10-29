# JAMPOWER Website

Marketing website for JAMPOWER, built with Next.js (App Router), React, TypeScript and Tailwind CSS.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional locally, required for live email
npm run dev                  # http://localhost:3000
```

## Scripts

| Command         | What it does                       |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the development server       |
| `npm run build` | Create a production build          |
| `npm start`     | Serve the production build         |
| `npm run lint`  | Run ESLint                         |

## Structure

```
src/
  app/
    layout.tsx              Root layout and metadata
    (landing)/              Marketing pages with the Jampower header, footer and chat widget
      page.tsx              Home
      about/page.tsx        About
      solutions/page.tsx    Solutions explorer
      consultation/page.tsx Free consultation form (/contact redirects here)
    (site)/                 Pages still on the original header and footer
      projects/page.tsx     Projects
      team/page.tsx         Team
    api/contact/route.ts    Consultation form endpoint (POST)
    not-found.tsx           404 page
  components/landing/       Landing pages and their shared header, footer and chat widget
  components/               Original header, footer and shared UI
  data/site.ts              All copy: contact details, solutions, projects, team, testimonials
public/images/              Images the site serves (the only images the app loads)
assets/                     Original source files, kept for reference
```

Most content lives in `src/data/site.ts`. Edit it to change the company details, services, projects or team. Entries marked `TODO` need confirmed information before launch.

## Consultation form

The form on `/consultation` posts to `/api/contact`, which validates the input and emails the enquiry through [Resend](https://resend.com).

Set these variables (see `.env.example`):

- `RESEND_API_KEY`: your Resend API key
- `CONTACT_TO_EMAIL`: the inbox that receives enquiries
- `CONTACT_FROM_EMAIL`: a sender on a domain verified in Resend (optional)

In development without these variables, submissions are printed to the terminal. In production the endpoint returns a 503 so no enquiry is silently lost.

## Deployment

The app deploys to any Node-compatible host. For Vercel, import the repository and add the environment variables above. Set `NEXT_PUBLIC_SITE_URL` to the live domain.
