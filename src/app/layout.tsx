import "./globals.css";
import { nunito } from "@/libs/fonts";

import { Suspense } from "react";

import LoadingSkeleton from "@/components/utils/loadingSkeleton";
import { NextAuthProvider } from "@/providers/nextAuthProvider";
import { ToastContainerProvider } from "@/providers/toastContainerProvider";
import { NestedCommentProvider } from "@/providers/nestedCommentProvider";

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
          <ToastContainerProvider>
            <Suspense fallback={<LoadingSkeleton />}>
              <NestedCommentProvider>{children}</NestedCommentProvider>
            </Suspense>
          </ToastContainerProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
