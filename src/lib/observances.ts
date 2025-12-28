import { Dayjs } from "dayjs";

const UPCOMING_WINDOW_DAYS = 14;

export interface ObservanceEntry {
  name: string;
  nameClass?: string;
  message?: string;
  messageClass?: string;
}

const SOLAR_OBSERVANCES: Record<string, string[]> = {
  "1-1": ["元旦"],
  "2-14": ["情人节"],
  "12-13": ["国家公祭日"],
  "12-25": ["圣诞节"],
};

const OBSERVANCE_META: Record<string, Partial<ObservanceEntry>> = {
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

  let todayObservances: string[] = [...solar];
  if (lunar) todayObservances.unshift(lunar);

  // remove duplicates while preserving order
  todayObservances = Array.from(new Set(todayObservances));

  return {
    today: toObservanceEntries(todayObservances),
    upcoming: getUpcomingObservances(date),
  };
}
