import localFont from "next-font/local";

/**
 * Centralized app font configuration.
 */
export const zpix = localFont({
  src: "../public/fonts/zpix.woff2",
  fallback: ["monospace"],
});
