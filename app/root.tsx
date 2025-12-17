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
                try {
                  // Decode the redirect parameter
                  var decodedPath = decodeURIComponent(redirect);
                  
                  // Validate that the path starts with / and doesn't contain dangerous patterns
                  if (decodedPath && !decodedPath.includes('://') && !decodedPath.includes('..')) {
                    var fullPath = '/' + decodedPath.replace(/^\\//, '');
                    
                    // Replace the URL with the original path without the redirect parameter
                    history.replaceState(null, '', fullPath);
                  }
                } catch (e) {
                  // If decoding fails, ignore the redirect parameter
                  console.error('Invalid redirect parameter');
                }
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
