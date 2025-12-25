import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/zh-cn";
import { type ObservancesData, getObservancesData } from "./observances.js";
import { type OnThisDayEvent, getOnThisDayEvents } from "./on-this-day.js";

dayjs.extend(utc);

export interface CalendarCoverData {
  year: number;
}

export function getCalendarCoverData(): CalendarCoverData {
  return { year: dayjs.utc().year() };
}

/**
 * `SolarData` 表示某一天的阳历（公历）标准化快照。
 *
 * 字段说明：
 * - `year`：四位公历年（例如 2025）
 * - `month`：月（1–12）
 * - `day`：日（1–31）
 * - `monthNameZh`：中文月份名称（例如 "十二月"）
 * - `monthNameEn`：英文月份名称（例如 "December"）
 * - `weekdayZh`：中文星期名称（例如 "星期六"）
 * - `weekdayEn`：英文星期名称（例如 "Saturday"）
 */
export interface SolarData {
  year: number;
  month: number;
  day: number;
  monthNameZh: string;
  monthNameEn: string;
  weekdayZh: string;
  weekdayEn: string;
}

/**
 * `LunarData` 表示某一天的农历（阴历）标准化快照。
 *
 * 字段说明：
 * - `year`：干支纪年表示（例如 "甲子"）
 * - `month`：农历月份显示名（例如 "正月"、"闰四月"）
 * - `day`：农历日的显示名（例如 "初一"、"十五"）
 */
export interface LunarData {
  year: string;
  season: string;
  month: string;
  day: string;
}

/**
 * `SolarTermData` 描述某一天的节气信息。
 *
 * 说明：
 * - `name`：当天所在节气
 * - `dayOfTerm`：位于节气的第几天
 * - `isTermDay`：当天是否节气
 */
export interface SolarTermData {
  name: string;
  dayOfTerm: number;
  isTermDay: boolean;
}

export interface CalendarData {
  canonical: string;
  solar: SolarData;
  lunar: LunarData;
  solarTerm: SolarTermData;
  observances: ObservancesData;
  onThisDayEvents: OnThisDayEvent[];
}

/**
 * Build the `SolarData` snapshot for a given Dayjs date.
 *
 * Notes:
 * - `month` is 1-based (1–12).
 * - Chinese fields are formatted using the `zh-cn` locale.
 *
 * @param date - Target date as a Dayjs instance (typically a UTC day in this app).
 */
export function getSolarData(date: Dayjs): SolarData {
  const dateZh = date.locale("zh-cn");

  return {
    year: date.year(),
    month: date.month() + 1, // convert to 1-based
    day: date.date(),
    monthNameZh: dateZh.format("MMMM"),
    monthNameEn: date.format("MMMM"),
    weekdayZh: dateZh.format("dddd"),
    weekdayEn: date.format("dddd"),
  };
}

/**
 * Build the `LunarData` snapshot for a given Dayjs date.
 *
 * Uses `dayjs-plugin-lunar` to format the lunar year/month/day display strings.
 *
 * @param date - Target date as a Dayjs instance.
 */
export async function getLunarData(date: Dayjs): Promise<LunarData> {
  await ensureLunarPlugin();
  return {
    year: date.format("LY"),
    month: date.format("LM"),
    day: date.format("LD"),
    season: date.toLunarSeason().getName(),
  };
}

/**
 * Build the `SolarTermData` for a given Dayjs date.
 *
 * Semantics:
 * - `name`: the solar term (节气) that the date falls within.
 * - `dayOfTerm`: the 1-based day number within that solar term.
 * - `isTermDay`: true only on the first day of that solar term.
 *
 * @param date - Target date as a Dayjs instance.
 */
export async function getSolarTermData(date: Dayjs): Promise<SolarTermData> {
  await ensureLunarPlugin();
  const termDay = date.toLunarDay().getSolarDay().getTermDay();

  const termDayIndex = termDay.getDayIndex(); // 节气日序号（0 起始）

  return {
    name: termDay.getName(),
    dayOfTerm: termDayIndex + 1,
    isTermDay: termDayIndex === 0,
  };
}

let lunarPluginInitialization: Promise<void> | null = null;

async function ensureLunarPlugin(): Promise<void> {
  if (!lunarPluginInitialization) {
    lunarPluginInitialization = import("dayjs-plugin-lunar")
      .then(({ PluginLunar }) => {
        dayjs.extend(PluginLunar, { traditional: true });
      })
      .catch((error) => {
        // Reset so that future calls can retry the import.
        lunarPluginInitialization = null;
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to load dayjs-plugin-lunar: ${message}`);
      });
  }
  return lunarPluginInitialization;
}

/**
 * Build the assembled `CalendarData` snapshot for a given Dayjs date.
 *
 * @param date - Target date as a Dayjs instance (typically a UTC day in this app).
 * @returns The assembled `CalendarData` for that day.
 */
export async function getCalendarData(date: Dayjs): Promise<CalendarData> {
  const canonical = date.format("YYYY-MM-DD");
  const solar = getSolarData(date);
  const lunar = await getLunarData(date);
  const solarTerm = await getSolarTermData(date);
  const observances = getObservancesData(date);
  const onThisDayEvents = getOnThisDayEvents(date);

  return {
    canonical,
    solar,
    lunar,
    solarTerm,
    observances,
    onThisDayEvents,
  };
}
