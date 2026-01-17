"use client";

// Import from the source during development
import { SetStateAction, useState } from "react";
import { Input } from "../../src/index";

export default function Home() {
  const [val, setVal] = useState("");

  return (
    <main className="max-w-150 mx-auto my-10 p-5 flex flex-col gap-5">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">Smooth Input Playground</h1>
          <div className="text-gray-600">
            A playground to test the smooth-input library.
          </div>
        </div>
        <button
          onClick={() => {
            document.body.classList.toggle("dark");
          }}
          className="smooth-transition p-2 bg-sky-900 dark:bg-amber-300 h-max rounded-full border-2 border-white/40 hover:opacity-80"
        >
          <span className="hidden dark:block">☀️</span>
          <span className="dark:hidden">🌙</span>
        </button>
      </div>

      <div className="p-6 border-2 my-6 smooth-transition">
        <h2>Normal Input</h2>
        <div className="text-sm text-gray-600">
          This is a standard HTML input for comparison.
        </div>
        <div className="mt-2.5">
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full border-2 rounded-md"
            placeholder="Type something..."
          />
        </div>
      </div>

      <div className="p-6 border-2 border-gray-200 dark:bg-white/10 dark:border-transparent rounded-3xl max-w-md w-full mx-auto mb-6 smooth-transition">
        <h2 className="font-bold text-2xl mb-1">👋 Welcome aboard!</h2>
        <p className="opacity-40 text-sm font-semibold">
          *Demo sign in card with smooth-input
        </p>
        <br />
        <div className="flex flex-col gap-4">
          <Input
            label="Email"
            placeholder="example@example.com"
            type="text"
            value={val}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setVal(e.target.value)
            }
            className=""
          />
          <Input
            label="Password"
            placeholder="abc123xyz!"
            type="password"
            value={val}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setVal(e.target.value)
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
              onClick={() => alert(`Value is: ${val}`)}
            >
              Sign in
            </button>
            <button
              className="smooth-transition py-3 px-4 bg-black/10 dark:bg-white/10 w-full rounded-xl font-semibold text-sm hover:opacity-75 active:scale-[0.98] active:duration-75"
              onClick={() => setVal("")}
            >
              Clear
            </button>
          </div>
          <div className="flex w-full justify-center items-center text-center opacity-20 text-xs mt-2">
            <p className="text-center">terms and conditions, bra bra bra...</p>
          </div>
        </div>
      </div>

      <div className="p-6 border-2 border-gray-200 dark:border-white/10 rounded-3xl smooth-transition">
        <h2 className="font-bold text-2xl mb-4">with custom styles</h2>

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
          label="Saperate Markup and Legacy input"
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
            inputWrapper:
              "bg-gradient-to-r from-purple-500/20 to-green-500/20 !rounded-full p-1 smooth-transition",
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
            inputWrapper:
              "bg-white dark:bg-black border-2 !border-black dark:!border-white !rounded-md !p-0 smooth-transition",
            legacyInput:
              "!bg-white dark:!bg-gray-900 rounded-xl !border-0 !caret-pink-500",
          }}
        />

        <div className="mt-5 p-6 rounded-xl bg-black/10 dark:bg-white/10 w-full wrap-break-word">
          <strong className="text-gray-700 dark:text-white/40">
            Current Value:
          </strong>{" "}
          {val || "(empty)"}
        </div>
      </div>
      <section className="flex flex-col items-center gap-3 mt-12 text-center">
        <a href="https://github.com/ponlponl123/smooth-input" target="_blank">
          <svg
            height="32"
            aria-hidden="true"
            viewBox="0 0 24 24"
            version="1.1"
            width="32"
            data-view-component="true"
            className="octicon octicon-mark-github v-align-middle dark:fill-white fill-black"
          >
            <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
          </svg>
        </a>
        <a href="https://github.com/ponlponl123/smooth-input" target="_blank">
          <h2 className="text-2xl font-bold mb-2">Smooth-Input</h2>
        </a>
        <p className="text-gray-600">
          Made with ❤️ by{" "}
          <a
            href="https://github.com/ponlponl123"
            target="_blank"
            className="underline"
          >
            ponlponl123
          </a>
          .
        </p>
      </section>
    </main>
  );
}
