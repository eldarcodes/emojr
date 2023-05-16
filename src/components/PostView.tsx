import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";

import type { RouterOutputs } from "~/utils/api";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div className="flex gap-2 border-b border-slate-700 p-4" key={post.id}>
      <Link href={`/@${author.username}`}>
        <Image
          src={author.profilePicture}
          className="h-14 w-14 rounded-full"
          width={56}
          height={56}
          alt={author.username}
        />
      </Link>

      <div className="flex flex-col text-slate-500">
        <div className="flex gap-1">
          <Link href={`/@${author.username}`}>
            <div className="text-slate-100">
              {author.firstName} {author.lastName}
            </div>
          </Link>

          <Link href={`/@${author.username}`}>
            <div className="cursor-pointer">@{author.username}</div>
          </Link>

          <div>·</div>
          <Link href={`/post/${post.id}`}>
            <div>{dayjs(post.createdAt).fromNow()}</div>
          </Link>
        </div>

        <Link href={`/post/${post.id}`}>
          <div className="text-2xl">{post.content}</div>
        </Link>
      </div>
    </div>
  );
};
