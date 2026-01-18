import type { Metadata } from "next";

import Drawer from "@/components/drawer";
import Footer from "@/components/footer";
import Header from "@/components/header";
import "./global.css";
import { ThemeBody } from "./ThemeBody";

export const metadata: Metadata = {
  title: "Smooth Input Playground",
  description: "Dev playground for smooth-input library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeBody>
        <Header />
        <main id="layout-main" className="flex max-w-7xl mx-auto">
          <Drawer />
          <div id="layout-content" className="flex-1 p-10">
            {children}
          </div>
        </main>
        <Footer />
      </ThemeBody>
    </html>
  );
}
