"use client";

import { motion } from "motion/react";
import React, { memo, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { InputMotionConfig } from "../../types/input";

export interface AnimatedCharProps {
  char: string;
  charId: number;
  className?: string;
  style?: React.CSSProperties;
  initial?: InputMotionConfig["initial"];
  animate?: InputMotionConfig["animate"];
  exit?: InputMotionConfig["exit"];
  transition?: InputMotionConfig["transition"];
}

/**
 * Memoized character component to prevent unnecessary re-renders
 * Used for smooth input animations
 */
export const AnimatedChar = memo(function AnimatedChar({
  char,
  charId,
  className,
  style,
  initial,
  animate,
  exit,
  transition,
}: AnimatedCharProps) {
  // Pre-compute exit rotation to avoid Math.random() on each render
  const exitRotation = useRef((charId % 40) - 20);

  return (
    <motion.span
      className={twMerge("inline-block", className)}
      style={{
        minWidth: char === " " ? "0.25em" : "auto",
        ...style,
      }}
      initial={initial ?? { opacity: 0, y: 16 }}
      animate={animate ?? { opacity: 1, y: 0 }}
      exit={
        exit ?? {
          opacity: 0,
          y: 16,
          rotateZ: exitRotation.current,
        }
      }
      transition={transition ?? { duration: 0.12 }}
    >
      {char}
    </motion.span>
  );
});
