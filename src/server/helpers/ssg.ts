import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import SuperJSON from "superjson";
import { createServerSideHelpers } from "@trpc/react-query/server";

export const generateSSGHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma,
      userId: null,
    },
    transformer: SuperJSON,
  });
