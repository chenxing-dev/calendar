# 日历 | Calendar

![Calendar view](public/og.png)

极简风中文日历应用，显示每日阳历、农历、节气、节日与“历史上的今天”。

Built with React, React Router, Vite, Tailwind CSS, and Day.js.

## Features

- Daily view with both Gregorian and lunar dates
- Solar terms, traditional festivals, and holiday indicators
- "On This Day" historical events for each date
- Minimal, mobile-friendly UI with Chinese pixel font

## Prerequisites

- Node.js (recommended >= 20)
- pnpm (preferred) — you can also use npm or yarn but commands below use `pnpm`

## Local development

1. Install dependencies:

```bash
pnpm install
```

2. Start the dev server:

```bash
pnpm dev
```

Open the URL printed by Vite (typically `http://localhost:5173/calendar/`). The app uses hash routing; example route: `/#/2025-12-13`.

## Scripts

- `pnpm dev` — Run development server
- `pnpm build` — Build for production
- `pnpm preview` — Preview production build
- `pnpm run format` — Format code with Prettier
- `pnpm run lint` — Run linter
- `pnpm test` — Run unit tests (Vitest)

## Deployment

The project is configured for GitHub Pages (`vite` base set to `/calendar/`). Manual deploy:

```bash
pnpm deploy
```

`pnpm deploy` is configured to publish `dist/` to the `gh-pages` branch.

## Contributing

Contributions are welcome. To propose changes:

1. Fork the repository and create a feature branch: `git checkout -b feat/your-feature`
2. Open a pull request against `main` with a clear description of changes

## License

This repository is licensed under the MIT License. See [LICENSE.md](./LICENSE.md) for details.

---

Thanks for checking out the project.
