import type { Dayjs } from "dayjs";
import { ON_THIS_DAY } from "./on-this-day.data";

export interface OnThisDayEvent {
  year: number;
  description: string;
}

type OnThisDayEventMap = Readonly<Record<string, readonly OnThisDayEvent[]>>;

export function getOnThisDayEvents(date: Dayjs): OnThisDayEvent[] {
  const key = date.format("M-D");

  const generatedEvents = (ON_THIS_DAY as OnThisDayEventMap)[key];
  if (generatedEvents) {
    return [...generatedEvents];
  }
  return [];
}
