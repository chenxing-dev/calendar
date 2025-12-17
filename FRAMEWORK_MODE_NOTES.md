# Calendar App with React Router v7 Framework Mode

This project demonstrates React Router v7 in **Framework Mode** with file-based routing.

## Important Note About Hash Routing and Framework Mode

After thorough investigation, **React Router v7 Framework Mode does not support hash routing** when using `HydratedRouter`. The Framework mode is designed to work with browser history routing.

### Why Hash Routing Isn't Available in Framework Mode

Framework Mode uses `HydratedRouter`, which is built for server-side rendering and browser history. Hash routing (`#/path`) is only available in:
- **Library Mode** using `createHashRouter` from `react-router`
- **Declarative Mode** using `<HashRouter>` from `react-router-dom`

### Solutions for GitHub Pages Deployment

Since GitHub Pages is a static host that doesn't support server-side routing, here are the recommended approaches:

#### Option 1: Use Browser History with 404 Redirect (Recommended for Framework Mode)

Framework Mode with browser history can work on GitHub Pages using a 404.html redirect trick:

1. Create a `public/404.html` that redirects to `index.html` with the path as a parameter
2. Update `index.html` to read the parameter and restore the correct path
3. Configure `basename` in `vite.config.ts` if deploying to a subdirectory

**Pros:**
- Keeps Framework Mode features (file-based routing, SSG, type safety)
- Clean URLs without hash (`/2025-12-17` instead of `/#/2025-12-17`)
- Better SEO

**Cons:**
- Requires the 404 redirect workaround
- URL changes during redirect (briefly shows `/?redirect=...`)

#### Option 2: Switch to Library Mode with Hash Routing

If hash URLs are absolutely required, you must switch from Framework Mode to Library Mode:

1. Remove Framework Mode setup (app directory, react-router.config.ts)
2. Use `createHashRouter` manually in `src/main.tsx`
3. Define routes programmatically instead of file-based

**Pros:**
- True hash routing (`/#/2025-12-17`)
- No redirect workarounds needed

**Cons:**
- Loses Framework Mode benefits (file-based routing, automatic code splitting)
- More manual configuration
- No SSG/prerendering

## Current Implementation

This project is currently set up with **Framework Mode** using browser history routing. It includes:

- ✅ File-based routing in `app/routes/`
- ✅ Dynamic date pages (`/2025-12-17`)
- ✅ SPA mode with prerendering
- ✅ Type-safe route modules
- ❌ Hash routing (not compatible with Framework Mode)

## Project Structure

```
app/
├── entry.client.tsx      # Client-side hydration
├── entry.server.tsx      # Server-side rendering (for build only in SPA mode)
├── root.tsx              # Root layout
├── routes.ts             # Route configuration
└── routes/
    ├── _index.tsx        # Home page (/)
    └── $date.tsx         # Dynamic date pages (/:date)
```

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Deploying to GitHub Pages

If using the current Framework Mode setup:

1. Build the project: `npm run build`
2. Deploy the `build/client` directory to GitHub Pages
3. Add a `public/404.html` file for the redirect workaround (see Option 1 above)
4. Configure `basename` if deploying to a subdirectory

## Conclusion

**Framework Mode does not support hash routing.** If you need hash URLs (`#/path`) for GitHub Pages, you must use Library Mode with `createHashRouter`. If you prefer to keep Framework Mode's benefits, use browser history with the 404 redirect workaround for GitHub Pages deployment.
