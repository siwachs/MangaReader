import type { Metadata } from "next";
import "../globals.css";
import { nunito } from "@/libs/fonts";
import { NextAuthProvider } from "@/contexts/nextAuthContext";

import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Manga Reader - Read Manga, Anime, Manhua, and Donghua Online",
  description:
    "Discover a vast collection of manga, anime, manhua, and donghua on Manga Reader. Enjoy high-quality translations and stay updated with the latest releases.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className={nunito.className}>
        <NextAuthProvider>
          <Header />
          <div id="user-profile-portal" />
          <div id="sidebar-portal" />
          <main id="page-content">{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
