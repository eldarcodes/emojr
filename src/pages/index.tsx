import { type NextPage } from "next";
import Head from "next/head";
import {
  SignInButton,
  SignedIn,
  UserButton,
  SignedOut,
  useUser,
} from "@clerk/nextjs";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (!data || isLoading) return <div>Loading...</div>;
  if (!data) return <div>Something went wrong</div>;

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
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex items-center border-b border-slate-400 p-4">
            <SignedIn>
              <div className="flex w-full items-center gap-3">
                <UserButton />
                <input
                  placeholder="Type your emojis!"
                  className="grow bg-transparent outline-none"
                />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>

          <div className="flex flex-col">
            {data.map(({ post, author }) => (
              <div
                className="flex items-center gap-2 border-b border-slate-400 p-8"
                key={post.id}
              >
                <img
                  src={author.profilePicture}
                  className="h-8 w-8 rounded-full"
                  alt={author.username || "User"}
                />

                {post.content}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
