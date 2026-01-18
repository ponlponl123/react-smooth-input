"use client";

import clsx from "clsx";

export interface ButtonProps {
  children: React.ReactNode;
  isDisabled?: boolean;
  isActive?: boolean;
  isOnlyIcon?: boolean;
  className?: string;
  onClick?: () => void;
}

function Button({
  children,
  isDisabled,
  isActive,
  isOnlyIcon,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-lg font-semibold flex items-center justify-between text-xs text-left smooth-transition",
        "dark:hover:bg-white/5 hover:bg-black/5 active:opacity-90 active:scale-[0.98] active:duration-75",
        isActive
          ? " dark:bg-white/10 bg-black/10 dark:text-white text-black"
          : "",
        isOnlyIcon ? "w-fit p-2" : "px-3 py-2",
        className,
      )}
      data-disabled={isDisabled}
      data-active={isActive}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
