import Code from "@/components/code";
import Step from "@/components/step";
import Link from "next/link";

import Image from "next/image";
import NextJS from "../../public/nextjs.svg";
import Vite from "../../public/vite.svg";

function Page() {
  return (
    <main className="p-5 flex flex-col gap-8 max-w-3xl mx-auto">
      <section>
        <h1 className="text-3xl font-bold mb-4">Installation</h1>
        <span className="font-semibold">Requirements:</span>
        <ul className="list-disc list-inside my-2">
          <li className="mb-2">
            <Link
              href="https://reactjs.org/"
              target="_blank"
              className="font-bold"
            >
              React 18
            </Link>{" "}
            or later.
          </li>
          <li className="mb-2">
            <Link
              href="https://tailwindcss.com/"
              target="_blank"
              className="font-bold"
            >
              Tailwind CSS v4
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="https://motion.dev/"
              target="_blank"
              className="font-bold"
            >
              Motion 12
            </Link>
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Get started</h2>
        <p>
          The easiest way to install Smooth Input is via npm or bun. Run one of
          the following commands in your project directory:
        </p>
        <Step className="mt-6">
          <div className="flex flex-col gap-2" data-title="Install Package">
            <p>To install react-smooth-input, run:</p>
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
          </div>
          <div className="flex flex-col gap-2" data-title="TailwindCSS Setup">
            <p>
              react-smooth-input requires Tailwind CSS v4 for styling. Make sure
              you have Tailwind CSS v4 installed and configured in your project.
              You can follow the official Tailwind CSS installation guide{" "}
              <Link
                href="https://tailwindcss.com/docs/installation"
                target="_blank"
                className="text-blue-600 underline"
              >
                here
              </Link>
              .
            </p>
            <p>Then add the following code to your main CSS file:</p>
            <Code
              showLineNumbers={false}
              darkMode={true}
              tabs={[
                {
                  codeString: `@import "tailwindcss";
                  
/* Note: You may need to change the path to fit your project structure */
@source '../../node_modules/react-smooth-input/dist/**/*.{js,mjs}';`,
                  title: "main.css",
                  language: "css",
                },
              ]}
            />
          </div>
          <div data-title="Enjoy!">
            <p>
              You're all set! You can now start using react-smooth-input in your
              React projects.
            </p>
            <p>Happy coding!</p>
          </div>
        </Step>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Framework Guides</h2>
        <p>
          For detailed installation instructions tailored to specific
          frameworks, please refer to the respective guides.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Link
            href="/frameworks/nextjs"
            className="p-3 flex gap-3 items-center rounded-4xl border-2 border-transparent bg-black/10 hover:bg-black/5 hover:border-black/5 dark:bg-white/10 dark:hover:bg-white/5 dark:hover:border-white/5 active:scale-[0.98] active:opacity-90 active:duration-75 smooth-transition"
          >
            <div className="p-2 bg-black/10 dark:bg-white/10 rounded-full">
              <Image src={NextJS} alt="Next.js Logo" width={32} height={32} />
            </div>
            <h3 className="text-base font-semibold">
              Next.js Installation Guide
            </h3>
          </Link>
          <Link
            href="/frameworks/vite"
            className="p-3 flex gap-3 items-center rounded-4xl border-2 border-transparent bg-black/10 hover:bg-black/5 hover:border-black/5 dark:bg-white/10 dark:hover:bg-white/5 dark:hover:border-white/5 active:scale-[0.98] active:opacity-90 active:duration-75 smooth-transition"
          >
            <div className="p-3 bg-black/10 dark:bg-white/10 rounded-full">
              <Image src={Vite} alt="Vite Logo" width={24} height={24} />
            </div>
            <h3 className="text-base font-semibold">Vite Installation Guide</h3>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Page;
