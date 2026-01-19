import clsx from "clsx";
import React from "react";

function Chip({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "inline-block rounded-full bg-black/10 dark:bg-white/10 px-3 py-1 text-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Chip;
