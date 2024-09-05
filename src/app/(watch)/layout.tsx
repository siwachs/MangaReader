import "../globals.css";
import { nunito } from "@/libs/fonts";

import { NextAuthProvider } from "@/contexts/nextAuthContext";
import { ToastContainerProvider } from "@/contexts/toastContainerContext";
import { NestedCommentProvider } from "@/contexts/nestedCommentContext";

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
            <NestedCommentProvider>{children}</NestedCommentProvider>
          </ToastContainerProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
