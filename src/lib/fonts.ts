import { Noto_Serif_SC } from "next-font/google";

/**
 * Centralized app font configuration.
 *
 * Apply with `className={noto.className}`.
 */
export const noto = Noto_Serif_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
});
