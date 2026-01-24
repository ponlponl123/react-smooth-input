"use client";

import Button from "@/components/button";
import Code from "@/components/code";
import {
  ArrowRightIcon,
  FileTsxIcon,
  PackageIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-5">
      <div className="flex flex-col items-center text-center pb-20 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
          <SparkleIcon weight="fill" size={16} />
          <span>Modern React Component Library</span>
        </div>

        <h1 className="text-6xl font-bold mb-6 bg-linear-to-br from-sky-200 to-rose-300 dark:from-indigo-400 dark:to-rose-700 bg-clip-text text-transparent">
          React Smooth Input
        </h1>

        <p className="text-sm text-gray-600 max-w-lg mb-8">
          A smooth, modern React input component library built for Next.js with
          beautiful animations and seamless user experience.
        </p>
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
        <br />
        <div className="w-full max-w-md mt-6 mb-12 flex flex-col items-center gap-4">
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
                codeString: "bun install react-smooth-input",
                title: "bun",
                language: "shell",
              },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
        <div className="p-6 rounded-3xl bg-blue-600/10">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
            <SparkleIcon size={24} className="text-blue-600" weight="fill" />
          </div>
          <h3 className="text-lg font-bold mb-2">Smooth Animations</h3>
          <p className="text-gray-600 text-xs">
            Beautiful character-by-character animations that enhance user
            experience without compromising performance.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-purple-600/10">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
            <PackageIcon size={24} className="text-purple-600" weight="fill" />
          </div>
          <h3 className="text-lg font-bold mb-2">Built for Next.js</h3>
          <p className="text-gray-600 text-xs">
            Optimized for Next.js applications with TypeScript support and
            Tailwind CSS integration.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-green-600/10">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
            <SparkleIcon size={24} className="text-green-600" weight="fill" />
          </div>
          <h3 className="text-lg font-bold mb-2">Easy to Use</h3>
          <p className="text-gray-600 text-xs">
            Simple API with sensible defaults. Drop it in and it just works with
            minimal configuration.
          </p>
        </div>
      </div>

      <div className="py-12 max-w-3xl mx-auto">
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
      </div>

      <div className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-gray-600 mb-6">
          Explore the demo to see all the features and variations.
        </p>
        <Link href="/input">
          <Button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700! text-white text-sm! rounded-full! font-medium group">
            Explore Demo
            <ArrowRightIcon
              weight="bold"
              size={16}
              className="group-hover:translate-x-0.5 smooth-transition"
            />
          </Button>
        </Link>
      </div>
    </main>
  );
}
