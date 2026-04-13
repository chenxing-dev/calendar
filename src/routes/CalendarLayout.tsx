import { useNavigation, Outlet, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Footer } from "@/components/Footer";

export default function CalendarLayout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  const [fontsLoaded, setFontsLoaded] = useState(() => {
    if (typeof document === "undefined") return true;
    return !("fonts" in document);
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!("fonts" in document)) return;

    let mounted = true;
    const markLoaded = () => {
      if (mounted) setFontsLoaded(true);
    };

    document.fonts.ready.then(markLoaded);
    const timeout = setTimeout(markLoaded, 3000);
    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, []);
  return (
    <Layout className="flex flex-col">
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          `${isActive || isPending ? "no-underline" : ""} mb-8 text-center`
        }
      >
        <span
          className={`transition-opacity duration-200 ${fontsLoaded ? "opacity-100" : "opacity-0"}`}
        >
          日历 | CALENDAR
        </span>
      </NavLink>
      <Card className="w-full max-w-md mx-auto relative">
        <LoadingOverlay isLoading={isNavigating || !fontsLoaded} />
        <CardContent
          className={`transition-opacity duration-200 ${fontsLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <Outlet />
        </CardContent>
      </Card>
      <Footer />
    </Layout>
  );
}
