import React from "react";
import { zpix } from "../lib/fonts";

type Props = React.PropsWithChildren<{ className?: string }>;

export function Layout({ children, className }: Props) {
  return (
    <div
      className={`${zpix.className} min-h-screen flex items-center justify-center text-lg 2xl:text-2xl`}
    >
      <div className={`w-full max-w-2xl p-6 ${className ?? ""}`}>{children}</div>
    </div>
  );
}
