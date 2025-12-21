import { useLoaderData, Link } from "react-router";
import type { CalendarData } from "../lib/calendar";

export function CalendarPage() {
  const { solar, lunar, solarTerm } = useLoaderData<CalendarData>();

  return (
    <div>
      <p>{solar.year}年</p>
      <hr />
      <p className="font-bold">{solar.day}</p>
      <p>
        {solar.weekdayZh} | {solar.weekdayEn}
      </p>
      <p>
        农历{lunar.yearGanzhi}年 {lunar.monthName}
        {lunar.dayName}
      </p>
      <p>{solarTerm.termName}节气</p>
      <hr />
      <p>
        <Link to="/">
          <span className="font-bold">{"<- "}</span>Back to cover
        </Link>
      </p>
    </div>
  );
}
