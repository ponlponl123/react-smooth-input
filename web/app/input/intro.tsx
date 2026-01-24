"use client";
import Accordion from "@/components/accordion";
import Code from "@/components/code";
import { FileTsxIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Input } from "../../../src/index";

function Intro() {
  const [val, setVal] = useState("");
  const [showCode, setShowCode] = useState(false);

  return (
    <>
      <div className="p-6 border-2 smooth-transition">
        <h1>Normal Input</h1>
        <p className="text-sm text-gray-600">
          This is a standard HTML input for comparison.
        </p>
        <div className="mt-2.5">
          <input
            type="text"
            className="w-full border-2 rounded-md"
            placeholder="Type something..."
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <button
            className="classic-btn"
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? "Hide" : "Show"} Code
          </button>
          {showCode && (
            <div className="mt-4">
              <SyntaxHighlighter
                language="tsx"
                showLineNumbers={false}
                wrapLines={false}
                style={dark}
              >
                {`<input
  type="text"
  placeholder="Type something..."
/>`}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      </div>
      <span className="mx-auto font-semibold text-sm opacity-30">VS</span>
      <div className="w-full max-w-xl rounded-2xl p-6 mx-auto bg-black/5 dark:bg-white/10 backdrop-blur-2xl backdrop-saturate-200">
        <h1 className="text-xl font-bold">With react-smooth-input</h1>
        <p className="mt-2 text-sm opacity-70">
          Experience the future of text input with react-smooth-input! Enjoy
          seamless typing, enhanced aesthetics, and unparalleled responsiveness.
          Dive in and feel the difference!
        </p>

        <div className="mt-4">
          <Input
            placeholder="Type something..."
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </div>
        <Accordion
          title="Show Code"
          classNames={{ container: "mt-4 mb-0!", button: "w-max gap-2" }}
        >
          <Code
            tabs={[
              {
                title: "Code Example",
                icon: <FileTsxIcon weight="fill" size={20} />,
                codeString: `<Input
  type="text"
  placeholder="Type something..."
/>`,
                language: "tsx",
              },
            ]}
            showLineNumbers={false}
            wrapLines={false}
            darkMode={true}
          />
        </Accordion>
      </div>
    </>
  );
}

export default Intro;
