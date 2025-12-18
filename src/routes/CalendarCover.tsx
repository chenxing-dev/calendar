import { Link } from "react-router";

export function CalendarCover() {
  return (
    <div>
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Calendar</h1>
        <p className="mt-2 text-muted-foreground">A tiny calendar app.</p>
      </header>

      <section className="mt-5 flex flex-wrap gap-3">
        <Link
          to="/2025-01-01"
          className="inline-flex items-center border px-3 py-2 text-sm text-foreground hover:bg-accent"
        >
          Example: 2025-01-01
        </Link>
      </section>
    </div>
  );
}
