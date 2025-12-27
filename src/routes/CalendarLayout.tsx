import { useNavigation, Outlet, NavLink } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Footer } from "@/components/Footer";

export default function CalendarLayout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <Layout className="flex flex-col">
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          `${isActive || isPending ? "no-underline" : ""} mb-8 text-center`
        }
      >
        日历 | CALENDAR
      </NavLink>
      <Card className="w-full max-w-md mx-auto relative">
        <LoadingOverlay isLoading={isNavigating} />
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
      <Footer />
    </Layout>
  );
}
