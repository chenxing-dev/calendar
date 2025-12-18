import { Link } from "react-router";

export function CalendarCover() {
  return (
    <div>
      <header>
        <h1>Calendar</h1>
        <p>A tiny calendar app.</p>
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
