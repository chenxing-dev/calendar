import { useLoaderData, Link } from "react-router";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CalendarData, SolarData } from "@/lib/calendar";
import type { ObservancesData } from "@/lib/observances";

function setTitleForCalendarPage(solar: SolarData, observances: ObservancesData) {
  const todayObservance = observances.today.length > 0 ? observances.today[0] : null;
  if (todayObservance) {
    document.title = `${solar.year}年${todayObservance.name}`;
  } else {
    document.title = `${solar.year}年${solar.month}月${solar.day}日 ${solar.weekdayZh}`;
  }
}

export default function CalendarPage() {
  const { canonical, yesterday, tomorrow, solar, lunar, solarTerm, observances, onThisDayEvents } =
    useLoaderData<CalendarData>();

  useEffect(() => {
    setTitleForCalendarPage(solar, observances);
  }, [solar, observances]);

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
      {observances.today.length > 0 || observances.upcoming.length > 0 ? (
        <>
          <hr />
          {observances.today.map((observance) => (
            <p key={observance.name}>
              - <span className={observance.nameClass}>{observance.name}</span>
              {observance.message ? (
                <span className={`ml-2 ${observance.messageClass}`}>{observance.message}</span>
              ) : null}
            </p>
          ))}
          {observances.upcoming.map(({ observance, daysUntil }) => (
            <p key={observance}>
              - 距离{observance}还有 {daysUntil} 天
            </p>
          ))}
        </>
      ) : null}
      {onThisDayEvents.length > 0 ? (
        <>
          <hr />
          <Accordion type="single" collapsible>
            <AccordionItem value="on-this-day">
              <AccordionTrigger>历史上的今天</AccordionTrigger>
              <AccordionContent>
                {onThisDayEvents.map((event, index) => (
                  <p key={`${event.year}-${index}`}>
                    {event.year}年 - {event.description}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ) : null}
      <p>&nbsp;</p>
      <p className="flex justify-between">
        <Link to={`/${yesterday}`} className="font-semibold">
          <span>{"<-"}</span>
        </Link>
        <span>{canonical}</span>
        <Link to={`/${tomorrow}`} className="font-semibold">
          <span>{"->"}</span>
        </Link>
      </p>
    </div>
  );
}
