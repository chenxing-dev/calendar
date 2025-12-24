import { useLoaderData, Link } from "react-router";
import type { CalendarData } from "../lib/calendar";

export function CalendarPage() {
  const { solar, lunar, solarTerm, observances } = useLoaderData<CalendarData>();

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
      <hr />
      <p>[+] 历史上的今天</p>
      <p>1937年 - 日本军队成功攻占中华民国首都南京市，并在未来数星期内展开各式反人类战争罪行。</p>
      <p>2003年 - 美军寻获前伊拉克总统萨达姆·侯赛因在提克里特的藏身处，并发起行动将其俘虏。</p>
      <hr />
      <p>
        <Link to="/">
          <span className="font-bold">{"<- "}</span>Back to cover
        </Link>
      </p>
    </div>
  );
}
