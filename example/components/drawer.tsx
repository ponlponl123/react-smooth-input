"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Accordion from "./accordion";
import Button from "./button";

function Drawer() {
  const pathname = usePathname();
  return (
    <div className="smooth-transition p-4 py-6 max-w-52 rounded-r-2xl w-full sticky top-0 h-screen">
      <Accordion title="Getting Started">
        <span className="text-xs">soon...</span>
      </Accordion>
      <Accordion title="Frameworks">
        <span className="text-xs">soon...</span>
      </Accordion>
      <Accordion title="Customization">
        <span className="text-xs">soon...</span>
      </Accordion>
      <Accordion
        title="Components"
        classNames={{
          content: "flex flex-col gap-1",
        }}
        defaultOpen={true}
      >
        <Link href="/">
          <Button isActive={pathname === "/"} className="w-full">
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
