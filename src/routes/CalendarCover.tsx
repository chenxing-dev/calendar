import type { CalendarCoverData } from "@/lib/calendar";
import { useLoaderData, Link } from "react-router";
import { useEffect } from "react";

function setTitleForCover(year: number) {
  document.title = `${year} 年 日历`;
}

export default function CalendarCover() {
  const { year } = useLoaderData<CalendarCoverData>();

  useEffect(() => {
    setTitleForCover(year);
  }, [year]);

  return (
    <div>
      <p className="text-center">** {year} **</p>
      <p className="text-center">日 历</p>
      <p className="text-center">CALENDAR</p>
      <p className="text-end font-bold">
        <Link to="/2025-12-13">{"->"}</Link>
      </p>
    </div>
  );
}
