"use client";
import clsx from "clsx";
import React from "react";

function Step({
  children,
  className,
  classNames,
}: {
  children: React.ReactNode;
  className?: string;
  classNames?: {
    container?: string;
    step?: {
      indicator?: {
        base?: string;
        text?: string;
        line?: string;
      };
      base?: string;
      title?: string;
      contentWrapper?: string;
      content?: string;
    };
  };
}) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={clsx("flex flex-col", className, classNames?.container)}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={clsx("flex gap-3 min-h-32", classNames?.step?.base)}
        >
          <div
            className={clsx(
              "flex flex-col items-center",
              classNames?.step?.indicator?.base,
            )}
          >
            <span
              className={clsx(
                "p-1 flex items-center justify-center bg-black/10 dark:bg-white/10 rounded-full aspect-square border-2 border-black/10 dark:border-white/40 font-semibold",
                classNames?.step?.indicator?.text,
              )}
            >
              {index + 1}
            </span>
            <div
              className={clsx(
                "flex-1 w-0.5 bg-black/10 dark:bg-white/10 h-full",
                classNames?.step?.indicator?.line,
              )}
            />
          </div>
          <div
            className={clsx(
              "pb-6 pt-1.5 px-3 flex-1",
              classNames?.step?.contentWrapper,
            )}
          >
            {React.isValidElement(child) &&
              child.props &&
              child.props["data-title"] && (
                <h1 className={clsx("font-medium", classNames?.step?.title)}>
                  {child.props["data-title"]}
                </h1>
              )}
            <div
              className={clsx(
                "py-3 flex flex-col gap-2",
                classNames?.step?.content,
              )}
            >
              {child}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Step;
