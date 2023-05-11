import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Head from "next/head";
import Image from "next/image";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import toast from "react-hot-toast";

import { api } from "~/utils/api";
import { Spinner } from "~/components/Spinner";

import type { NextPage } from "next";
import type { RouterOutputs } from "~/utils/api";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div className="flex gap-2 border-b border-slate-700 p-4" key={post.id}>
      <Image
        src={author.profilePicture}
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
        alt={author.username}
      />

      <div className="flex flex-col text-slate-500">
        <div className="flex gap-1">
          <div className="text-slate-100">
            {author.firstName} {author.lastName}
          </div>

          <div>@{author.username}</div>
          <div>·</div>
          <div>{dayjs(post.createdAt).fromNow()}</div>
        </div>

        <div className="text-2xl">{post.content}</div>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <Spinner fullPage size={40} />;

  if (!data) return <div>Something went wrong ☹️</div>;

  return (
    <div className="flex flex-col">
      {data.map((postWithUser) => (
        <PostView key={postWithUser.post.id} {...postWithUser} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInputValue("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (error) => {
      const errorMessage = error.data?.zodError?.fieldErrors.content;

      console.log(error.data);

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post, please try again later.");
      }
    },
  });

  const { isLoaded: isUserLoaded } = useUser();

  if (!isUserLoaded) return null;

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
        <div className="h-full w-full border-x border-slate-700 md:max-w-2xl">
          <div className="flex items-center border-b border-slate-700 p-4">
            <SignedIn>
              <div className="flex w-full items-center gap-3">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: 56,
                        height: 56,
                      },
                    },
                  }}
                />
                <input
                  placeholder="Type your emojis!"
                  className="grow bg-transparent outline-none"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();

                      if (inputValue) {
                        mutate({ content: inputValue });
                      }
                    }
                  }}
                  disabled={isPosting}
                />

                {inputValue && !isPosting && (
                  <button
                    onClick={() => mutate({ content: inputValue })}
                    disabled={isPosting}
                  >
                    Post
                  </button>
                )}
                {isPosting && <Spinner size={24} />}
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>

          <Feed />
        </div>
      </main>
    </>
  );
};

export default Home;
