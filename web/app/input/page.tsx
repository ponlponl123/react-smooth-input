"use client";

import API from "./api";
import CustomStyle from "./custom-style";
import EasyToUse from "./easy-to-use";
import Example from "./example";
import Intro from "./intro";
import WithIcon from "./with-icon";

export default function Home() {
  return (
    <main className="max-w-150 mx-auto p-5 flex flex-col gap-5">
      <Intro />
      <Example />
      <EasyToUse />
      <WithIcon />
      <CustomStyle />
      <API />
    </main>
  );
}
