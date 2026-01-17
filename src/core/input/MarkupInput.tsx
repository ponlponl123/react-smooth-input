"use client";

import { AnimatePresence, motion } from "motion/react";
import React, { forwardRef, useLayoutEffect } from "react";
import { InputFontStyle, InputType } from "../../types/input";

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
    },
    ref
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
        style={{
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          {value === "" && !focused && (
            <motion.div
              layoutId={`${layoutIdBase}-input-placeholder`}
              style={{
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                overflow: "hidden",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32 }}
            >
              <span
                style={{
                  color: "#aaaaaa60",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  fontWeight: 500,
                  ...inputFontStyle,
                  userSelect: "none",
                  pointerEvents: "none",
                  overflow: "hidden",
                }}
              >
                Type something...
              </span>
            </motion.div>
          )}
          <div
            style={{
              width: "100%",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              overflow: "hidden",
            }}
          >
            <motion.div
              layoutId={`${layoutIdBase}-input-content`}
              style={{
                height: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <AnimatePresence initial={false} mode="sync">
                {displayValue.split("").map((char, index) => (
                  <motion.span
                    key={`${char}-${index}`}
                    layoutId={`${layoutIdBase}-input-char-${index}`}
                    style={{
                      display: "inline-block",
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
                style={{
                  position: "absolute",
                  left: `${measuredLeft}px`,
                  width: isTextSelected
                    ? `${Math.max(measuredSelWidth, 3)}px`
                    : "3px",
                  height: "64%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: isTextSelected
                      ? "rgba(255, 255, 255, 0.3)"
                      : "white",
                    borderRadius: isTextSelected ? "3px" : "6px",
                    outlineColor: isTextSelected
                      ? "rgba(255, 255, 255, 0.3)"
                      : "transparent",
                    outlineStyle: "solid",
                    outlineWidth: "1px",
                  }}
                />
              </motion.div>
            )}
          </div>
          <div
            style={{
              position: "absolute",
              visibility: "hidden",
              whiteSpace: "nowrap",
              ...inputFontStyle,
              padding: 0,
              margin: 0,
              pointerEvents: "none",
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
                    style={{
                      display: "inline-block",
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
                    style={{
                      display: "inline-block",
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
  }
);

export default MarkupInput;

MarkupInput.displayName = "MarkupInput";
