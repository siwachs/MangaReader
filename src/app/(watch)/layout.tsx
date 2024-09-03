import "../globals.css";
import { nunito } from "@/libs/fonts";
import { NextAuthProvider } from "@/contexts/nextAuthContext";

import { ToastContainerProvider } from "@/contexts/toastContainerContext";

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
          <ToastContainerProvider>{children}</ToastContainerProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
