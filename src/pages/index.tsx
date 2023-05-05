import { type NextPage } from "next";
import Head from "next/head";
import { SignInButton, SignedIn, UserButton, SignedOut } from "@clerk/nextjs";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data } = api.posts.getAll.useQuery();

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
      <main className="flex min-h-screen items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] p-10">
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>

        <ul>
          {data?.map((post) => (
            <li key={post.id}>{post.content}</li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;
