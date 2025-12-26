# 日历 | Calendar

极简风中文日历应用，显示每日阳历、农历、节气、节日与“历史上的今天”。

A minimalist Chinese calendar, with solar and lunar date, solar term, festivals/holidays, and historical events for each day.

Built with React, React Router, Vite, Tailwind, and Day.js.

## Prerequisites

- Node.js (recommended >= 18)
- pnpm (or use npm/yarn but commands below use `pnpm`)

## Local development

Install dependencies and run the dev server:

```bash
pnpm install
pnpm dev
```

Open http://localhost:5173/calendar/ (or the URL printed by Vite). The project uses hash routing; example route: `/#/2025-12-13`.

Useful commands:

```bash
pnpm run format   # format code with Prettier
pnpm run lint     # lint the project
pnpm run test     # run unit tests (Vitest)
pnpm build        # build for production
pnpm preview      # preview the production build (runs vite preview)
```

## Deploy to GitHub Pages

This repository is configured for GitHub Pages with `vite` `base` set to `/calendar/`.

Manual deploy:

```bash
pnpm deploy # publish the contents of `dist/` to the `gh-pages` branch
```
