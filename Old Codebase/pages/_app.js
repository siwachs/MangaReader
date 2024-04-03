import "@/styles/globals.css";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Wrappers/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const {
    title,
    applyShadow,
    hideMobileLinks,
    hideFooter,
    contentPage,
    useContentNavbar,
    chapterTitle,
    contentTitle,
    populatedChapters,
  } = pageProps;

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" enableSystem={false}>
        <Layout
          title={title}
          useContentNavbar={!!useContentNavbar}
          chapterTitle={chapterTitle}
          contentTitle={contentTitle}
          populatedChapters={populatedChapters}
          applyShadow={!!applyShadow}
          hideMobileLinks={!!hideMobileLinks}
          hideFooter={!!hideFooter}
          contentPage={!!contentPage}
        >
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}
