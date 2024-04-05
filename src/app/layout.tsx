import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";

const nunito = Nunito({
  subsets: ["vietnamese"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

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
      <body className={nunito.className}>
        <Header />
        <div>{children}</div>
      </body>
    </html>
  );
}
