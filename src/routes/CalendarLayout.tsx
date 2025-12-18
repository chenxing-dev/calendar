import { useNavigation, Outlet } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { Layout } from "../components/Layout";

export function CalendarLayout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <Layout className="mt-3">
      {isNavigating && <Spinner className="size-8" />}
      <Outlet />
    </Layout>
  );
}
