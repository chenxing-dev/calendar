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

export interface LunarData {
  yearGanzhi: string;
  monthName: string;
  dayName: string;
}

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
export function getSolarData(date: UTCDate): SolarData {
  const year = getYear(date);
  const month = getMonth(date) + 1; // convert to 1-based
  const day = getDate(date);

  return {
    year,
    month,
    day,
    weekdayZh: format(date, "EEEE", { locale: zhCN }),
    weekdayEn: format(date, "EEEE", { locale: enUS }),
  };
}

/**
 * Build the `CalendarData` for a given UTC date.
 * @param date - A `UTCDate` representing the calendar day.
 * @returns The assembled `CalendarData` for that day.
 */
export function getCalendarData(date: UTCDate): CalendarData {
  const solar = getSolarData(date);
  const canonical = format(date, "yyyy-MM-dd");
  const solarDay = SolarDay.fromYmd(solar.year, solar.month, solar.day);

  const termDay = solarDay.getTermDay();
  const termName = termDay.getName();
  const daysSinceTerm = termDay.getDayIndex();
  const isTermDay = daysSinceTerm === 0;

  const lunar = solarDay.getLunarDay();
  const lunarMonth = lunar.getLunarMonth();

  return {
    canonical,
    solar,
    lunar: {
      yearGanzhi: lunar.getYearSixtyCycle().toString(),
      monthName: lunarMonth.getName(),
      dayName: lunar.getName(),
    },
    solarTerm: {
      termName,
      daysSinceTerm,
      isTermDay,
    },
  };
}
