import { renderSvg } from "@/utils/svg-renderer";
import { Themes } from "@/utils/themes";

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
    data: json,
    theme: Themes["light"],
  });

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
