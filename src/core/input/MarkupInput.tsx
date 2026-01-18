"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import React, { forwardRef, useLayoutEffect, useMemo, useRef } from "react";
import {
  InputFontStyle,
  InputType,
  MarkupInputClassNames,
} from "../../types/input";
import { findEditPosition, generateId } from "../../utils";
import { AnimatedChar } from "./AnimatedChar";

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
    const layoutIdBase = React.useId();

    const measurePreRef = useRef<HTMLSpanElement>(null);
    const measureSelRef = useRef<HTMLSpanElement>(null);
    const [measuredLeft, setMeasuredLeft] = React.useState(0);
    const [measuredSelWidth, setMeasuredSelWidth] = React.useState(0);
    const charIdsRef = useRef<number[]>([]);
    const prevValueRef = useRef(value);

    if (value !== prevValueRef.current) {
      const prevValue = prevValueRef.current;
      const prevIds = charIdsRef.current;

      // Detect where the edit happened by comparing strings
      const { position, added, removed } = findEditPosition(prevValue, value);

      if (added > 0 && removed === 0) {
        // Characters were added
        const newIds = Array.from({ length: added }, () => generateId());
        charIdsRef.current = [
          ...prevIds.slice(0, position),
          ...newIds,
          ...prevIds.slice(position),
        ];
      } else if (removed > 0 && added === 0) {
        // Characters were removed
        charIdsRef.current = [
          ...prevIds.slice(0, position),
          ...prevIds.slice(position + removed),
        ];
      } else if (added > 0 && removed > 0) {
        // Characters were replaced (e.g., paste over selection)
        const newIds = Array.from({ length: added }, () => generateId());
        charIdsRef.current = [
          ...prevIds.slice(0, position),
          ...newIds,
          ...prevIds.slice(position + removed),
        ];
      }

      prevValueRef.current = value;
    }

    // Ensure we have IDs for all characters (handles initial render and edge cases)
    if (charIdsRef.current.length < value.length) {
      const needed = value.length - charIdsRef.current.length;
      for (let i = 0; i < needed; i++) {
        charIdsRef.current.push(generateId());
      }
    } else if (charIdsRef.current.length > value.length) {
      charIdsRef.current.length = value.length;
    }

    // Memoize display value
    const displayValue = useMemo(
      () => (type === "password" ? "•".repeat(value.length) : value),
      [type, value],
    );

    // Memoize character IDs array for stable reference
    const charIds = charIdsRef.current;

    useLayoutEffect(() => {
      const pre = measurePreRef.current;
      const sel = measureSelRef.current;
      if (pre && sel) {
        setMeasuredLeft(pre.getBoundingClientRect().width);
        setMeasuredSelWidth(sel.getBoundingClientRect().width);
      }
    }, [displayValue, selectionStart, selectionEnd]);

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
            <div
              className={clsx(
                "h-full min-h-6 overflow-hidden whitespace-nowrap text-ellipsis",
                classNames?.content?.value?.wrapper,
              )}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {displayValue.split("").map((char, index) => (
                  <AnimatedChar
                    key={charIds[index]}
                    char={char}
                    charId={charIds[index]}
                    className={classNames?.content?.value?.text}
                    style={inputFontStyle}
                  />
                ))}
              </AnimatePresence>
            </div>
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
