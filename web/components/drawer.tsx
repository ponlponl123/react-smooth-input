"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Accordion from "./accordion";
import Button from "./button";

const accordionClassNames = {
  content: "flex flex-col gap-1",
  button: "bg-transparent!",
};

function Drawer() {
  const pathname = usePathname();
  return (
    <div className="smooth-transition p-4 py-6 max-w-52 rounded-r-2xl w-full sticky top-0 h-screen">
      <Accordion
        title="Getting Started"
        classNames={accordionClassNames}
        defaultOpen={true}
      >
        <Link href="/">
          <Button isActive={pathname === "/"} className="w-full">
            Introduction
          </Button>
        </Link>
        <Link href="/installation">
          <Button isActive={pathname === "/installation"} className="w-full">
            Installation
          </Button>
        </Link>
      </Accordion>
      <Accordion
        title="Frameworks"
        classNames={accordionClassNames}
        defaultOpen={true}
      >
        <Link href="/frameworks/nextjs">
          <Button
            isActive={pathname === "/frameworks/nextjs"}
            className="w-full"
          >
            Next.js
          </Button>
        </Link>
        <Link href="/frameworks/vite">
          <Button isActive={pathname === "/frameworks/vite"} className="w-full">
            Vite
          </Button>
        </Link>
      </Accordion>
      <Accordion title="Customization" classNames={accordionClassNames}>
        <span className="text-xs">soon...</span>
      </Accordion>
      <Accordion
        title="Components"
        classNames={accordionClassNames}
        defaultOpen={true}
      >
        <Link href="/input">
          <Button isActive={pathname === "/input"} className="w-full">
            Input
          </Button>
        </Link>
        <Link href="/textarea">
          <Button isActive={pathname === "/textarea"} className="w-full">
            TextArea
          </Button>
        </Link>
      </Accordion>
    </div>
  );
}

export default Drawer;
