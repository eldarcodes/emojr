import Head from "next/head";

import { PageLayout } from "~/components/PageLayout";
import { PostView } from "~/components/PostView";
import { generateSSGHelper } from "~/server/helpers/ssg";
import { api } from "~/utils/api";

import type { GetStaticProps, NextPage } from "next";

const PostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.posts.getById.useQuery({ id });

  if (!data) return <div>404</div>;

  const pageTitle = data.post.content
    ? `${data.post.content} | Emojr`
    : "Emojr";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("Invalid post id");

  await ssg.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export default PostPage;
