import Head from "next/head";

import { api } from "~/utils/api";

import type { GetStaticProps, NextPage } from "next";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data) return <div>404</div>;

  const pageTitle = data.username ? `@${data.username} | Emojr` : "Emojr";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <PageLayout>
        <div className="relative h-48 bg-slate-600">
          <Image
            src={data.profilePicture}
            alt={data.username || "Profile image"}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-16 ml-4 rounded-full border-4 border-black"
          />
        </div>

        <div className="h-16" />

        <div className="p-4">
          <div className="text-2xl font-bold">
            {data.firstName} {data.lastName}
          </div>
          <div className="text-slate-500">@{data.username}</div>
        </div>

        <div className="w-full border-b border-slate-600" />
      </PageLayout>
    </>
  );
};

import { createServerSideHelpers } from "@trpc/react-query/server";

import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import SuperJSON from "superjson";
import { PageLayout } from "~/components/layout";
import Image from "next/image";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma,
      userId: null,
    },
    transformer: SuperJSON,
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("Invalid slug");

  const username = slug.replace("@", "");

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export default ProfilePage;
