import type { Metadata } from "next";

import "./global.css";

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
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
