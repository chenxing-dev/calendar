import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, redirect, RouterProvider } from "react-router";
import { ErrorBoundary } from "@/routes/ErrorBoundary";
const CalendarLayout = lazy(() => import("@/routes/CalendarLayout"));
const CalendarCover = lazy(() => import("@/routes/CalendarCover"));
const CalendarPage = lazy(() => import("@/routes/CalendarPage"));
import { parseDateString, invalidDateResponse } from "@/lib/date-parser";
import {
  getCalendarCoverData,
  getCalendarData,
  type CalendarCoverData,
  type CalendarData,
} from "@/lib/calendar";
import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    Component: CalendarLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        index: true,
        Component: CalendarCover,
        loader: async (): Promise<CalendarCoverData> => {
          return getCalendarCoverData();
        },
      },
      {
        path: ":date",
        Component: CalendarPage,
        loader: async ({ params }): Promise<CalendarData | Response> => {
          const raw = params.date ?? null;
          if (raw === null || raw.trim() === "") return redirect(`/`);
          const date = parseDateString(raw);
          if (date === null) throw invalidDateResponse(raw);
          const data = await getCalendarData(date);
          if (raw !== data.canonical) return redirect(`/${data.canonical}`);
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
