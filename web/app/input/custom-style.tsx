"use client";
import { BreadIcon } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { motion } from "motion/react";
import { SetStateAction, useState } from "react";
import { Input } from "../../../src/index";

function CustomStyle() {
  const [val, setVal] = useState("");
  return (
    <section className="my-6">
      <motion.div
        initial={{ opacity: 0, y: 16, rotateZ: 0 }}
        exit={{ opacity: 0, y: 8, rotateZ: 0 }}
        whileInView={{ opacity: 1, y: 0, rotateZ: -2 }}
        transition={{
          duration: 0.48,
          ease: "easeInOut",
          type: "spring",
          delay: 0.1,
        }}
        className="relative px-6 py-3 bg-orange-200 rounded-2xl max-w-max border-4 border-orange-300 mb-6 text-white font-semibold"
      >
        <svg
          className="absolute bottom-0 left-1/4 translate-y-full -translate-x-1/2 w-6 h-4 text-orange-300"
          viewBox="0 0 24 19"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.2827 17.6366C11.1219 18.9197 12.9691 18.9197 13.8083 17.6366L22.9568 3.6486C23.9515 2.12774 22.8601 0.0834961 21.043 0.0834961H3.04797C1.23091 0.0834961 0.139454 2.12774 1.13419 3.6486L10.2827 17.6366Z" />
        </svg>
        <h1 className="font-bold dark:text-black/60 text-xl tracking-wider">
          Custom Styles
        </h1>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 0.4, y: 0 }}
        transition={{ duration: 0.24, delay: 0.2 }}
        className="text-sm opacity-40 mb-6 font-bold mx-8 p-3 bg-black/5 dark:bg-white/10 rounded-xl border-2 border-black/10 dark:border-white/10 backdrop-blur-3xl backdrop-saturate-200"
      >
        Customize the appearance of the Input component using the classNames
        prop.
      </motion.p>

      <Input
        label={
          <span className="flex items-center gap-1 text-sm font-semibold">
            <BreadIcon weight="fill" size={20} /> Bake a bun!
          </span>
        }
        customMotion={{
          char: {
            initial: {
              opacity: 0,
              scale: 0,
            },
            animate: {
              opacity: 1,
              scale: 1,
            },
            exit: {
              opacity: 0,
              scale: 2,
            },
          },
        }}
        classNames={{
          base: clsx(
            "border-[3px] bg-orange-200/60 border-orange-100 hover:bg-orange-50",
            "hover:border-orange-300/40 hover:bg-orange-100/80",
            "data-[focused=true]:border-orange-400/20! data-[focused=true]:bg-orange-100/90!",
            "dark:bg-orange-200/40 dark:border-orange-300/80 dark:hover:bg-orange-50",
            "dark:hover:border-orange-200/60 dark:hover:bg-orange-300/30",
            "dark:data-[focused=true]:border-orange-300/60! dark:data-[focused=true]:bg-orange-300/20!",
            "px-4 py-2 rounded-2xl smooth-transition",
          ),
          markupInput: {
            placeholder: {
              text: "font-bold! text-orange-900 dark:text-orange-100",
            },
          },
        }}
        fontStyle={{
          fontFamily: "var(--font-display)",
          fontWeight: "bold",
          fontSize: "14px",
          letterSpacing: "1px",
        }}
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
  );
}

export default CustomStyle;
