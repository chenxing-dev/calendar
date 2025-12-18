import React from "react";
import { noto } from "../lib/fonts";

type Props = React.PropsWithChildren<{ className?: string }>;

export function Layout({ children, className }: Props) {
  return (
    <div className={`${noto.className} min-h-screen`}>
      <div className={`mx-auto max-w-[960px] p-6 prose prose-sm dark:prose-invert ${className ?? ""}`}>
        {children}
      </div>
    </div>
  );
}
