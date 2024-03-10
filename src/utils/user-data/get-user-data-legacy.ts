import { GetUserDataResponse } from "./types";

/**
 * @deprecated Old method to fetch user data
 */
export async function getUserDataLegacy(
  user: string
): Promise<GetUserDataResponse> {
  const response = await fetch(
    "https://leetcode-stats-api.herokuapp.com/" + user
  );
  const json = await response.json();

  return {
    data: json,
    success: json?.status === "success",
  };
}
