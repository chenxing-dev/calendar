import { useNavigation, Outlet } from "react-router";
import { Spinner } from "@/components/ui/spinner";

import { noto } from "../lib/fonts";

export function CalendarLayout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <div className={`${noto.className} min-h-screen`}>
      <div className="mx-auto max-w-[960px] p-6">
        {isNavigating && <Spinner className="size-8" />}
        <Outlet />
      </div>
    </div>
  );
}
