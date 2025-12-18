import { useParams, Link } from "react-router";

export function CalendarPage() {
  const { date } = useParams();

  return (
    <div>
      <header className="flex flex-wrap items-baseline gap-3">
        <div className="text-sm text-foreground/80">
          <code className="font-bold text-foreground">
            {date ?? "(missing)"}
          </code>
        </div>
      </header>

      <section className="mt-4">
        <p className="text-sm leading-6 text-muted-foreground">
          This is the day view.
        </p>
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
