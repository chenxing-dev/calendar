import type { CalendarCoverData } from "@/lib/calendar";
import { useLoaderData, Link } from "react-router";

export function CalendarCover() {
  const { year } = useLoaderData<CalendarCoverData>();

  return (
    <div>
      <p className="text-center">** {year} **</p>
      <p className="text-center">日 历</p>
      <p className="text-center">CALENDAR</p>
      <p className="text-end font-bold">
        <Link to="/2025-01-01">{"->"}</Link>
      </p>
    </div>
  );
}
