"use client";

import { setCookie } from "cookies-next";
import packageJson from "../../package.json";
import Button from "./button";
import Chip from "./chip";

function Header() {
  return (
    <header className="py-4 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold">react-smooth-input</h1>
            <Chip className="text-xs font-semibold">
              v{packageJson.version}
            </Chip>
          </div>
          <div className="text-gray-600 text-xs">
            A playground to test the react-smooth-input library.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/ponlponl123/react-smooth-input"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              isOnlyIcon={true}
              onClick={() => {
                document.documentElement.classList.toggle("dark");
                const isDark =
                  document.documentElement.classList.contains("dark");
                const theme = isDark ? "dark" : "light";
                setCookie("theme", theme);
                localStorage.setItem("theme", theme);
              }}
              className="smooth-transition p-2 h-max gap-2 hover:bg-black/20 hover:dark:bg-white/20 rounded-full border-2 dark:border-white/40 border-black/20 hover:opacity-80"
            >
              <svg
                height="16"
                aria-hidden="true"
                viewBox="0 0 24 24"
                version="1.1"
                width="16"
                data-view-component="true"
                className="octicon octicon-mark-github v-align-middle dark:fill-white fill-black"
              >
                <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
              </svg>
              <span>Github</span>
            </Button>
          </a>
          <Button
            isOnlyIcon={true}
            onClick={() => {
              document.documentElement.classList.toggle("dark");
              const isDark =
                document.documentElement.classList.contains("dark");
              const theme = isDark ? "dark" : "light";
              setCookie("theme", theme);
              localStorage.setItem("theme", theme);
            }}
            className="smooth-transition p-2 hover:bg-gray-900 hover:dark:bg-amber-300 h-max rounded-full border-2 dark:border-white/40 border-black/20 hover:opacity-80"
          >
            <span className="hidden dark:block">☀️</span>
            <span className="dark:hidden">🌙</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
