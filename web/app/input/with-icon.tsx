"use client";
import {
  FileTsxIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Input } from "../../../src/index";
import Chip from "../../components/chip";
import Code from "../../components/code";

function WithIcon() {
  return (
    <section className="my-6">
      <h1 className="font-bold text-2xl mb-4">With icon</h1>
      <p className="text-sm opacity-40 mb-4">
        Easily add icons or any other elements to the start or end of the input
        field.
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
  );
}

export default WithIcon;
