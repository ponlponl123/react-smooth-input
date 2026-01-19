"use client";

import clsx from "clsx";

export function ThemeBody({ children }: { children: React.ReactNode }) {
  return (
    <body
      className={clsx("dark:bg-black dark:text-white smooth-transition")}
      style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}
    >
      {children}
    </body>
  );
}
