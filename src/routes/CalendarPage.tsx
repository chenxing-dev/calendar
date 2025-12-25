import { useLoaderData, Link } from "react-router";
import type { CalendarData } from "../lib/calendar";

export function CalendarPage() {
  const { solar, lunar, solarTerm, observances, onThisDayEvents } = useLoaderData<CalendarData>();

  return (
    <div>
      <p>
        {solar.year}年 {solar.monthNameZh}
      </p>
      <p>
        {solar.monthNameEn} {solar.day}
      </p>
      <p>
        {solar.weekdayZh} | {solar.weekdayEn}
      </p>
      <hr />
      <p>
        农历{lunar.year}年 {lunar.month}
        {lunar.day}
      </p>
      <p>
        {solarTerm.name}节气 · {lunar.season}之时
      </p>
      <hr />
      {observances.today.map((observance) => (
        <p key={observance}>- {observance}</p>
      ))}
      {observances.upcoming.map(({ observance, daysUntil }) => (
        <p key={observance}>
          - 距离{observance}还有 {daysUntil} 天
        </p>
      ))}
      {onThisDayEvents.length > 0 ? (
        <>
          <hr />
          <p>[+] 历史上的今天</p>
          {onThisDayEvents.map((event, index) => (
            <p key={`${event.year}-${index}`}>
              {event.year}年 - {event.description}
            </p>
          ))}
        </>
      ) : null}
      <hr />
      <p>
        <Link to="/">
          <span className="font-bold">{"<- "}</span>Back to cover
        </Link>
      </p>
    </div>
  );
}
