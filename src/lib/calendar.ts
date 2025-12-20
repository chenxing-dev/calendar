import { getDate, getMonth, getYear, format } from "date-fns";
import type { UTCDate } from "@date-fns/utc";
import { zhCN, enUS } from "date-fns/locale";
import { SolarDay } from "tyme4ts";

/**
 * `SolarData` is a normalized snapshot of the Gregorian (solar) calendar
 * components for a single day.
 *
 * - `year`: four-digit Gregorian year (e.g. 2025)
 * - `month`: 1-based Gregorian month (1–12)
 * - `day`: day of the month (1–31)
 * - `weekdayZh`: localized weekday name in Simplified Chinese (e.g. "星期六")
 * - `weekdayEn`: localized weekday name in English (e.g. "Saturday")
 */
export interface SolarData {
  year: number;
  month: number;
  day: number;
  weekdayZh: string;
  weekdayEn: string;
}

/**
 * `LunarData` is a normalized snapshot of the lunar calendar
 * components for a single day.
 *
 * - `yearGanzhi`: the year's name in the sexagenary (60-year) cycle (e.g. "甲子")
 * - `monthName`: the lunar month's display name (e.g. "正月", "闰四月")
 * - `dayName`: the lunar day's display name (e.g. "初一", "十五")
 */
export interface LunarData {
  yearGanzhi: string;
  monthName: string;
  dayName: string;
}

/**
 * `SolarTermData` describes the solar-term (节气) information for a single day.
 *
 * - `termName`: name of the nearest solar term (e.g. "冬至")
 * - `daysSinceTerm`: number of days since that term (0 if the date is the term day)
 * - `isTermDay`: true when the date is exactly the solar term day
 */
export interface SolarTermData {
  termName: string;
  daysSinceTerm: number;
  isTermDay: boolean;
}

export interface CalendarData {
  canonical: string;
  solar: SolarData;
  lunar: LunarData;
  solarTerm: SolarTermData;
}

/** Build the `SolarData` for a given UTC date. */
export function getSolarData(date: UTCDate, year: number, month: number, day: number): SolarData {
  return {
    year,
    month,
    day,
    weekdayZh: format(date, "EEEE", { locale: zhCN }),
    weekdayEn: format(date, "EEEE", { locale: enUS }),
  };
}

/**
 * Build the `LunarData` for a given `SolarDay`.
 *
 * This function expects a precomputed `SolarDay` (from `tyme4ts`) and
 * returns the lunar calendar snapshot for that day.
 *
 * @param solarDay - precomputed `SolarDay` for the target date
 * @returns `LunarData
 */
export function getLunarData(solarDay: SolarDay): LunarData {
  const lunar = solarDay.getLunarDay();
  const lunarMonth = lunar.getLunarMonth();

  return {
    yearGanzhi: lunar.getYearSixtyCycle().toString(),
    monthName: lunarMonth.getName(),
    dayName: lunar.getName(),
  };
}

/**
 * Build the `SolarTermData` for a given `SolarDay`.
 *
 * Accepts a precomputed `SolarDay` and returns information about the
 * nearest solar term for that day.
 *
 * @param solarDay - precomputed `SolarDay` for the target date
 * @returns `SolarTermData`
 */
export function getSolarTermData(solarDay: SolarDay): SolarTermData {
  const termDay = solarDay.getTermDay();

  const termName = termDay.getName();
  const daysSinceTerm = termDay.getDayIndex();
  const isTermDay = daysSinceTerm === 0;

  return { termName, daysSinceTerm, isTermDay };
}

/**
 * Build the `CalendarData` for a given UTC date.
 * @param date - A `UTCDate` representing the calendar day.
 * @returns The assembled `CalendarData` for that day.
 */
export function getCalendarData(date: UTCDate): CalendarData {
  const canonical = format(date, "yyyy-MM-dd");
  const year = getYear(date);
  const month = getMonth(date) + 1; // convert to 1-based
  const day = getDate(date);
  const solarDay = SolarDay.fromYmd(year, month, day);
  const solar = getSolarData(date, year, month, day);
  const lunar = getLunarData(solarDay);
  const solarTerm = getSolarTermData(solarDay);

  return {
    canonical,
    solar,
    lunar,
    solarTerm,
  };
}
