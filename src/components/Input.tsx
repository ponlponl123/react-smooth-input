"use client";

import { AnimatePresence } from "motion/react";
import React from "react";
import LegacyInput from "../core/input/LegacyInput";
import MarkupInput from "../core/input/MarkupInput";
import { InputFontStyle, InputProps } from "../types/input";

const inputFontStyle: InputFontStyle = {
  fontSize: "12px",
  letterSpacing: "0.9px",
  fontFamily: "system-ui, sans-serif",
};

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
      <div
        style={{
          width: "100%",
          height: "auto",
          border: "2px solid transparent",
          backgroundColor: "#eeeeee20",
          boxSizing: "border-box",
          padding: "4px 8px",
          display: "flex",
          alignItems: "center",
          borderRadius: "12px",
          gap: "8px",
          position: "relative",
          userSelect: "none",
          cursor: "text",
          ...style,
        }}
      >
        <AnimatePresence>
          <MarkupInput
            focused={focused}
            type={props.type}
            value={String(value)}
            style={style}
            inputFontStyle={inputFontStyle}
            selectionStart={selectionStart}
            selectionEnd={selectionEnd}
          />
        </AnimatePresence>
        <LegacyInput
          value={String(value)}
          type={props.type}
          inputFontStyle={inputFontStyle}
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
