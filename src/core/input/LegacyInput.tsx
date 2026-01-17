"use client";

import clsx from "clsx";
import React, { forwardRef } from "react";
import { InputFontStyle, InputProps } from "../../types/input";

const LegacyInput = forwardRef<
  HTMLInputElement,
  InputProps & {
    value: string;
    type?: string;
    inputFontStyle?: InputFontStyle;
    onValueChange: (value: string) => void;
    onFocusChange: (focused: boolean) => void;
    onSelectionChange?: (start: number, end: number) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    classNames?: string;
  }
>(
  (
    {
      value,
      type,
      onValueChange,
      onFocusChange,
      onSelectionChange,
      inputFontStyle,
      onChange,
      classNames,
      ...props
    },
    ref,
  ) => (
    <input
      className={clsx(
        "opacity-0 absolute w-full h-full z-1 border border-transparent outline-none bg-transparent p-0 m-0 box-border cursor-text caret-transparent pointer-events-auto",
        classNames,
      )}
      style={{
        ...inputFontStyle,
      }}
      ref={ref}
      value={value}
      placeholder={props.placeholder}
      type={type}
      onChange={(e) => {
        onValueChange(e.target.value);
        onChange?.(e);
      }}
      onFocus={() => onFocusChange(true)}
      onBlur={() => onFocusChange(false)}
      onSelect={(e) => {
        const target = e.currentTarget;
        onSelectionChange?.(
          target.selectionStart || 0,
          target.selectionEnd || 0,
        );
      }}
      {...props}
    />
  ),
);

export default LegacyInput;

LegacyInput.displayName = "LegacyInput";
