import { ClerkProvider } from "@clerk/nextjs";

import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Emojr</title>
        <meta name="title" content="Emojr" />
        <meta
          name="description"
          content="Emoji-based social media platform for creative expression and communication."
        />
        <meta name="keywords" content="Emoji, Social, Platform media" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Eldar Mirzabekov" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster position="bottom-center" />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
