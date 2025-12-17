# Calendar SPA - React Router v7 Framework Mode

## Question: Can I use Framework Mode with Hash Routing for GitHub Pages?

**Short Answer:** No, React Router v7 Framework Mode does not support hash routing.

**Long Answer:** Framework Mode uses `HydratedRouter` which is designed exclusively for browser history routing. Hash routing (`#/path`) is only available in Library Mode using `createHashRouter`. However, this project implements a **working solution for GitHub Pages using Framework Mode with browser history routing**.

## The Solution: Browser History + 404 Redirect

This implementation uses React Router v7 Framework Mode with a GitHub Pages-compatible routing solution:

1. **Framework Mode** with file-based routing (`app/routes/`)
2. **Browser history** routing (clean URLs like `/2025-12-17`)
3. **404.html redirect workaround** for GitHub Pages compatibility
4. **URL restoration** script in root layout

### How It Works

When a user visits `/2025-12-17` on GitHub Pages:

1. GitHub Pages returns `404.html` (since the file doesn't exist)
2. The 404.html script redirects to `/?spa-redirect=2025-12-17`
3. The root layout script restores the clean URL `/2025-12-17`
4. React Router navigates to the correct route

The result: Clean URLs that work on GitHub Pages, just like hash routing would, but without the `#`.

## Project Structure

```
app/
├── entry.client.tsx      # Client hydration
├── entry.server.tsx      # Server rendering (build-time only)
├── root.tsx              # Root layout with URL restoration
├── routes.ts             # Route configuration
└── routes/
    ├── _index.tsx        # Home page (/)
    └── $date.tsx         # Date pages (/:date)

public/
└── 404.html              # GitHub Pages SPA redirect

react-router.config.ts    # Framework Mode configuration
vite.config.ts            # Vite + React Router plugin
```

## Features

✅ React Router v7 Framework Mode  
✅ File-based routing  
✅ Dynamic date routes (`/2025-12-17`)  
✅ GitHub Pages compatible  
✅ Clean URLs (no hash)  
✅ SPA mode with prerendering  
✅ Type-safe routes  

❌ Hash routing (not possible with Framework Mode)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploying to GitHub Pages

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy `build/client/` directory:**
   - The `build/client/` directory contains all static files
   - Upload to your `gh-pages` branch or configure GitHub Actions

3. **Configure repository name (if not root domain):**
   If deploying to `username.github.io/calendar`, update `vite.config.ts`:
   ```ts
   export default defineConfig({
     plugins: [reactRouter()],
     base: '/calendar/',  // Add your repo name
   })
   ```

4. **The 404.html is included:**
   The `public/404.html` file is automatically copied to the build output.

## Comparison: Framework Mode vs Hash Routing

| Feature | Framework Mode (This Project) | Hash Routing (Library Mode) |
|---------|-------------------------------|------------------------------|
| URLs | `/2025-12-17` | `/#/2025-12-17` |
| GitHub Pages | ✅ (with 404 redirect) | ✅ (native support) |
| File-based routing | ✅ | ❌ |
| Code splitting | ✅ Automatic | ⚠️ Manual |
| Type safety | ✅ | ⚠️ Limited |
| Prerendering | ✅ | ❌ |
| SEO | ✅ Better | ⚠️ Limited |

## Why Framework Mode?

Framework Mode provides:

- **File-based routing** - Routes defined by file structure
- **Automatic code splitting** - Better performance
- **Type-safe routes** - Auto-generated types for route params
- **Prerendering** - Static HTML generation for faster initial loads
- **Better DX** - Meta tags, loaders, actions per route

## Alternative: True Hash Routing

If you absolutely need hash URLs (`#/path`), you must switch to Library Mode:

1. Remove Framework Mode setup (app directory, react-router.config.ts)
2. Create routes programmatically in `src/main.tsx`
3. Use `createHashRouter` from `react-router`

See `FRAMEWORK_MODE_NOTES.md` for detailed comparison and migration guide.

## Conclusion

**Framework Mode is the recommended approach** for modern React applications, including GitHub Pages deployments. The 404 redirect solution provides all the benefits of Framework Mode while maintaining GitHub Pages compatibility.

Hash routing is legacy technology maintained for backwards compatibility. Framework Mode with browser history + 404 redirect is the modern, recommended solution.

