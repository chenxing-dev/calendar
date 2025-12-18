/**
 * Parse an ISO date string in YYYY-MM-DD format and return a `Date` (UTC at
 * midnight) or `null` if input is null.
 */
export function parseISODate(raw: string | null): Date | null {
  if (raw === null) return null;

  const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoRegex.test(raw)) return null;

  const [yStr, mStr, dStr] = raw.split("-");
  const y = Number(yStr);
  const m = Number(mStr);
  const d = Number(dStr);
  const dt = new Date(`${raw}T00:00:00Z`);

  if (
    Number.isNaN(y) ||
    Number.isNaN(m) ||
    Number.isNaN(d) ||
    dt.getUTCFullYear() !== y ||
    dt.getUTCMonth() + 1 !== m ||
    dt.getUTCDate() !== d
  ) {
    return null;
  }

  return dt;
}
