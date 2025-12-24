import { Dayjs } from "dayjs";

const UPCOMING_WINDOW_DAYS = 14;

const SOLAR_OBSERVANCES: Record<string, string[]> = {
  "1-1": ["元旦"],
  "12-13": ["国家公祭日"],
  "12-25": ["圣诞节"],
};

export interface ObservanceData {
  observance: string;
  daysUntil: number;
}

export interface ObservancesData {
  today: string[];
  upcoming: ObservanceData[];
}

function getSolarObservancesForDate(date: Dayjs): string[] {
  return SOLAR_OBSERVANCES[date.format("M-D")] ?? [];
}

function getUpcomingObservances(date: Dayjs, windowDays = UPCOMING_WINDOW_DAYS): ObservanceData[] {
  const upcomingObservances: ObservanceData[] = [];

  for (let offset = 1; offset <= windowDays; offset += 1) {
    const futureDate = date.add(offset, "day");
    const observances = getSolarObservancesForDate(futureDate);

    for (const observance of observances) {
      upcomingObservances.push({ observance, daysUntil: offset });
    }
  }

  return upcomingObservances;
}

export function getObservancesData(date: Dayjs): ObservancesData {
  return {
    today: getSolarObservancesForDate(date),
    upcoming: getUpcomingObservances(date),
  };
}
