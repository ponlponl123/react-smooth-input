"use client";

import clsx from "clsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Button from "./button";

function Code({
  codeString,
  language = "javascript",
  className,
  classNames,
  showLineNumbers = true,
  wrapLines = true,
  darkMode,
}: {
  codeString: string;
  language?: string;
  className?: string;
  classNames?: {
    container?: string;
    title?: {
      container?: string;
      text?: string;
      button?: string;
      icon?: string;
    };
    content?: string;
  };
  showLineNumbers?: boolean;
  wrapLines?: boolean;
  darkMode?: boolean;
}) {
  return (
    <div className={clsx("flex flex-col", classNames?.container)}>
      <div
        className={clsx(
          "p-3 flex items-center justify-between px-4 bg-black/10 dark:bg-white/10 rounded-t-lg",
          classNames?.title?.container,
        )}
      >
        <h1 className={clsx("text-xs font-semibold", classNames?.title?.text)}>
          Code Example
        </h1>
        <Button
          className={clsx("-m-1 text-xs", classNames?.title?.button)}
          isOnlyIcon={true}
          onClick={() => {
            navigator.clipboard.writeText(codeString);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"></path>
          </svg>
        </Button>
      </div>
      <SyntaxHighlighter
        language={language}
        showLineNumbers={showLineNumbers}
        wrapLines={wrapLines}
        className={clsx("rounded-b-lg m-0! text-sm", className)}
        style={darkMode ? dark : undefined}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}

export default Code;
