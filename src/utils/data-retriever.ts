import { PrismaClient } from "@prisma/client";

import { getUserDataLegacy } from "./user-data/get-user-data-legacy";
import { RenderSvgOptions } from "./types";

const prisma = new PrismaClient();

export async function retrieveUserData(user: string) {
  const { data, success } = await getUserDataLegacy(user);

  if (success) {
    console.log("Creating or updating cache value");

    // create or update cache
    await prisma.badgeCache.upsert({
      where: {
        username: user,
      },
      create: {
        username: user,
        data: data,
      },
      update: {
        data: data,
      },
    });

    return data;
  }

  console.log("Fetching failed!. Reading from cache...");

  // try to retrieve cache value
  const cache = await prisma.badgeCache.findUnique({
    where: {
      username: user,
    },
  });

  if (cache == null) {
    return null;
  }

  return cache.data as RenderSvgOptions["data"];
}
