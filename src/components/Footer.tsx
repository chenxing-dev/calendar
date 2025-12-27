import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export function Footer() {
  return (
    <footer className="mt-8 text-center">
      <div className="mt-2">
        <span>© 2025 </span>
        <a
          href="https://github.com/chenxing-dev/calendar"
          target="_blank"
          rel="noopener noreferrer"
        >
          陈刑
        </a>
        <span> — </span>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="px-0">
              Credits
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-120">
            <p>
              <span>中文像素字体 - </span>
              <a
                href="https://github.com/SolidZORO/zpix-pixel-font"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zpix
              </a>
            </p>
            <p>
              <span>农历计算 - </span>
              <a
                href="https://github.com/baranwang/dayjs-plugin-lunar"
                target="_blank"
                rel="noopener noreferrer"
              >
                Day.js 农历扩展插件
              </a>
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </footer>
  );
}
