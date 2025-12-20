import { parseISO, parse, isValid, startOfDay } from "date-fns";
import { UTCDate, utc } from "@date-fns/utc";

const MIN_YEAR = 1;
const MAX_YEAR = 9999;

function isYearInRange(year: number): boolean {
  return year >= MIN_YEAR && year <= MAX_YEAR;
}

/**
 * Return true if the parsed date is valid and its year is in range.
 */
function isValidDate(d: Date | UTCDate): boolean {
  return isValid(d) && isYearInRange(d.getUTCFullYear());
}

// Accepted non-ISO date shapes we parse from URLs/input
const ACCEPTED_DATE_FORMATS = [
  "yyyy-M-d", // 2023-1-2, 2023-01-02
  "M-d-yyyy", // 1-2-2023, 01-02-2023
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
    if (isValidDate(iso)) return startOfDay(iso, { in: utc });
  } catch {
    // fall through to other formats
  }

  // Try a set of common formats
  for (const fmt of ACCEPTED_DATE_FORMATS) {
    const p = parse(s, fmt, new UTCDate(), { in: utc });
    if (isValidDate(p)) return p;
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
