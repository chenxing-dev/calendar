import { Dayjs } from "dayjs";
import { OBSERVANCES } from "./observances.data";

const UPCOMING_WINDOW_DAYS = 24;

type ObservanceMap = Readonly<Record<string, readonly string[]>>;

export interface ObservanceEntry {
  name: string;
  nameClass?: string;
  message?: string;
  messageClass?: string;
  upcomingWindowDays?: number;
}

const OBSERVANCE_META: Record<string, Partial<ObservanceEntry>> = {
  元旦: {
    upcomingWindowDays: 14,
  },
  春节: {
    upcomingWindowDays: 30,
  },
  情人节: {
    upcomingWindowDays: 7,
  },
  国际妇女节: {
    upcomingWindowDays: 14,
  },
  清明: {
    upcomingWindowDays: 7,
  },
  国际劳动节: {
    upcomingWindowDays: 14,
  },
  母亲节: {
    upcomingWindowDays: 7,
  },
  端午节: {
    upcomingWindowDays: 14,
  },
  中华人民共和国抗日戰爭勝利紀念日: {
    upcomingWindowDays: 14,
  },
  中秋节: {
    upcomingWindowDays: 14,
  },
  "中华人民共和国国庆节（1949年）": {
    upcomingWindowDays: 14,
  },
  重阳节: {
    upcomingWindowDays: 14,
  },
  圣诞节: {
    upcomingWindowDays: 14,
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
  const d = date.format("M-D");
  const generatedObservances = (OBSERVANCES as ObservanceMap)[d];
  return generatedObservances ? [...generatedObservances] : [];
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
    const observanceSet = new Set<string>(solarObservances);
    if (lunarObservance) {
      observanceSet.add(lunarObservance);
    }
    const observances = Array.from(observanceSet);
    for (const observance of observances) {
      const upcomingWindowDays = OBSERVANCE_META[observance]?.upcomingWindowDays ?? 0;
      if (upcomingWindowDays < offset) continue;
      upcomingObservances.push({ observance, daysUntil: offset });
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
