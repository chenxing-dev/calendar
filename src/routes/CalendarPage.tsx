import { useLoaderData, Link } from "react-router";
import type { CalendarData } from "../lib/calendar";

export function CalendarPage() {
  const { solar, lunar, solarTerm } = useLoaderData<CalendarData>();

  return (
    <div>
      <hr />
      <p>{solar.year}年</p>
      <hr />
      <p>{solar.day}</p>
      <p>
        {solar.weekdayZh} | {solar.weekdayEn}
      </p>
      <p>
        农历{lunar.yearGanzhi}年 {lunar.monthName}
        {lunar.dayName}
      </p>
      <p>{solarTerm.termName}节气</p>
      <hr />
      <Link to="/">Back to cover</Link>
      <hr />
    </div>
  );
}
