"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import React, { forwardRef, useLayoutEffect } from "react";
import {
  InputFontStyle,
  InputType,
  MarkupInputClassNames,
} from "../../types/input";

const MarkupInput = forwardRef<
  HTMLDivElement,
  {
    focused: boolean;
    value: string;
    style?: React.CSSProperties;
    type?: InputType;
    inputFontStyle?: InputFontStyle;
    selectionStart?: number;
    selectionEnd?: number;
    classNames?: MarkupInputClassNames;
    placeholder?: string;
  }
>(
  (
    {
      focused,
      value,
      style,
      type,
      inputFontStyle,
      selectionStart = 0,
      selectionEnd = 0,
      classNames,
      placeholder,
    },
    ref,
  ) => {
    const isTextSelected = selectionStart !== selectionEnd;
    const selectedLength = selectionEnd - selectionStart;
    const layoutIdBase = React.useId();

    const measurePreRef = React.useRef<HTMLSpanElement>(null);
    const measureSelRef = React.useRef<HTMLSpanElement>(null);
    const [measuredLeft, setMeasuredLeft] = React.useState(0);
    const [measuredSelWidth, setMeasuredSelWidth] = React.useState(0);

    useLayoutEffect(() => {
      const pre = measurePreRef.current;
      const sel = measureSelRef.current;
      if (pre && sel) {
        setMeasuredLeft(pre.getBoundingClientRect().width);
        setMeasuredSelWidth(sel.getBoundingClientRect().width);
      }
    }, [value, selectionStart, selectionEnd]);

    const displayValue = type === "password" ? "•".repeat(value.length) : value;

    return (
      <div
        ref={ref}
        className={clsx(
          "relative w-full h-full rounded-md overflow-hidden",
          classNames?.container,
        )}
      >
        <div
          className={clsx(
            "w-full h-full relative flex items-center justify-start",
            classNames?.base,
          )}
        >
          {value === "" && !focused && placeholder && (
            <motion.div
              layoutId={`${layoutIdBase}-input-placeholder`}
              className={clsx(
                "h-full absolute top-0 left-0 flex items-center justify-start overflow-hidden",
                classNames?.placeholder?.wrapper,
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32 }}
            >
              <span
                className={clsx(
                  "whitespace-nowrap text-ellipsis font-medium select-none pointer-events-none overflow-hidden opacity-20",
                  classNames?.placeholder?.text,
                )}
                style={{
                  ...inputFontStyle,
                }}
              >
                {placeholder}
              </span>
            </motion.div>
          )}
          <div
            className={clsx(
              "w-full h-full relative flex items-center justify-start",
              classNames?.content?.wrapper,
            )}
          >
            <motion.div
              layoutId={`${layoutIdBase}-input-content`}
              className={clsx(
                "h-full min-h-6 overflow-hidden whitespace-nowrap text-ellipsis",
                classNames?.content?.value?.wrapper,
              )}
            >
              <AnimatePresence initial={false} mode="sync">
                {displayValue.split("").map((char, index) => (
                  <motion.span
                    key={`${char}-${index}`}
                    layoutId={`${layoutIdBase}-input-char-${index}`}
                    className={clsx(
                      "inline-block",
                      classNames?.content?.value?.text,
                    )}
                    style={{
                      minWidth: char === " " ? "0.25em" : "auto",
                      ...inputFontStyle,
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: 16,
                      rotateZ: Math.random() * 40 - 20,
                    }}
                    transition={{ duration: 0.12 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </AnimatePresence>
            </motion.div>
            {focused && (
              <motion.div
                layoutId={`${layoutIdBase}-input-cursor`}
                className={clsx(
                  "absolute flex items-center justify-center",
                  isTextSelected
                    ? classNames?.cursor?.wrapper?.isTextSelected
                    : classNames?.cursor?.wrapper?.notSelected,
                )}
                style={{
                  left: `${measuredLeft}px`,
                  width: isTextSelected
                    ? `${Math.max(measuredSelWidth, 3)}px`
                    : "3px",
                  height: "64%",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                <motion.div
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className={clsx(
                    "w-full h-full outline",
                    isTextSelected
                      ? "bg-black/30 dark:bg-white/30 outline-black/30 dark:outline-white/30 rounded-[3px]"
                      : "outline-transparent bg-black dark:bg-white rounded-md",
                    isTextSelected
                      ? classNames?.cursor?.base?.isTextSelected
                      : classNames?.cursor?.base?.notSelected,
                  )}
                />
              </motion.div>
            )}
          </div>
          <div
            className="absolute invisible whitespace-nowrap p-0 m-0 pointer-events-none"
            style={{
              ...inputFontStyle,
            }}
            aria-hidden="true"
          >
            <span ref={measurePreRef}>
              {displayValue
                .slice(0, selectionStart)
                .split("")
                .map((char, index) => (
                  <span
                    key={index}
                    className="inline-block"
                    style={{
                      minWidth: char === " " ? "0.25em" : "auto",
                    }}
                  >
                    {char}
                  </span>
                ))}
            </span>
            <span ref={measureSelRef}>
              {(displayValue.slice(selectionStart, selectionEnd) || " ")
                .split("")
                .map((char, index) => (
                  <span
                    key={index}
                    className="inline-block"
                    style={{
                      minWidth: char === " " ? "0.25em" : "auto",
                    }}
                  >
                    {char}
                  </span>
                ))}
            </span>
          </div>
        </div>
      </div>
    );
  },
);

export default MarkupInput;

MarkupInput.displayName = "MarkupInput";
