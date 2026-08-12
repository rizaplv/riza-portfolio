# Muhammad Riza Pahlevie — Portfolio

Full-stack visual designer portfolio: from pixels to 3D, based in Tangerang Selatan, Indonesia.

🌐 **Live:** [rizaplv.vercel.app](https://rizaplv.vercel.app)

## Features

- **Animated hero** — rotating specialty text (`TextLoop`) with smooth, layout-shift-free transitions
- **Admin CMS** — password-protected dashboard to manage projects (create / edit / delete) with image uploads
- **Non-cropping gallery** — images render at natural aspect ratio, never cropped
- **Dark mode** — `.dark` class toggle persisted in `localStorage`, default light
- **Freelance / Full-time availability** — live status component in the hero
- **Contact form** — server-action backed API route

## Tech Stack

Next.js 16 (App Router, Turbopack) · Tailwind CSS v4 · Framer Motion · Prisma + PostgreSQL (Neon) · Supabase Storage · Vercel

## Local Development

```bash
npm install
cp .env.example .env   # fill DATABASE_URL + Supabase vars
npm run dev           # http://localhost:3000
```

## More Docs

- [DEPLOY.md](./DEPLOY.md) — deployment & environment setup
- [PROGRESS.md](./PROGRESS.md) — build progress log
- [PROJECT_TIMELINE.md](./PROJECT_TIMELINE.md) — project timeline
