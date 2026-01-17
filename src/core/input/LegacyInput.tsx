"use client";

import React, { forwardRef } from "react";
import { InputFontStyle } from "../../types/input";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const LegacyInput = forwardRef<
  HTMLInputElement,
  InputProps & {
    value: string;
    inputFontStyle?: InputFontStyle;
    onValueChange: (value: string) => void;
    onFocusChange: (focused: boolean) => void;
    onSelectionChange?: (start: number, end: number) => void;
  }
>(
  (
    {
      value,
      onValueChange,
      onFocusChange,
      onSelectionChange,
      inputFontStyle,
      ...props
    },
    ref
  ) => (
    <input
      style={{
        opacity: 0,
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 1,
        border: "1px solid transparent",
        outline: "none",
        background: "transparent",
        padding: 0,
        margin: 0,
        ...inputFontStyle,
        boxSizing: "border-box",
        cursor: "text",
        caretColor: "transparent",
      }}
      ref={ref}
      value={value}
      placeholder={props.placeholder}
      type={props.type}
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
      {...props}
    />
  )
);

export default LegacyInput;

LegacyInput.displayName = "LegacyInput";
