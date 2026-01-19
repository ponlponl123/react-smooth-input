"use client";

import clsx from "clsx";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Button from "./button";

function Code({
  tabs = [],
  className,
  classNames,
  showLineNumbers = true,
  wrapLines = true,
  darkMode,
}: {
  tabs: Array<{
    codeString: string;
    language?: string;
    title?: string;
    icon?: React.ReactNode;
  }>;
  className?: string;
  classNames?: {
    container?: string;
    title?: {
      base?: string;
      container?: string;
      text?: string;
      icon?: string;
      clipboard?: {
        button?: string;
        icon?: string;
      };
    };
    content?: string;
  };
  showLineNumbers?: boolean;
  wrapLines?: boolean;
  darkMode?: boolean;
}) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  return (
    <div className={clsx("flex flex-col", classNames?.container)}>
      <div
        className={clsx(
          "p-3 flex items-center justify-between px-4 bg-black/10 dark:bg-white/10 rounded-t-lg",
          classNames?.title?.base,
        )}
      >
        <div className="flex items-center gap-1">
          {tabs.length > 1 ? (
            tabs.map((tab, index) => (
              <Button
                className={clsx(
                  "flex items-center gap-2",
                  classNames?.title?.container,
                )}
                key={index}
                onClick={() => setCurrentTabIndex(index)}
                isActive={currentTabIndex === index}
              >
                {tab.icon && (
                  <div className={clsx(classNames?.title?.icon)}>
                    {tab.icon}
                  </div>
                )}
                <h1
                  className={clsx(
                    "text-xs font-semibold",
                    classNames?.title?.text,
                  )}
                >
                  {tab.title}
                </h1>
              </Button>
            ))
          ) : (
            <div
              className={clsx(
                "flex items-center gap-2",
                classNames?.title?.container,
              )}
            >
              {tabs[0].icon && (
                <div className={clsx(classNames?.title?.icon)}>
                  {tabs[0].icon}
                </div>
              )}
              <h1
                className={clsx(
                  "text-xs font-semibold",
                  classNames?.title?.text,
                )}
              >
                {tabs[0].title}
              </h1>
            </div>
          )}
        </div>
        <Button
          className={clsx("-m-1 text-xs", classNames?.title?.clipboard?.button)}
          isOnlyIcon={true}
          onClick={() => {
            navigator.clipboard.writeText(tabs[currentTabIndex].codeString);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 256 256"
            fill="currentColor"
            className={classNames?.title?.clipboard?.icon}
          >
            <path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"></path>
          </svg>
        </Button>
      </div>
      <SyntaxHighlighter
        language={tabs[currentTabIndex].language}
        showLineNumbers={showLineNumbers}
        wrapLines={wrapLines}
        className={clsx("rounded-b-lg m-0! text-sm", className)}
        style={darkMode ? dark : undefined}
      >
        {tabs[currentTabIndex].codeString}
      </SyntaxHighlighter>
    </div>
  );
}

export default Code;
