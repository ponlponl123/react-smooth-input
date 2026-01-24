"use client";

import clsx from "clsx";

export function ThemeBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <body
      className={clsx(
        "dark:bg-black dark:text-white smooth-transition font-sans antialiased",
        className,
      )}
      style={{ margin: 0 }}
    >
      {children}
    </body>
  );
}
