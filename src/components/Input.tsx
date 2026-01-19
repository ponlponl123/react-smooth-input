"use client";

import clsx from "clsx";
import { AnimatePresence } from "motion/react";
import React from "react";
import LegacyInput from "../core/input/LegacyInput";
import MarkupInput from "../core/input/MarkupInput";
import { InputComponentProps } from "../types/input";

export const InputContext = React.createContext<{}>({});

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
  className,
  classNames,
  placeholder,
  startContent,
  endContent,
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
    <div
      className={clsx("flex flex-col gap-1", className, classNames?.container)}
    >
      {label && (
        <label className={clsx("text-sm text-[#666]", classNames?.label)}>
          {label}
        </label>
      )}
      <div
        className={clsx(
          "relative box-border flex h-auto w-full cursor-text select-none items-center gap-2 rounded-xl border-2 border-transparent dark:bg-white/10 bg-black/10 px-2 py-1",
          "smooth-transition hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/10 dark:hover:border-white/10",
          focused &&
            "bg-black/5! dark:bg-white/5! border-black/10! dark:border-white/10!",
          classNames?.base,
        )}
        style={style}
      >
        {startContent && <div className="mr-1">{startContent}</div>}
        <div
          className={clsx(
            "relative flex flex-1 min-w-0 overflow-hidden min-h-[1.5em] box-border",
            classNames?.inputWrapper,
          )}
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
        {endContent && <div className="ml-1">{endContent}</div>}
      </div>
    </div>
  );
};
