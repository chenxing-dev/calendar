import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import "./index.css";
import { ErrorBoundary } from "./routes/ErrorBoundary";
import { CalendarLayout } from "./routes/CalendarLayout";
import { CalendarCover } from "./routes/CalendarCover";
import { CalendarPage } from "./routes/CalendarPage";
import { parseDateString, invalidDateResponse } from "./lib/date";

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

          const date = parseDateString(raw);
          if (date === null) throw invalidDateResponse(raw);

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
