import { renderSvg } from "@/utils/svg-renderer";
import { Themes } from "@/utils/themes";

export async function GET(
  request: Request,
  { params }: { params: { user: string } }
) {
  const user = params.user;
  const { searchParams } = new URL(request.url);

  const themeName = searchParams.get("theme") ?? "";
  const theme = Themes[themeName] ?? Themes["light"];

  // TODO: Replace with own implementation
  const response = await fetch(
    "https://leetcode-stats-api.herokuapp.com/" + user
  );

  const json = await response.json();
  const svg = renderSvg({
    data: json,
    theme: theme,
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
