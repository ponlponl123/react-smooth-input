"use client";

import { AnimatePresence, motion } from "motion/react";
import React, { forwardRef, useLayoutEffect } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const MarkupInput = forwardRef<
  HTMLDivElement,
  {
    focused: boolean;
    value: string;
    style?: React.CSSProperties;
    selectionStart?: number;
    selectionEnd?: number;
  }
>(({ focused, value, style, selectionStart = 0, selectionEnd = 0 }, ref) => {
  const isTextSelected = selectionStart !== selectionEnd;
  const selectedLength = selectionEnd - selectionStart;

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

  const charWidth = 8;
  const cursorWidth = isTextSelected ? selectedLength * charWidth : 5;

  return (
    <motion.div
      ref={ref}
      layoutId="input-container"
      style={{
        width: "100%",
        height: "auto",
        border: "2px solid #eeeeee20",
        padding: "4px 8px",
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        gap: "8px",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
        cursor: "text",
        ...style,
      }}
    >
      <motion.div
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
            layoutId="input-placeholder"
            style={{
              width: "100%",
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
                fontSize: "14px",
                userSelect: "none",
                pointerEvents: "none",
                overflow: "hidden",
              }}
            >
              Type something...
            </span>
          </motion.div>
        )}
        <motion.div
          layoutId="input-content"
          style={{
            width: "100%",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <AnimatePresence initial={false} mode="sync">
              {value.split("").map((char, index) => (
                <motion.span
                  key={`${char}-${index}`}
                  layoutId={`input-char-${index}`}
                  style={{
                    display: "inline-block",
                    minWidth: char === " " ? "4px" : "auto",
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 12,
                    rotateZ: Math.random() * 40 - 20,
                  }}
                  transition={{ duration: 0.12 }}
                >
                  {char}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
          {focused && (
            <motion.div
              layoutId="input-cursor"
              style={{
                position: "absolute",
                width: isTextSelected
                  ? `${Math.max(measuredSelWidth, 4)}px`
                  : "4px",
                height: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: `${measuredLeft}px`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
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
        </motion.div>
        <div
          style={{
            position: "absolute",
            visibility: "hidden",
            whiteSpace: "pre",
            font: "inherit",
            padding: 0,
            margin: 0,
          }}
          aria-hidden
        >
          <span ref={measurePreRef}>{value.slice(0, selectionStart)}</span>
          <span ref={measureSelRef}>
            {value.slice(selectionStart, selectionEnd) || " "}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
});

MarkupInput.displayName = "MarkupInput";

const LegacyInput = forwardRef<
  HTMLInputElement,
  InputProps & {
    value: string;
    onValueChange: (value: string) => void;
    onFocusChange: (focused: boolean) => void;
    onSelectionChange?: (start: number, end: number) => void;
  }
>(
  (
    { value, onValueChange, onFocusChange, onSelectionChange, ...props },
    ref
  ) => (
    <input
      style={{
        opacity: 0,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        border: "none",
        outline: "none",
        background: "transparent",
        padding: "4px",
      }}
      ref={ref}
      value={value}
      onChange={(e) => {
        onValueChange(e.target.value);
        props.onChange?.(e);
      }}
      onFocus={() => onFocusChange(true)}
      onBlur={() => onFocusChange(false)}
      onSelect={(e) => {
        const target = e.currentTarget;
        onSelectionChange?.(
          target.selectionStart || 0,
          target.selectionEnd || 0
        );
      }}
      type="text"
      {...props}
    />
  )
);

LegacyInput.displayName = "LegacyInput";

export const Input = ({
  label,
  style,
  value: controlledValue,
  defaultValue,
  ...props
}: InputProps) => {
  const [focused, setFocused] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<string>(
    (defaultValue as string) || ""
  );
  const [selectionStart, setSelectionStart] = React.useState(0);
  const [selectionEnd, setSelectionEnd] = React.useState(0);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {label && (
        <label style={{ fontSize: "14px", color: "#666" }}>{label}</label>
      )}
      <div style={{ position: "relative" }}>
        <AnimatePresence mode="wait">
          <MarkupInput
            focused={focused}
            value={String(value)}
            style={style}
            selectionStart={selectionStart}
            selectionEnd={selectionEnd}
          />
        </AnimatePresence>
        <LegacyInput
          value={String(value)}
          onValueChange={handleValueChange}
          onFocusChange={setFocused}
          onSelectionChange={(start, end) => {
            setSelectionStart(start);
            setSelectionEnd(end);
          }}
          {...props}
        />
      </div>
    </div>
  );
};
