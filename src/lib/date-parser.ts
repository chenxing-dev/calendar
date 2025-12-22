import isBetween from "dayjs/plugin/isBetween";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(isBetween);

/**
 * Parse an input string into a UTC `Dayjs` set to the start of the
 * corresponding calendar day, or return `null` when parsing or validation
 * fails.
 *
 * Note: this function assumes the caller has already handled `null` or
 * whitespace-only input (e.g. via `isBlankInput`). It will still return
 * `null` for syntactically invalid values.
 */
export function parseDateString(raw: string): Dayjs | null {
  const parsed = dayjs.utc(raw);
  if (parsed.isValid()) return parsed.startOf("day");

  return null;
}

/**
 * Return an HTTP 400 `Response` describing an invalid date input.
 *
 * The response body is plain-text and includes the original raw value,
 * a brief explanation, and an example of an acceptable calendar date.
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
