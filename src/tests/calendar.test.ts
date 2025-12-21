import { expect, test } from "vitest";
import { UTCDate } from "@date-fns/utc";
import { getCalendarData } from "../lib/calendar.ts";

test("getCalendarData returns expected structure and canonical date", () => {
  // Use a deterministic UTC date: 2025-12-13
  const date = new UTCDate("2025-12-13"); // month is 0-based for JS Date
  const data = getCalendarData(date);

  expect(data).toBeDefined();
  expect(data.canonical).toBe("2025-12-13");

  expect(data.solar).toBeDefined();
  expect(data.solar.year).toBe(2025);
  expect(data.solar.month).toBe(12);
  expect(data.solar.day).toBe(13);
  expect(data.solar.weekdayEn).toBe("Saturday");
  expect(data.solar.weekdayZh).toBe("星期六");
  expect(data.solar.monthNameEn).toBe("December");
  expect(data.solar.monthNameZh).toBe("十二月");

  expect(data.lunar).toBeDefined();
  expect(data.lunar.yearGanzhi).toBe("乙巳");
  expect(data.lunar.monthName).toBe("十月");
  expect(data.lunar.dayName).toBe("廿四");

  expect(data.solarTerm).toBeDefined();
  expect(data.solarTerm.termName).toBe("大雪");
  expect(data.solarTerm.daysSinceTerm).toBe(6);
  expect(data.solarTerm.isTermDay).toBe(false);
});
