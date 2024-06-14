import type { Metadata } from "next";
import "../globals.css";
import { nunito } from "@/libs/fonts";
import { NextAuthProvider } from "@/contexts/nextAuthContext";

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
        <NextAuthProvider>
          <Header />
          <main id="page-content">{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
