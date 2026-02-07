"use client";
import React from "react";
import { Input } from "../../../src";

function Example() {
  const [val, setVal] = React.useState<string>("");
  return (
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
              value={val}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setVal(e.target.value)}
              className=""
            />
            <Input
              label="Password"
              placeholder="abc123xyz!"
              type="password"
              value={val}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setVal(e.target.value)}
              className=""
            />
            <div className="flex">
              <button className="smooth-transition text-left p-2 -my-1 font-semibold text-xs text-black/20 dark:text-white/20 hover:bg-black/10 dark:hover:bg-white/5 rounded-lg active:scale-[0.98] active:duration-75">
                Forgot your password?
              </button>
            </div>
            <div className="flex items-center justify-between flex-1 gap-2.5">
              <button
                className="smooth-transition py-3 px-4 bg-cyan-600 text-white w-full rounded-xl font-semibold text-sm hover:opacity-75 active:scale-[0.98] active:duration-75!"
                onClick={() => alert(`Value is: ${val}`)}
              >
                Sign in
              </button>
              <button
                className="smooth-transition py-3 px-4 bg-black/10 dark:bg-white/10 w-full rounded-xl font-semibold text-sm hover:opacity-75 active:scale-[0.98] active:duration-75!"
                onClick={() => setVal("")}
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
  );
}

export default Example;
