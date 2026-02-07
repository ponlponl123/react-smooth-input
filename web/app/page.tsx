"use client";

import Button from "@/components/button";
import Code from "@/components/code";
import {
  ArrowRightIcon,
  FileTsxIcon,
  PackageIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import Link from "next/link";
import React from "react";

gsap.registerPlugin(SplitText, TextPlugin);

export default function Home() {
  const titleref = React.useRef<HTMLHeadingElement>(null);
  const titleref2 = React.useRef<HTMLHeadingElement>(null);
  const pareref = React.useRef<HTMLParagraphElement>(null);
  const cursor = React.useRef<HTMLDivElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!titleref.current || !pareref.current || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({});
      const split = new SplitText(titleref.current!, { type: "chars" });
      const splitInitial = new SplitText(titleref2.current!, { type: "chars" });
      const splitPara = new SplitText(pareref.current!, { type: "words" });

      // Combine all title chars into one continuous array
      const allTitleChars = [...split.chars, ...splitInitial.chars];
      allTitleChars.forEach((char: Element) =>
        char.classList.add("gradient-char"),
      );

      // Hide all title chars initially
      gsap.set(allTitleChars, { opacity: 0, x: 32 });

      // Helper: smoothly animate centering when content width changes
      const smoothCenter = (onUpdate?: () => void) => {
        if (!wrapperRef.current) return;
        const beforeX = wrapperRef.current.getBoundingClientRect().left;
        onUpdate?.();
        const afterX = wrapperRef.current.getBoundingClientRect().left;
        const dx = beforeX - afterX;
        if (Math.abs(dx) > 0.5) {
          gsap.fromTo(
            wrapperRef.current,
            { x: `+=${dx}` },
            { x: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" },
          );
        }
      };

      tl.delay(0.48)
        // Animate ALL title chars continuously
        .to(allTitleChars, {
          duration: 0.7,
          opacity: 1,
          x: 0,
          ease: "power4",
          stagger: 0.04,
        })
        .from(
          splitPara.words,
          {
            duration: 0.64,
            opacity: 0,
            y: -32,
            rotation: "random(-32, 32)",
            ease: "back",
            stagger: 0.08,
          },
          "-=0.35",
        )
        .delay(1.2)
        // Cursor expands leftward to select "Text"
        .to(cursor.current, {
          width: () => (titleref2.current?.offsetWidth || 0) + 8,
          marginLeft: () => -(titleref2.current?.offsetWidth || 0) - 12,
          ease: "power2.out",
          duration: 0.8,
        })
        .delay(0.8)
        // Scale out + fade old text
        .to(titleref2.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          ease: "power2.in",
        })
        // Clear text, animate centering shift
        .call(() => {
          smoothCenter(() => {
            splitInitial.revert();
            if (titleref2.current) titleref2.current.textContent = "";
          });
        })
        // Cursor shrinks back to thin line
        .to(cursor.current, {
          width: "0.375rem",
          marginLeft: 4,
          ease: "power2.out",
          duration: 0.8,
        })
        .delay(0.8)
        // Type "Input" one char at a time with smooth centering
        .call(() => {
          if (!titleref2.current) return;
          titleref2.current.textContent = "";
          gsap.set(titleref2.current, { opacity: 1, scale: 1 });

          const word = "Input";
          word.split("").forEach((char, i) => {
            gsap.delayedCall(i * 0.12, () => {
              smoothCenter(() => {
                const span = document.createElement("span");
                span.textContent = char;
                span.classList.add("gradient-char");
                span.style.display = "inline-block";
                titleref2.current!.appendChild(span);
              });
              // Animate the newly added char
              const lastChild = titleref2.current!.lastElementChild;
              if (lastChild) {
                gsap.from(lastChild, {
                  opacity: 0,
                  x: 24,
                  scale: 0.5,
                  duration: 0.5,
                  ease: "back.out(1.7)",
                });
              }
            });
          });
        });

      return () => {
        tl.kill();
        split.revert();
        splitInitial.revert();
        splitPara.revert();
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-5">
      <div className="flex flex-col items-center text-center pb-20 px-4">
        <AnimatePresence>
          {[
            <motion.div
              key="hero-pill"
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.48,
                type: "spring",
                bounce: 0.3,
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-indigo-950/40 text-blue-600 text-sm font-medium mb-6"
            >
              <SparkleIcon weight="fill" size={16} />
              <span>Modern React Component Library</span>
            </motion.div>,
            <motion.div
              key="hero-title"
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.48,
                delay: 0.1,
                type: "spring",
                bounce: 0.3,
              }}
              ref={wrapperRef}
              className="flex flex-1 gap-2.5 items-center relative mb-6 justify-center"
            >
              <h1
                ref={titleref}
                className="font-extrabold text-5xl sm:text-6xl whitespace-nowrap leading-tight max-w-4xl"
              >
                React Smooth{" "}
              </h1>
              <strong
                ref={titleref2}
                className="font-extrabold text-5xl sm:text-6xl whitespace-nowrap leading-tight max-w-4xl gradient-char"
              >
                Text
              </strong>
              <motion.div
                ref={cursor}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                className="w-1.5 h-12 shrink-0 ml-1"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.48, delay: 1.6 }}
                  className="w-full h-full bg-rose-400 rounded-lg"
                />
              </motion.div>
            </motion.div>,
          ]}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.48, delay: 0.2 }}
          ref={pareref}
          className="text-sm text-gray-600 dark:text-gray-400 max-w-lg mb-8"
        >
          A smooth, modern React input component library built for Next.js with
          beautiful animations and seamless user experience.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.3 }}
        >
          <Link href="/installation">
            <Button className="inline-flex items-center gap-2 px-6 py-3 bg-rose-400 hover:bg-rose-500! text-white text-sm! rounded-full! font-medium group">
              Installation Guide
              <ArrowRightIcon
                weight="bold"
                size={16}
                className="group-hover:translate-x-0.5 smooth-transition"
              />
            </Button>
          </Link>
        </motion.div>
        <br />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.4 }}
          className="w-full max-w-md mt-6 mb-12 flex flex-col items-center gap-4"
        >
          <Code
            showLineNumbers={false}
            darkMode={true}
            classNames={{
              container: "w-full",
            }}
            tabs={[
              {
                codeString: "npm install react-smooth-input",
                title: "npm",
                language: "shell",
              },
              {
                codeString: "bun add react-smooth-input",
                title: "bun",
                language: "shell",
              },
            ]}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.48 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.48, delay: 0.1 }}
          className="p-6 rounded-3xl bg-blue-600/10"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
            <SparkleIcon size={24} className="text-blue-600" weight="fill" />
          </div>
          <h3 className="text-lg font-bold mb-2">Smooth Animations</h3>
          <p className="text-gray-600 text-xs">
            Beautiful character-by-character animations that enhance user
            experience without compromising performance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.48, delay: 0.2 }}
          className="p-6 rounded-3xl bg-purple-600/10"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
            <PackageIcon size={24} className="text-purple-600" weight="fill" />
          </div>
          <h3 className="text-lg font-bold mb-2">Built for Next.js</h3>
          <p className="text-gray-600 text-xs">
            Optimized for Next.js applications with TypeScript support and
            Tailwind CSS integration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.48, delay: 0.3 }}
          className="p-6 rounded-3xl bg-green-600/10"
        >
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
            <SparkleIcon size={24} className="text-green-600" weight="fill" />
          </div>
          <h3 className="text-lg font-bold mb-2">Easy to Use</h3>
          <p className="text-gray-600 text-xs">
            Simple API with sensible defaults. Drop it in and it just works with
            minimal configuration.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.48 }}
        className="py-12 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Quick Start</h2>
        <Code
          tabs={[
            {
              title: "page.tsx",
              icon: <FileTsxIcon weight="fill" size={16} />,
              codeString: `import { Input } from "react-smooth-input";

export default function Page() {
  return (
    <div className="p-4">
      <Input 
        label="Username" 
        placeholder="Enter your username" 
      />
    </div>
  );
}`,
              language: "typescript",
            },
          ]}
          showLineNumbers={false}
          darkMode={true}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.48 }}
        className="text-center py-12"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-gray-600 mb-6">
          Explore the demo to see all the features and variations.
        </p>
        <Link href="/input">
          <Button className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700! text-white text-sm! rounded-full! font-medium group">
            Explore Demo
            <ArrowRightIcon
              weight="bold"
              size={16}
              className="group-hover:translate-x-0.5 smooth-transition"
            />
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}
