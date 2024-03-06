import { renderSvg } from "@/utils/svg-renderer";

export async function GET(
  request: Request,
  { params }: { params: { user: string } }
) {
  const user = params.user;
  // TODO: Replace with own implementation
  const response = await fetch(
    "https://leetcode-stats-api.herokuapp.com/" + user
  );
  const json = await response.json();

  const svg = renderSvg({
    ...json,
  });

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
