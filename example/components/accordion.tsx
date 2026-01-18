"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

export interface AccordionProps {
  children: React.ReactNode;
  title: string;
  defaultOpen?: boolean;
  classNames?: {
    container?: string;
    button?: string;
    icon?: string;
    title?: string;
    content?: string;
  };
}

function Accordion({
  children,
  title,
  defaultOpen = false,
  classNames,
}: AccordionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const layoutid = React.useId();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AnimatePresence>
      <motion.div className={clsx("mb-4", classNames?.container)}>
        <button
          className={clsx(
            "w-full rounded-lg font-semibold px-3 py-2 flex items-center justify-between text-xs text-left smooth-transition",
            "dark:hover:bg-white/5 hover:bg-black/5 active:opacity-90 active:scale-[0.98] active:duration-75",
            isOpen
              ? " dark:bg-white/10 bg-black/10 dark:text-white text-black"
              : "",
            classNames?.button,
          )}
          onClick={toggleAccordion}
        >
          <h2 className={clsx("flex-1", classNames?.title)}>{title}</h2>
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
            className={clsx(
              "smooth-transition w-4 h-4 dark:fill-white fill-black",
              isOpen ? "rotate-90" : "rotate-180",
              classNames?.icon,
            )}
          >
            <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"></path>
          </svg>
        </button>
        {isOpen && (
          <motion.div
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2 }}
            layoutId={layoutid}
            className={clsx("p-2", classNames?.content)}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default Accordion;
