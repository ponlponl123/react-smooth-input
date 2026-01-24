"use client";

import { FileTsxIcon } from "@phosphor-icons/react/dist/ssr";
import { Input } from "../../../src/index";
import Code from "../../components/code";

function EasyToUse() {
  return (
    <section className="my-6">
      <h1 className="font-bold text-2xl mb-4">Easy to use</h1>
      <p className="text-sm opacity-40 mb-4">
        Get started in minutes with a simple and intuitive API.
      </p>
      <Code
        tabs={[
          {
            icon: <FileTsxIcon weight="fill" size={20} />,
            title: "page.tsx",
            codeString: `import { Input } from "react-smooth-input";

export default function Page() {
  return (
    <div>
      <Input 
        label="I&apos;m a label!" 
        placeholder="Type here..." 
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
      <h2 className="font-semibold text-xl mb-2">Result</h2>
      <Input
        label="I'm a label!"
        placeholder="Type here..."
        type="text"
        className=""
      />
    </section>
  );
}

export default EasyToUse;
