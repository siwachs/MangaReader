import type { Metadata } from "next";
import "../globals.css";
import { nunito } from "@/libs/fonts";
import { NextAuthProvider } from "@/contexts/nextAuthContext";

import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Admin Dashboard - Manage Manga, Anime, Manhua, and Donghua Content",
  description:
    "Access the Admin Dashboard to manage and oversee manga, anime, manhua, and donghua content. Utilize administrative tools to update listings, review content submissions, and monitor site activity.",
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
          <div id="image-pick-and-upload-portal" />
          <div id="sidebar-portal" />
          <main id="page-content">{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
