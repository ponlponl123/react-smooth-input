"use client";

import clsx from "clsx";
import { AnimatePresence } from "motion/react";
import React from "react";
import LegacyInput from "../core/input/LegacyInput";
import MarkupInput from "../core/input/MarkupInput";
import { InputComponentProps } from "../types/input";

export const Input = ({
  label,
  style,
  value: controlledValue,
  defaultValue,
  fontStyle = {
    fontSize: "12px",
    letterSpacing: "0.9px",
    fontFamily: "system-ui, sans-serif",
  },
  type = "text",
  onChange,
  classNames,
  placeholder,
}: InputComponentProps) => {
  const [focused, setFocused] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<string>(
    (defaultValue as string) || "",
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
    <div className={clsx("flex flex-col gap-1", classNames?.container)}>
      {label && (
        <label className={clsx("text-sm text-[#666]", classNames?.label)}>
          {label}
        </label>
      )}
      <div
        className={clsx(
          "relative box-border flex h-auto w-full cursor-text select-none items-center gap-2 rounded-xl border-2 border-transparent dark:bg-[#eeeeee20] bg-black/10 px-2 py-1",
          classNames?.inputWrapper,
        )}
        style={style}
      >
        <AnimatePresence>
          <MarkupInput
            focused={focused}
            type={type}
            value={String(value)}
            style={style}
            inputFontStyle={fontStyle}
            selectionStart={selectionStart}
            selectionEnd={selectionEnd}
            classNames={classNames?.markupInput}
            placeholder={placeholder}
          />
        </AnimatePresence>
        <LegacyInput
          type={type}
          value={String(value)}
          inputFontStyle={fontStyle}
          onValueChange={handleValueChange}
          onFocusChange={setFocused}
          onSelectionChange={(start, end) => {
            setSelectionStart(start);
            setSelectionEnd(end);
          }}
          onChange={onChange}
          classNames={classNames?.legacyInput}
        />
      </div>
    </div>
  );
};
