import type { Metadata } from "next";

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
      <ThemeBody>{children}</ThemeBody>
    </html>
  );
}
