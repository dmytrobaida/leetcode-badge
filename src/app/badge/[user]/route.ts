import { renderSvg } from "@/utils/svg-renderer";

export async function GET(
  request: Request,
  { params }: { params: { user: string } }
) {
  const user = params.user;
  const svg = renderSvg();

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
