import React from "react";
import { Card, CardContent } from "./ui/card";
import { noto } from "../lib/fonts";

type Props = React.PropsWithChildren<{ className?: string }>;

export function Layout({ children, className }: Props) {
  return (
    <div className={`${noto.className} min-h-screen flex items-center justify-center`}>
      <Card className="w-full max-w-xs shadow-lg">
        <CardContent className={`prose prose-sm dark:prose-invert ${className ?? ""}`}>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
