import { createSVGWindow } from "svgdom";
import { SVG, G, registerWindow } from "@svgdotjs/svg.js";

const window = createSVGWindow();
registerWindow(window, window.document);

async function main() {
  const svg = SVG();
  const width = 410;
  const height = 186;

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

  drawTotalProgress(svg.group(), {
    x: 75,
    y: 110,
    cur: 20,
    max: 300,
  });

  drawDifficultyProgress(svg.group(), {
    x: 170,
    y: 60,
    cur: 33,
    max: 100,
    color: "#00af9b",
    backColor: "#2db55d26",
    difficulty: "Easy",
  });

  drawDifficultyProgress(svg.group(), {
    x: 170,
    y: 110,
    cur: 33,
    max: 100,
    color: "#ffb800",
    backColor: "#ffb80026",
    difficulty: "Medium",
  });

  drawDifficultyProgress(svg.group(), {
    x: 170,
    y: 160,
    cur: 33,
    max: 100,
    color: "#ef4743",
    backColor: "#ef474326",
    difficulty: "Hard",
  });

  return svg.svg();
}

type TotalProgressOptions = {
  x: number;
  y: number;
  max: number;
  cur: number;
};

function drawTotalProgress(group: G, options: TotalProgressOptions) {
  const { x, y, cur, max } = options;
  const radius = 50;
  const length = 2 * Math.PI * radius;

  const dashLength = length * (cur / max);
  const gapLength = length - dashLength;

  group
    .circle(radius * 2)
    .center(x, y)
    .stroke({
      width: 3,
      color: "#dfdfdf",
    })
    .fill("transparent");

  group
    .circle(radius * 2)
    .center(x, y)
    .rotate(-90)
    .stroke({
      width: 5,
      color: "#ffa116",
      dasharray: `${dashLength} ${gapLength}`,
      dashoffset: 0,
    })
    .fill("transparent");

  group
    .text(cur.toString())
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 24,
      anchor: "middle",
    })
    .fill("#262626")
    .center(x, y - 10);

  group
    .text("Solved")
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 12,
      anchor: "middle",
    })
    .fill("#3c3c4399")
    .center(x, y + 15);
}

type DifficultyProgressOptions = {
  x: number;
  y: number;
  cur: number;
  max: number;
  color: string;
  backColor: string;
  difficulty: string;
};

function drawDifficultyProgress(group: G, options: DifficultyProgressOptions) {
  const { x, y, cur, max, color, backColor, difficulty } = options;
  const fullWidth = 214;
  const smallWidth = Math.floor(fullWidth * (cur / max));

  group.rect(fullWidth, 8).radius(4, 4).fill(backColor).move(x, y);
  group.rect(smallWidth, 8).radius(4, 4).fill(color).move(x, y);

  group
    .text(difficulty)
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 12,
      anchor: "middle",
    })
    .fill("#3c3c4399")
    .move(x, y - 20);

  const text = group
    .text(`${cur}/${max}`)
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 12,
      anchor: "middle",
    })
    .fill("#262626bf");

  text.move(x + fullWidth - text.length(), y - 20);
}

// @ts-ignore
Bun.serve({
  async fetch(_) {
    return new Response(await main(), {
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });
  },
});
