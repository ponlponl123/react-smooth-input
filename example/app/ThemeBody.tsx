"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

export function ThemeBody({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  return (
    <body
      className={clsx(
        isDark && "dark",
        "dark:bg-black dark:text-white smooth-transition",
      )}
      style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}
    >
      {children}
    </body>
  );
}
