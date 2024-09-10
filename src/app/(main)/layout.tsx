import type { Metadata } from "next";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "MangaReader - Read Manga, Anime, Manhua, and Donghua Online",
  description:
    "Discover a vast collection of manga, anime, manhua, and donghua on MangaReader. Enjoy high-quality translations and stay updated with the latest releases.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div id="sidebar-portal" />
      <main id="page-content">{children}</main>
    </>
  );
}
