import React from "react";
import { zpix } from "@/lib/fonts";

type Props = React.PropsWithChildren<{ className?: string }>;

export function Layout({ children, className }: Props) {
  return (
    <div className={`${zpix.className} min-h-screen flex items-center justify-center`}>
      <div className={`w-full max-w-4xl p-6 ${className ?? ""}`}>{children}</div>
    </div>
  );
}
