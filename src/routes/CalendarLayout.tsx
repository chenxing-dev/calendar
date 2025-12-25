import { useNavigation, Outlet } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Layout } from "../components/Layout";

export default function CalendarLayout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <Layout>
      <Card className="w-full max-w-md mx-auto">
        <CardContent>
          {isNavigating && <Spinner className="size-8" />}
          <Outlet />
        </CardContent>
      </Card>
    </Layout>
  );
}
