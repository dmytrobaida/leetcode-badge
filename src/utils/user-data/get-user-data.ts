import { LeetCode } from "leetcode-query";

import { GetUserDataResponse } from "./types";

export async function getUserData(user: string): Promise<GetUserDataResponse> {
  const profile = await new LeetCode().user(user);

  const allTotal: { [difficulty: string]: number } = {};
  const userTotal: { [difficulty: string]: number } = {};

  for (const { difficulty, count } of profile.allQuestionsCount) {
    allTotal[difficulty] = count;
  }

  for (const { difficulty, count } of profile.matchedUser?.submitStats
    ?.acSubmissionNum ?? []) {
    userTotal[difficulty] = count;
  }

  return {
    data: {
      totalQuestions: allTotal["All"] ?? -1,
      totalSolved: userTotal["All"] ?? -1,

      totalEasy: allTotal["Easy"] ?? -1,
      easySolved: userTotal["Easy"] ?? -1,

      totalMedium: allTotal["Medium"] ?? -1,
      mediumSolved: userTotal["Medium"] ?? -1,

      totalHard: allTotal["Hard"] ?? -1,
      hardSolved: userTotal["Hard"] ?? -1,
    },
    success: true,
  };
}
