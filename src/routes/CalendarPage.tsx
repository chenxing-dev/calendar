import { useLoaderData, Link } from "react-router";
import type { CalendarData } from "../lib/calendar";

export function CalendarPage() {
  const { canonical } = useLoaderData<CalendarData>();

  return (
    <div>
      <header className="flex flex-wrap items-baseline gap-3">
        <h1>{canonical ?? "(missing)"}</h1>
      </header>

      <section className="mt-4">
        <p>This is the day view.</p>
      </section>

      <section className="mt-5 flex flex-wrap gap-3">
        <Link
          to="/"
          className="text-sm font-medium text-foreground hover:underline"
        >
          Back to cover
        </Link>
      </section>
    </div>
  );
}
