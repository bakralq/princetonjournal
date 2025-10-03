
# The Princeton Journal — Next.js Site

Modern, clean, and responsive news site inspired by NYT/DMN.
Includes a City Council Tracker with weekly votes.

## Quick Start

1. Ensure Node 18+ is installed.
2. Install dependencies:

```bash
npm i
```

3. Run in development:

```bash
npm run dev
```

4. Open http://localhost:3000

The database initializes automatically on first install at `data/princeton.db`.

## Posting Articles

- Visit `/admin/articles/new`
- Enter Title, Slug, and write content in Markdown.
- Article pages render with professional serif headlines and clean body text.
- Byline defaults to: **By Bakr Al Qaraghuli, Editor**

## City Council Tracker

- Go to `/admin/tracker`
- Add a "Week of" date and optional Agenda URL.
- Click "Manage" for that week to add agenda items and plain-English explanations.
- Set votes for Mayor and Places 1–7. Votes appear in the public `/tracker` view.
- The tracker has a horizontal, swipe-friendly weekly layout on mobile and search.

## Search

- Site-wide search at `/search` and the tracker search bar on `/tracker`.

## Branding

- Logo file at `public/logo.png`.
- Tailwind presets approximate NYT/DMN typography: serif headlines, sans body.
- Colors are classic black/white/gray.

## Deploy

- Recommended: **Vercel**.
- Add a build command: `npm run build`
- Start command: `npm start` (Vercel handles it automatically).
- No environment variables required for SQLite. Ensure `data/` is writable or switch to Postgres for serverless.

## Notes

- This demo admin is intentionally unsecured. Protect `/admin` with your auth of choice before going live.
- For Postgres, replace `better-sqlite3` with `pg` and adjust `lib/db.js` accordingly.

