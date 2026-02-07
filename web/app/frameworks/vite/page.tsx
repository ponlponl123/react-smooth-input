"use client";

import Button from "@/components/button";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import Vite from "../../../public/vite.svg";

function Page() {
  return (
    <div>
      <div className="text-center flex flex-col items-center gap-4 max-w-4xl mx-auto py-24 px-4">
        <Image src={Vite} alt="Vite Logo" width={56} height={56} />
        <br />
        <h1 className="text-4xl font-bold mb-4">Vite Framework Guide</h1>
        <p className="text-gray-600 mb-4 max-w-xl text-lg">
          We&apos;re currently crafting a specialized guide for Vite
          integration.
          <br className="hidden sm:block" />
          It&apos;s coming soon! For now, the standard installation works
          perfectly.
        </p>
        <Link href="/installation">
          <Button className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700! text-white text-sm! rounded-full! font-medium group">
            Installation Guide
            <ArrowRightIcon
              weight="bold"
              size={16}
              className="group-hover:translate-x-0.5 smooth-transition"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Page;
