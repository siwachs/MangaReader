import type { Metadata } from "next";
import "../globals.css";
import { nunito } from "@/libs/fonts";

import Header from "@/components/(watch)/header";

export const metadata: Metadata = {
  title: "Chapter 1 - Tales of Demons and Gods - MangaToon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Header />
        <main id="page-content">{children}</main>
      </body>
    </html>
  );
}
