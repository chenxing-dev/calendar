import { Outlet } from "react-router";

import { noto } from "../lib/fonts";

export function CalendarLayout() {
  return (
    <div className={`${noto.className} min-h-screen`}>
      <div className="mx-auto max-w-[960px] p-6">
        <Outlet />
      </div>
    </div>
  );
}
