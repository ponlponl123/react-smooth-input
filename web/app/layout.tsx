import type { Metadata } from "next";
import { Baloo_2, DynaPuff } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ThemeBody } from "./ThemeBody";

import Drawer from "@/components/drawer";
import Footer from "@/components/footer";
import Header from "@/components/header";
import "../styles/global.css";

export const metadata: Metadata = {
  title: "Smooth Input Playground",
  description: "Dev playground for react-smooth-input library",
};
const dynaPuff = DynaPuff({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-display",
});
const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = document.cookie.match('(^|;)\\\\s*theme\\\\s*=\\\\s*([^;]+)')?.pop() || '';
                  var localTheme = localStorage.getItem('theme');
                  var support = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (theme === 'dark' || (!theme && localTheme === 'dark') || (!theme && !localTheme && support)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html { background: #fff; }
              html.dark { background: #000; }
            `,
          }}
        />
      </head>
      <ThemeBody className={`${dynaPuff.className} ${baloo2.className}`}>
        <NextTopLoader showSpinner={false} color="#ff637e" />
        <Header />
        <div
          id="gradient-backdrop"
          className="fixed w-full h-full top-0 left-0 overflow-hidden pointer-events-none"
        >
          <div className="smooth-transition" />
          <div className="smooth-transition" />
          <div className="smooth-transition" />
          <div className="smooth-transition" />
        </div>
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
