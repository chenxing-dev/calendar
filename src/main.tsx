import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import "./index.css";
import { ErrorBoundary } from "./routes/ErrorBoundary";
import { CalendarLayout } from "./routes/CalendarLayout";
import { CalendarCover } from "./routes/CalendarCover";
import { CalendarPage } from "./routes/CalendarPage";
import { parseISODate } from "./lib/date";

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

          const date = parseISODate(raw);
          if (date === null) {
            const message = [
              `Invalid date: "${raw}".`,
              "Expected an ISO date (YYYY-MM-DD) that exists in the Gregorian calendar.",
              "Example: 2025-12-18",
            ].join("\n");
            throw new Response(message, {
              status: 400,
              statusText: "Invalid date",
              headers: { "Content-Type": "text/plain; charset=utf-8" },
            });
          }

          return { date };
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
