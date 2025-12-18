import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import "./index.css";
import { ErrorBoundary } from "./routes/ErrorBoundary";
import { CalendarLayout } from "./routes/CalendarLayout";
import { CalendarCover } from "./routes/CalendarCover";
import { CalendarPage } from "./routes/CalendarPage";

const router = createHashRouter([
  {
    path: "/",
    Component: CalendarLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        index: true,
        Component: CalendarCover,
      },
      {
        path: ":date",
        Component: CalendarPage,
        loader: async ({ params }) => {
          const raw = params.date ?? null;
          if (raw === null) return { date: null };

          // Validate YYYY-MM-DD (quick regex first)
          const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!isoRegex.test(raw)) {
            const message = [
              `Invalid date format: "${raw}".`,
              "Expected ISO date in format YYYY-MM-DD.",
              "Example: 2025-12-18",
              "If you intended a different timezone or format, convert it to YYYY-MM-DD.",
            ].join("\n");
            throw new Response(message, {
              status: 400,
              statusText: "Invalid date format",
              headers: { "Content-Type": "text/plain; charset=utf-8" },
            });
          }

          const [yStr, mStr, dStr] = raw.split("-");
          const y = Number(yStr),
            m = Number(mStr),
            d = Number(dStr);
          const dt = new Date(`${raw}T00:00:00Z`);
          if (
            Number.isNaN(y) ||
            Number.isNaN(m) ||
            Number.isNaN(d) ||
            dt.getUTCFullYear() !== y ||
            dt.getUTCMonth() + 1 !== m ||
            dt.getUTCDate() !== d
          ) {
            const message = [
              `Invalid calendar date: "${raw}".`,
              `Parsed values -> year: ${yStr}, month: ${mStr}, day: ${dStr}.`,
              "Please check the numeric values and ensure the date exists in the Gregorian calendar.",
            ].join("\n");
            throw new Response(message, {
              status: 400,
              statusText: "Invalid calendar date",
              headers: { "Content-Type": "text/plain; charset=utf-8" },
            });
          }

          return { date: raw };
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
