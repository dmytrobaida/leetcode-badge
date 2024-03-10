import { PrismaClient } from "@prisma/client";

import { getUserDataLegacy } from "./user-data/get-user-data-legacy";

const prisma = new PrismaClient();

export async function retrieveUserData(user: string) {
  const { data, success } = await getUserDataLegacy(user);

  if (success) {
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

  return cache.data;
}
