"use client";

import clsx from "clsx";
import React, { forwardRef, useCallback, useEffect, useRef } from "react";
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
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    // Unified selection update function
    const updateSelection = useCallback(() => {
      const target = inputRef.current;
      if (target && onSelectionChange) {
        onSelectionChange(target.selectionStart ?? 0, target.selectionEnd ?? 0);
      }
    }, [onSelectionChange, inputRef]);

    // Poll for selection changes on iOS (fixes iOS selection issues)
    useEffect(() => {
      const target = inputRef.current;
      if (!target) return;

      let animationFrameId: number;
      let lastStart = target.selectionStart;
      let lastEnd = target.selectionEnd;

      const checkSelection = () => {
        if (document.activeElement === target) {
          const currentStart = target.selectionStart;
          const currentEnd = target.selectionEnd;

          if (currentStart !== lastStart || currentEnd !== lastEnd) {
            lastStart = currentStart;
            lastEnd = currentEnd;
            updateSelection();
          }
        }
        animationFrameId = requestAnimationFrame(checkSelection);
      };

      // Start polling when focused
      const handleFocus = () => {
        animationFrameId = requestAnimationFrame(checkSelection);
      };

      const handleBlur = () => {
        cancelAnimationFrame(animationFrameId);
      };

      target.addEventListener("focus", handleFocus);
      target.addEventListener("blur", handleBlur);

      // If already focused, start polling
      if (document.activeElement === target) {
        handleFocus();
      }

      return () => {
        cancelAnimationFrame(animationFrameId);
        target.removeEventListener("focus", handleFocus);
        target.removeEventListener("blur", handleBlur);
      };
    }, [updateSelection, inputRef]);

    return (
      <input
        className={clsx(
          "opacity-0 absolute w-full h-full z-1 border border-transparent outline-none bg-transparent p-0 m-0 box-border cursor-text caret-transparent pointer-events-auto touch-auto",
          classNames,
        )}
        style={{
          // Ensure the input is interactable on iOS
          WebkitUserSelect: "text",
          userSelect: "text",
          WebkitTouchCallout: "default",
          ...inputFontStyle,
        }}
        ref={inputRef}
        value={value}
        placeholder={props.placeholder}
        type={type}
        onChange={(e) => {
          onValueChange(e.target.value);
          onChange?.(e);
        }}
        onFocus={() => onFocusChange(true)}
        onBlur={() => onFocusChange(false)}
        onSelect={updateSelection}
        onKeyUp={updateSelection}
        onMouseUp={updateSelection}
        onTouchEnd={updateSelection}
        {...props}
      />
    );
  },
);

export default LegacyInput;

LegacyInput.displayName = "LegacyInput";
