import { Dayjs } from "dayjs";

const UPCOMING_WINDOW_DAYS = 20;

export interface ObservanceEntry {
  name: string;
  nameClass?: string;
  message?: string;
  messageClass?: string;
  upcomingWindowDays?: number;
}

const SOLAR_OBSERVANCES: Record<string, string[]> = {
  "1-1": ["元旦"],
  "1-28": ["国际数据隐私日"],
  "2-14": ["情人节"],
  "12-13": ["国家公祭日"],
  "12-25": ["圣诞节"],
};

const OBSERVANCE_META: Record<string, Partial<ObservanceEntry>> = {
  国际数据隐私日: {
    upcomingWindowDays: 0,
  },
  情人节: {
    upcomingWindowDays: 14,
  },
  国家公祭日: {
    upcomingWindowDays: 0,
  },
  圣诞节: {
    nameClass: "text-red-800",
    message: "MERRY CHRISTMAS!",
    messageClass: "text-green-800 font-semibold",
  },
};

export interface UpcomingObservanceData {
  observance: string;
  daysUntil: number;
}

export interface ObservancesData {
  today: ObservanceEntry[];
  upcoming: UpcomingObservanceData[];
}

function getSolarObservancesForDate(date: Dayjs): string[] {
  return SOLAR_OBSERVANCES[date.format("M-D")] ?? [];
}

function getLunarFestivalForDate(date: Dayjs): string | null {
  const festival = date.toLunarDay().getFestival();
  return festival ? festival.getName() : null;
}

function getUpcomingObservances(
  date: Dayjs,
  windowDays = UPCOMING_WINDOW_DAYS
): UpcomingObservanceData[] {
  const upcomingObservances: UpcomingObservanceData[] = [];

  for (let offset = 1; offset <= windowDays; offset += 1) {
    const futureDate = date.add(offset, "day");
    const solarObservances = getSolarObservancesForDate(futureDate);
    const lunarObservance = getLunarFestivalForDate(futureDate);
    for (const observance of solarObservances) {
      if (observance === lunarObservance) continue;
      const upcomingWindowDays = OBSERVANCE_META[observance]?.upcomingWindowDays;
      if (upcomingWindowDays !== undefined && upcomingWindowDays < offset) continue;
      upcomingObservances.push({ observance, daysUntil: offset });
    }
    if (lunarObservance) {
      upcomingObservances.push({ observance: lunarObservance, daysUntil: offset });
    }
  }

  return upcomingObservances;
}

function toObservanceEntries(observances: string[]): ObservanceEntry[] {
  return observances.map((name) => ({ name, ...(OBSERVANCE_META[name] ?? {}) }));
}

export function getObservancesData(date: Dayjs): ObservancesData {
  const solar = getSolarObservancesForDate(date);
  const lunar = getLunarFestivalForDate(date);

  const todayObservances: string[] = [...solar];
  if (lunar) todayObservances.unshift(lunar);

  return {
    today: toObservanceEntries(todayObservances),
    upcoming: getUpcomingObservances(date),
  };
}
