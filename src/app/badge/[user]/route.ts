import { retrieveUserData } from "@/utils/data-retriever";
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
  const bgColor = searchParams.get("bgColor");

  const data = await retrieveUserData(user);

  if (data == null) {
    return new Response("Reached limit of requests. Please try later", {
      status: 400,
    });
  }

  const svg = renderSvg({
    data: data,
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
