import { LeetCode } from "leetcode-query";

import { renderSvg } from "@/utils/svg-renderer";
import { Themes } from "@/utils/themes";
import { RenderSvgOptions } from "@/utils/types";

export async function GET(
  request: Request,
  { params }: { params: { user: string } }
) {
  const user = params.user;
  const { searchParams } = new URL(request.url);
  const themeName = searchParams.get("theme") ?? "";
  const theme = Themes[themeName] ?? Themes["light"];
  const bgColor = searchParams.get("bgColor");

  const svg = renderSvg({
    // data: await getUserData(user),
    data: await getUserDataLegacy(user),
    theme: theme,
    bgColor: bgColor != null ? `#${bgColor}` : undefined,
  });

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      // Cache
      "Cache-Control": "max-age=3600",
      "CDN-Cache-Control": "max-age=3600",
      "Vercel-CDN-Cache-Control": "max-age=3600",
    },
  });
}

async function getUserData(user: string): Promise<RenderSvgOptions["data"]> {
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
    totalQuestions: allTotal["All"] ?? -1,
    totalSolved: userTotal["All"] ?? -1,

    totalEasy: allTotal["Easy"] ?? -1,
    easySolved: userTotal["Easy"] ?? -1,

    totalMedium: allTotal["Medium"] ?? -1,
    mediumSolved: userTotal["Medium"] ?? -1,

    totalHard: allTotal["Hard"] ?? -1,
    hardSolved: userTotal["Hard"] ?? -1,
  };
}

/**
 * @deprecated Old method to fetch user data
 */
async function getUserDataLegacy(
  user: string
): Promise<RenderSvgOptions["data"]> {
  const response = await fetch(
    "https://leetcode-stats-api.herokuapp.com/" + user
  );
  return await response.json();
}
