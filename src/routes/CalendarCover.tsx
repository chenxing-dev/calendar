import type { CalendarCoverData } from "@/lib/calendar";
import { useLoaderData, Link } from "react-router";
import { useEffect } from "react";

function setTitleForCover(year: number) {
  document.title = `${year}年日历`;
}

export default function CalendarCover() {
  const { canonical, year } = useLoaderData<CalendarCoverData>();

  useEffect(() => {
    setTitleForCover(year);
  }, [year]);

  return (
    <div>
      <p className="text-center">** {year} **</p>
      <p className="text-center">日 历</p>
      <p className="text-center">CALENDAR</p>
      <p></p>
      <p className="text-end">
        <Link className="font-bold" to={`/${canonical}`}>
          {" ->"}
        </Link>
      </p>
    </div>
  );
}
