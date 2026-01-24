"use client";

import { AnimatePresence, motion } from "motion/react";
import React, { forwardRef, useLayoutEffect, useMemo, useRef } from "react";
import { twMerge } from "tailwind-merge";
import {
  InputFontStyle,
  InputProps,
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
    customMotion?: InputProps["customMotion"];
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
      customMotion,
    },
    ref,
  ) => {
    const isTextSelected = selectionStart !== selectionEnd;
    const layoutIdBase = React.useId();

    const measurePreRef = useRef<HTMLSpanElement>(null);
    const measureSelRef = useRef<HTMLSpanElement>(null);
    const measureFullRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [measuredLeft, setMeasuredLeft] = React.useState(0);
    const [measuredSelWidth, setMeasuredSelWidth] = React.useState(0);
    const [scrollOffset, setScrollOffset] = React.useState(0);
    const [contentWidth, setContentWidth] = React.useState(0);
    const [containerWidth, setContainerWidth] = React.useState(0);
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
      const full = measureFullRef.current;
      const container = containerRef.current;
      if (pre && sel && full && container) {
        const preWidth = pre.getBoundingClientRect().width;
        const selWidth = sel.getBoundingClientRect().width;
        const fullWidth = full.getBoundingClientRect().width;
        const cWidth = container.getBoundingClientRect().width;

        setMeasuredLeft(preWidth);
        setMeasuredSelWidth(selWidth);
        setContainerWidth(cWidth);
        setContentWidth(fullWidth);

        // Calculate scroll offset to keep cursor visible
        // Use cursor position (preWidth) for non-selection, or selection end for selection
        const cursorPosition = isTextSelected ? preWidth + selWidth : preWidth;
        const cursorWidth = 3; // Width of the cursor element
        const padding = 8; // Padding when scrolling to a new position

        setScrollOffset((prevOffset) => {
          const cursorLeftInView = preWidth - prevOffset;
          const cursorRightInView = cursorPosition + cursorWidth - prevOffset;

          // Only scroll when cursor is truly outside the visible area
          // This prevents unwanted scrolling when clicking on already visible text
          if (cursorRightInView > cWidth) {
            // Cursor is past the right edge, scroll right with padding
            return cursorPosition + cursorWidth - cWidth + padding;
          } else if (cursorLeftInView < 0) {
            // Cursor is past the left edge, scroll left with padding
            return Math.max(0, preWidth - padding);
          }
          return prevOffset;
        });
      }
    }, [displayValue, selectionStart, selectionEnd, isTextSelected]);

    // Calculate gradient mask based on overflow
    const hasOverflowLeft = scrollOffset > 0;
    const hasOverflowRight = contentWidth - scrollOffset > containerWidth;
    const gradientSize = 16; // Size of fade gradient in pixels

    const maskGradient = useMemo(() => {
      if (!hasOverflowLeft && !hasOverflowRight) {
        return undefined;
      }
      const leftGradient = hasOverflowLeft
        ? `linear-gradient(to right, transparent, black ${gradientSize}px)`
        : "linear-gradient(to right, black, black)";
      const rightGradient = hasOverflowRight
        ? `linear-gradient(to left, transparent, black ${gradientSize}px)`
        : "linear-gradient(to left, black, black)";
      return `${leftGradient}, ${rightGradient}`;
    }, [hasOverflowLeft, hasOverflowRight]);

    return (
      <div
        ref={ref}
        className={twMerge(
          "relative w-full h-full rounded-md overflow-hidden",
          classNames?.container,
        )}
        data-name="markup-input-container"
      >
        <div
          className={twMerge(
            "w-full h-full relative flex items-center justify-start",
            classNames?.base,
          )}
          data-name="markup-input-base"
        >
          {value === "" && !focused && placeholder && (
            <motion.div
              layoutId={`${layoutIdBase}-input-placeholder`}
              className={twMerge(
                "h-full absolute top-0 left-0 flex items-center justify-start overflow-hidden",
                classNames?.placeholder?.wrapper,
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32 }}
              data-name="markup-input-placeholder-wrapper"
            >
              <span
                className={twMerge(
                  "whitespace-nowrap text-ellipsis font-medium select-none pointer-events-none overflow-hidden opacity-20",
                  classNames?.placeholder?.text,
                )}
                style={{
                  ...inputFontStyle,
                }}
                data-name="markup-input-placeholder-text"
              >
                {placeholder}
              </span>
            </motion.div>
          )}
          <div
            ref={containerRef}
            className={twMerge(
              "w-full h-full relative flex items-center justify-start overflow-hidden",
              classNames?.content?.wrapper,
            )}
            style={{
              maskImage: maskGradient,
              maskComposite: maskGradient ? "intersect" : undefined,
              WebkitMaskImage: maskGradient,
              WebkitMaskComposite: maskGradient ? "source-in" : undefined,
            }}
            data-name="markup-input-content-wrapper"
          >
            <div
              className={twMerge(
                "h-full min-h-6 whitespace-nowrap",
                classNames?.content?.value?.wrapper,
              )}
              style={{
                transform: `translateX(${-scrollOffset}px)`,
                transition: "transform 0.1s ease-out",
              }}
              data-name="markup-input-content-value-wrapper"
            >
              <AnimatePresence initial={false} mode="popLayout">
                {displayValue.split("").map((char, index) => (
                  <AnimatedChar
                    key={charIds[index]}
                    char={char}
                    charId={charIds[index]}
                    className={classNames?.content?.value?.text}
                    data-name="markup-input-content-value-char"
                    initial={customMotion?.char?.initial}
                    animate={customMotion?.char?.animate}
                    exit={customMotion?.char?.exit}
                    transition={customMotion?.char?.transition}
                    style={inputFontStyle}
                  />
                ))}
              </AnimatePresence>
            </div>
            {focused && (
              <motion.div
                layoutId={`${layoutIdBase}-input-cursor`}
                className={twMerge(
                  "absolute flex items-center justify-center",
                  isTextSelected
                    ? classNames?.cursor?.wrapper?.isTextSelected
                    : classNames?.cursor?.wrapper?.notSelected,
                )}
                style={{
                  left: `${measuredLeft - scrollOffset}px`,
                  width: isTextSelected
                    ? `${Math.max(measuredSelWidth, 3)}px`
                    : "3px",
                  height: "64%",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16 }}
                data-name="markup-input-cursor-wrapper"
              >
                <motion.div
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className={twMerge(
                    "w-full h-full outline",
                    isTextSelected
                      ? "bg-black/30 dark:bg-white/30 outline-black/30 dark:outline-white/30 rounded-[3px]"
                      : "outline-transparent bg-black dark:bg-white rounded-md",
                    isTextSelected
                      ? classNames?.cursor?.base?.isTextSelected
                      : classNames?.cursor?.base?.notSelected,
                  )}
                  data-name="markup-input-cursor-base"
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
            <span ref={measureFullRef}>
              {displayValue.split("").map((char, index) => (
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
