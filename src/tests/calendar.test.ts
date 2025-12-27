import { expect, test } from "vitest";
import dayjs from "dayjs";
import { getCalendarData } from "@/lib/calendar";

test("getCalendarData returns expected structure and canonical date", async () => {
  // Use a deterministic UTC date: 2025-12-13
  const date = dayjs.utc("2025-12-13"); // Dayjs parses ISO date strings
  const data = await getCalendarData(date);

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
  expect(data.lunar.year).toBe("乙巳");
  expect(data.lunar.month).toBe("十月");
  expect(data.lunar.day).toBe("廿四");

  expect(data.solarTerm).toBeDefined();
  expect(data.solarTerm.name).toBe("大雪");
  expect(data.solarTerm.dayOfTerm).toBe(7);
  expect(data.solarTerm.isTermDay).toBe(false);

  expect(data.observances).toBeDefined();
  expect(data.observances.today[0].name).toContain("国家公祭日");
  expect(data.observances.upcoming).toContainEqual({
    observance: "圣诞节",
    daysUntil: 12,
  });
});
test("lunar: 2001-05-23 是 闰四月 初一", async () => {
  const date = dayjs.utc("2001-05-23");
  const data = await getCalendarData(date);

  expect(data).toBeDefined();
  expect(data.lunar).toBeDefined();
  expect(data.lunar.month).toBe("闰四月");
  expect(data.lunar.day).toBe("初一");
});
