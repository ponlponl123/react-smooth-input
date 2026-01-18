"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import React, { memo, useRef } from "react";

export interface AnimatedCharProps {
  char: string;
  charId: number;
  className?: string;
  style?: React.CSSProperties;
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
}: AnimatedCharProps) {
  // Pre-compute exit rotation to avoid Math.random() on each render
  const exitRotation = useRef((charId % 40) - 20);

  return (
    <motion.span
      className={clsx("inline-block", className)}
      style={{
        minWidth: char === " " ? "0.25em" : "auto",
        ...style,
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: 16,
        rotateZ: exitRotation.current,
      }}
      transition={{ duration: 0.12 }}
    >
      {char}
    </motion.span>
  );
});
