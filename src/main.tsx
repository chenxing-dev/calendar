import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";

import "./index.css";
import { ErrorBoundary } from "./routes/ErrorBoundary";
import { CalendarLayout } from "./routes/CalendarLayout";
import { CalendarCover } from "./routes/CalendarCover";
import { CalendarPage } from "./routes/CalendarPage";
import {
  parseDateString,
  invalidDateResponse,
  type CalendarDateData,
  getCalendarDateData,
} from "./lib/date";

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
        loader: async ({ params }): Promise<CalendarDateData | Response> => {
          const raw = params.date ?? null;
          const date = parseDateString(raw);
          if (date === null) throw invalidDateResponse(raw);
          const data = getCalendarDateData(date);
          if (raw !== data.date) return redirect(`/${data.date}`);
          return data;
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
