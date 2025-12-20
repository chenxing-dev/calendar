import { getDate, getMonth, getYear, format } from "date-fns";
import type { UTCDate } from "@date-fns/utc";
import { zhCN, enUS } from "date-fns/locale";
import { SolarDay } from "tyme4ts";

import { formatCanonicalDate } from "./date";

export type SolarData = {
  canonical: string; // 2025-12-14
  year: number; // 2025
  month: number; // 12
  day: number; // 14
  weekdayZh: string; // e.g. "星期六"
  weekdayEn: string; // e.g. "Saturday"
};

export type LunarData = {
  yearGanzhi: string; // e.g. "乙巳"
  monthName: string; // e.g. "冬月"
  dayName: string; // e.g. "廿三"
};

export type SolarTermData = {
  termName: string; // e.g. "大雪"
  daysSinceTerm: number; // e.g. 7
  isTermDay: boolean; // e.g. false
};

export type CalendarData = {
  solar: SolarData;
  lunar: LunarData;
  solarTerm: SolarTermData;
};

/**
 * Build the `CalendarData` for a given UTC date.
 * @param date - A `UTCDate` representing the calendar day.
 * @returns The assembled `CalendarData` for that day.
 */
export function getCalendarData(date: UTCDate): CalendarData {
  const year = getYear(date);
  const month = getMonth(date) + 1; // getMonth() returns 0-based months (0-11); convert to 1-based (1-12) for calendar display
  const day = getDate(date);
  const canonical = formatCanonicalDate(date);
  const solarDay = SolarDay.fromYmd(year, month, day);

  const termDay = solarDay.getTermDay();
  const termName = termDay.getName();
  const daysSinceTerm = termDay.getDayIndex();
  const isTermDay = daysSinceTerm === 0;

  const lunar = solarDay.getLunarDay();
  const lunarMonth = lunar.getLunarMonth();

  return {
    solar: {
      canonical,
      year,
      month,
      day,
      weekdayZh: format(date, "EEEE", { locale: zhCN }),
      weekdayEn: format(date, "EEEE", { locale: enUS }),
    },
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
