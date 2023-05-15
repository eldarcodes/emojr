import Head from "next/head";

import type { NextPage } from "next";

const ProfilePage: NextPage = () => {
  return (
    <>
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

      <main className="flex h-screen justify-center">Profile view</main>
    </>
  );
};

export default ProfilePage;
