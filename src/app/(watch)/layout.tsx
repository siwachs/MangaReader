import type { Metadata } from "next";
import "../globals.css";
import { nunito } from "@/utils/fonts";

import Header from "@/components/(watch)/header";

export const metadata: Metadata = {
  title: "Manga Reader - Read Manga, Anime, Manhua, and Donghua Online",
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
