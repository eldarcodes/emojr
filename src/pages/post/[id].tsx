import Head from "next/head";

import type { NextPage } from "next";

const PostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post | Emojr</title>
      </Head>

      <main className="flex h-screen justify-center">Post view</main>
    </>
  );
};

export default PostPage;
