import { useNavigation, Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Spinner } from "@/components/ui/spinner";
import { Layout } from "../components/Layout";

export default function CalendarLayout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <Layout className="flex flex-col">
      <Card className="w-full max-w-md mx-auto">
        <CardContent>
          {isNavigating && <Spinner className="size-8" />}
          <Outlet />
        </CardContent>
      </Card>
      <footer className="mt-8 text-center">
        © 2025 陈刑 —{" "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="px-0">
              Credits
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-120">
            <p>
              中文像素字体 - <a href="https://github.com/SolidZORO/zpix-pixel-font">Zpix</a>
            </p>
            <p>
              农历计算 -{" "}
              <a href="https://github.com/baranwang/dayjs-plugin-lunar">Day.js 农历扩展插件</a>
            </p>
          </HoverCardContent>
        </HoverCard>
      </footer>
    </Layout>
  );
}
