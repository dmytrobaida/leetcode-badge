import { createSVGWindow } from "svgdom";
import { SVG, Svg, registerWindow } from "@svgdotjs/svg.js";

const window = createSVGWindow();
registerWindow(window, window.document);

const width = 410;
const height = 186;

async function main() {
  const svg = SVG();
  svg.width(width);
  svg.height(height);

  svg.rect(width, height).radius(5, 5).fill("#F8F8F8");

  svg
    .text("Solved Problems")
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 13,
      anchor: "middle",
    })
    .fill("#3c3c4399")
    .move(13, 16);

  drawCircle(svg, 75);

  const svgString = svg.svg();

  return svgString;
}

Bun.serve({
  async fetch(req) {
    return new Response(await main(), {
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });
  },
});

function drawCircle(svg: Svg, x: number) {
  svg
    .circle(92)
    .center(x, 120)
    .stroke({
      width: 3,
      color: "#dfdfdf",
    })
    .fill("transparent");

  svg
    .circle(92)
    .center(x, 120)
    .rotate(-90)
    .stroke({
      width: 5,
      color: "#ffa116",
      dasharray: "52.87529510455946 236.1512290257015",
      dashoffset: 0,
    })
    .fill("transparent");

  svg
    .text("562")
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 24,
      anchor: "middle",
    })
    .fill("#262626")
    .center(x, 110);

  svg
    .text("Solved")
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 12,
      anchor: "middle",
    })
    .fill("#3c3c4399")
    .center(x, 130);
}
