import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
        <title>Calendar</title>
        <script dangerouslySetInnerHTML={{
          __html: `
            // GitHub Pages SPA redirect restoration
            // This restores the URL after being redirected from 404.html
            (function(){
              var redirect = new URLSearchParams(window.location.search).get('spa-redirect');
              if (redirect) {
                // Replace the URL with the original path without the redirect parameter
                history.replaceState(null, '', '/' + redirect);
              }
            })();
          `
        }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return <Outlet />
}
