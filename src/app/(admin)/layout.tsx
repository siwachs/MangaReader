import { notFound } from "next/navigation";
import type { Metadata } from "next";

import getServerSession from "@/libs/auth/getServerSession";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Admin Dashboard - Manage Manga, Anime, Manhua, and Donghua Content",
  description:
    "Access the Admin Dashboard to manage and oversee manga, anime, manhua, and donghua content. Utilize administrative tools to update listings, review content submissions, and monitor site activity.",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getServerSession();
  if (!data?.user?.isAdmin) return notFound();

  return (
    <>
      <Header />
      <div id="sidebar-portal" />
      <main id="page-content">{children}</main>
    </>
  );
}
