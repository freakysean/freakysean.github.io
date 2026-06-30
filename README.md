# Social Profile Template

A small Astro template for a personal social profile page.

## Edit Your Content

Most content lives in:

```text
src/data/profile.ts
```

Change your name, intro, social links, current focus, and featured links there.

The hero image is:

```text
public/profile-hero.png
```

Replace it with your own image and keep the same filename, or update `heroImage` in `src/data/profile.ts`.

## Run Locally

After system Node.js and npm are installed:

```bash
npm install
npm run dev
```

Build the static site:

```bash
npm run build
```

## Live Widgets

The Intro tab includes an optional Discord profile widget. It needs a serverless function because the Discord bot token must stay private.

Set these environment variables on your deploy host:

```text
DISCORD_BOT_TOKEN
DISCORD_USER_ID
```

The included function paths are:

```text
/.netlify/functions/discord-profile
```

## Main Files

- `src/pages/index.astro`: page assembly
- `src/data/profile.ts`: editable profile content
- `src/components/`: reusable page sections
- `src/styles/global.css`: visual design
- `public/`: static assets
# freakysean.github.io
