import { parseISO, parse, isValid, format } from "date-fns";
import { UTCDate, utc } from "@date-fns/utc";

const FALLBACK_FORMATS = [
  "yyyy-MM-dd", // 2023-1-1
  "MM-dd-yyyy", // 01-02-2023
  "M-d-yyyy", // 1-2-2023
];

/**
 * Parse a date string using a tolerant set of formats and return a `Date`
 * representing UTC midnight for that calendar day, or `null` if parsing
 * failed. This accepts multiple common date shapes.
 */
export function parseDateString(raw: string | null): UTCDate | null {
  if (raw === null) return null;

  const s = raw.trim();
  if (s === "") return null;

  // Try ISO first (covers strict ISO variants)
  try {
    const iso = parseISO(s, { in: utc });
    if (isValid(iso)) {
      return new UTCDate(
        iso.getUTCFullYear(),
        iso.getUTCMonth(),
        iso.getUTCDate()
      );
    }
  } catch {
    // fall through to other formats
  }

  // Try a set of common formats
  for (const fmt of FALLBACK_FORMATS) {
    const p = parse(s, fmt, new UTCDate(), { in: utc });
    if (isValid(p)) {
      return new UTCDate(p.getUTCFullYear(), p.getUTCMonth(), p.getUTCDate());
    }
  }

  return null;
}

/**
 * Format a `Date` representing a calendar day into
 * the canonical URL shape: YYYY-MM-DD.
 */
export function formatCanonicalDate(date: UTCDate): string {
  // `UTCDate` makes date-fns operate in UTC.
  return format(date, "yyyy-MM-dd");
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
