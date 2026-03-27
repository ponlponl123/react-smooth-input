"use client";

import { FileTsxIcon } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import { Input } from "../../../src/index";
import Code from "../../components/code";

function Listening() {
  const [state, setState] = React.useState(false);
  return (
    <section className="my-6">
      <h1 className="font-bold text-2xl mb-4">Listening</h1>
      <p className="text-sm opacity-40 mb-4">Use same props with HTML Input</p>
      <Code
        tabs={[
          {
            icon: <FileTsxIcon weight="fill" size={20} />,
            title: "page.tsx",
            codeString: `import React from "react";
import { Input } from "react-smooth-input";

export default function Page() {
  const [state, setState] = React.useState(false);
  return (
    <div>
      <Input 
        label="I&apos;m a label!" 
        placeholder="Type here..." 
        onFocus={()=>setState(true)}
        onBlur={()=>setState(false)}
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
      <ul>
        <li>
          <span>State: </span>
          <code>{String(state)}</code>
        </li>
      </ul>
      <br />
      <Input
        label="I'm a label!"
        placeholder="Type here..."
        type="text"
        className=""
        onFocus={() => setState(true)}
        onBlur={() => setState(false)}
      />
    </section>
  );
}

export default Listening;
