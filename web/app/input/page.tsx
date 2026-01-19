"use client";

// Import from the source during development
import Accordion from "@/components/accordion";
import Chip from "@/components/chip";
import Code from "@/components/code";
import {
  FileTsxIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react/dist/ssr";
import { SetStateAction, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Input } from "../../../src/index";

export default function Home() {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val, setVal] = useState("");
  const [showCode, setShowCode] = useState(false);

  return (
    <main className="max-w-150 mx-auto p-5 flex flex-col gap-5">
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
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
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
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
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

      <section className="my-6">
        <h1 className="font-bold text-2xl mb-4">Example</h1>
        <p className="text-sm opacity-40 mb-4">
          A demo sign-in card built with react-smooth-input
        </p>
        <div className="w-full relative border-2 border-black/10 dark:border-white/10 rounded-3xl p-12">
          <div className="p-6 border-2 border-gray-200 dark:bg-white/10 dark:border-transparent rounded-3xl max-w-md w-full mx-auto smooth-transition">
            <h2 className="font-bold text-2xl mb-1">👋 Welcome aboard!</h2>
            <p className="opacity-40 text-sm font-semibold">
              *Demo sign in card with react-smooth-input
            </p>
            <br />
            <div className="flex flex-col gap-4">
              <Input
                label="Email"
                placeholder="example@example.com"
                type="text"
                value={val2}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setVal2(e.target.value)
                }
                className=""
              />
              <Input
                label="Password"
                placeholder="abc123xyz!"
                type="password"
                value={val2}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setVal2(e.target.value)
                }
                className=""
              />
              <div className="flex">
                <button className="smooth-transition text-left p-2 -my-1 font-semibold text-xs text-black/20 dark:text-white/20 hover:bg-black/10 dark:hover:bg-white/5 rounded-lg active:scale-[0.98] active:duration-75">
                  Forgot your password?
                </button>
              </div>
              <div className="flex items-center justify-between flex-1 gap-2.5">
                <button
                  className="smooth-transition py-3 px-4 bg-cyan-600 text-white w-full rounded-xl font-semibold text-sm hover:opacity-75 active:scale-[0.98] active:duration-75"
                  onClick={() => alert(`Value is: ${val2}`)}
                >
                  Sign in
                </button>
                <button
                  className="smooth-transition py-3 px-4 bg-black/10 dark:bg-white/10 w-full rounded-xl font-semibold text-sm hover:opacity-75 active:scale-[0.98] active:duration-75"
                  onClick={() => setVal2("")}
                >
                  Clear
                </button>
              </div>
              <div className="flex w-full justify-center items-center text-center opacity-20 text-xs mt-2">
                <p className="text-center">
                  terms and conditions, bra bra bra...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-6">
        <h1 className="font-bold text-2xl mb-4">Easy to use</h1>
        <p className="text-sm opacity-40 mb-4">
          Get started in minutes with a simple and intuitive API.
        </p>
        <Code
          tabs={[
            {
              icon: <FileTsxIcon weight="fill" size={20} />,
              title: "page.tsx",
              codeString: `import { Input } from "react-smooth-input";

export default function Page() {
  return (
    <div>
      <Input 
        label="I&apos;m a label!" 
        placeholder="Type here..." 
      />
    </div>
  );
}`,
              language: "tsx",
            },
          ]}
          showLineNumbers={false}
          wrapLines={false}
          darkMode={true}
        />
        <br />
        <h2 className="font-semibold text-xl mb-2">Result</h2>
        <Input
          label="I'm a label!"
          placeholder="Type here..."
          type="text"
          className=""
        />
      </section>

      <section className="my-6">
        <h1 className="font-bold text-2xl mb-4">With icon</h1>
        <p className="text-sm opacity-40 mb-4">
          Easily add icons or any other elements to the start or end of the
          input field.
        </p>
        <Code
          tabs={[
            {
              title: "page.tsx",
              icon: <FileTsxIcon weight="fill" size={20} />,
              codeString: `import { Input } from "react-smooth-input";

export default function Page() {
  return (
    <div>
      <Input 
        label="Input with Icons" 
        placeholder="Type here..." 
        ...
        startContent={<icon />}
        endContent={<icon />}
      />
    </div>
  );
}`,
              language: "tsx",
            },
          ]}
          showLineNumbers={false}
          wrapLines={false}
          darkMode={true}
        />
        <br />
        <div className="w-full relative border-2 border-black/10 dark:border-white/10 rounded-3xl px-12 py-24">
          <div className="absolute top-2 left-2">
            <Chip>startContent</Chip>
          </div>
          <Input
            placeholder="Type here..."
            type="text"
            startContent={<MagnifyingGlassIcon weight="bold" size={16} />}
          />
        </div>
        <br />
        <div className="w-full relative border-2 border-black/10 dark:border-white/10 rounded-3xl px-12 py-24">
          <div className="absolute top-2 right-2">
            <Chip>endContent</Chip>
          </div>
          <Input
            placeholder="Type here..."
            type="text"
            endContent={<MagnifyingGlassIcon weight="bold" size={16} />}
          />
        </div>
        <br />
        <div className="w-full relative border-2 border-black/10 dark:border-white/10 rounded-3xl px-12 py-24">
          <div className="absolute top-2 left-2">
            <Chip>startContent</Chip>
          </div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2">
            <Chip>+</Chip>
          </div>
          <div className="absolute top-2 right-2">
            <Chip>endContent</Chip>
          </div>
          <Input
            placeholder="Type here..."
            type="text"
            startContent={<span className="text-sm">https://</span>}
            endContent={<span className="text-sm">.com</span>}
          />
        </div>
      </section>

      <section className="my-6">
        <h1 className="font-bold text-2xl mb-4">Custom Styles</h1>
        <p className="text-sm opacity-40 mb-4">
          Customize the appearance of the Input component using the classNames
          prop.
        </p>

        <Input
          label="Label"
          placeholder="Type here..."
          type="text"
          value={val}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setVal(e.target.value)
          }
        />
        <br />
        <Input
          label="Separate Markup and Legacy input"
          placeholder="Placeholder"
          type="text"
          value={val}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setVal(e.target.value)
          }
          classNames={{
            markupInput: {
              container: "w-full",
            },
            legacyInput:
              "opacity-100 relative outline-1 !caret-black dark:!caret-white !bg-white dark:!border-white dark:!bg-black border-2 !border-black  rounded-sm",
          }}
        />
        <br />
        <Input
          label="Custom styles"
          placeholder="Fun... right?"
          type="text"
          value={val}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setVal(e.target.value)
          }
          classNames={{
            container: "group",
            label:
              "text-transparent bg-gradient-to-r from-green-500 to-pink-500 bg-clip-text font-bold w-max",
            base: "bg-gradient-to-r from-purple-500/20 to-green-500/20 !rounded-full p-1 smooth-transition",
            markupInput: {
              base: "rounded-xl",
              placeholder: {
                text: "italic dark:text-white text-purple-900",
              },
              cursor: {
                base: {
                  notSelected: "!bg-gradient-to-b from-green-500 to-pink-500",
                },
              },
            },
            legacyInput:
              "!bg-white dark:!bg-gray-900 rounded-xl !border-0 !caret-pink-500",
          }}
        />
        <br />
        <Input
          label="Legacy but smooth~"
          placeholder="legacy + smooth... ah... smooth-legacy"
          type="text"
          value={val}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setVal(e.target.value)
          }
          classNames={{
            container: "group",
            base: "bg-white dark:bg-black border-2 !border-black dark:!border-white !rounded-md !py-0 !px-1 smooth-transition",
            legacyInput:
              "!bg-white dark:!bg-gray-900 rounded-xl !border-0 !caret-pink-500",
            markupInput: {
              cursor: {
                base: {
                  isTextSelected: "!bg-blue-500/30 outline-none",
                },
              },
            },
          }}
        />

        <div className="mt-5 p-6 rounded-xl bg-black/10 dark:bg-white/10 w-full wrap-break-word">
          <strong className="text-gray-700 dark:text-white/40">
            Current Value:
          </strong>{" "}
          {val || "(empty)"}
        </div>
      </section>
    </main>
  );
}
