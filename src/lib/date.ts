import { parseISO, parse, isValid } from "date-fns";

const FALLBACK_FORMATS = [
  "yyyy-MM-dd", // 2023-12-31
  "MM/dd/yyyy", // 12/31/2023
  "M/d/yyyy", // 1/1/2023
];

/**
 * Parse a date string using a tolerant set of formats and return a `Date`
 * representing UTC midnight for that calendar day, or `null` if parsing
 * failed. This accepts multiple common date shapes (ISO, slashes, month names,
 * etc.)—use the loader to decide how to surface errors to users.
 */
export function parseDateString(raw: string | null): Date | null {
  if (raw === null) return null;

  const s = raw.trim();
  if (s === "") return null;

  // Try ISO first (covers strict ISO variants)
  try {
    const iso = parseISO(s);
    if (isValid(iso)) {
      return new Date(
        Date.UTC(iso.getFullYear(), iso.getMonth(), iso.getDate())
      );
    }
  } catch {
    // fall through to other formats
  }

  // Try a set of common formats
  for (const fmt of FALLBACK_FORMATS) {
    const p = parse(s, fmt, new Date());
    if (isValid(p)) {
      return new Date(Date.UTC(p.getFullYear(), p.getMonth(), p.getDate()));
    }
  }

  return null;
}

/**
 * Create a standardized HTTP `Response` for invalid date input.
 */
export function invalidDateResponse(raw: string | null): Response {
  const message = [
    `Invalid date: "${raw}".`,
    "The provided value is not a valid date.",
    "Please provide a reasonable calendar date (for example: 2025-12-18).",
  ].join("\n");

  return new Response(message, {
    status: 400,
    statusText: "Invalid date",
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
