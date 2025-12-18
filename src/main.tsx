import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import "./index.css";
import { RootErrorBoundary } from "./routes/ErrorBoundary";
import { CalendarLayout } from "./routes/CalendarLayout";
import { CalendarCover } from "./routes/CalendarCover";
import { CalendarPage } from "./routes/CalendarPage";

const router = createHashRouter([
  {
    path: "/",
    ErrorBoundary: RootErrorBoundary,
    Component: CalendarLayout,
    loader: () => {
      return undefined;
    },
    children: [
      {
        index: true,
        Component: CalendarCover,
      },
      {
        path: ":date",
        Component: CalendarPage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
