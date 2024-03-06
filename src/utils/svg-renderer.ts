import { createSVGWindow } from "svgdom";
import { SVG, G, registerWindow } from "@svgdotjs/svg.js";

import {
  DifficultyProgressOptions,
  RenderSvgOptions,
  TotalProgressOptions,
} from "./types";

const window = createSVGWindow();
registerWindow(window, window.document);

export function renderSvg(options: RenderSvgOptions) {
  const svg = SVG();
  const width = 410;
  const height = 186;

  svg.width(width);
  svg.height(height);

  svg
    .text("Solved Problems")
    .attr({ x: 12, y: 30 })
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 13,
      anchor: "start",
      "dominant-baseline": "middle",
    })
    .fill("#3c3c4399");

  drawTotalProgress(svg.group(), {
    x: 75,
    y: 110,
    solved: options.totalSolved,
    total: options.totalQuestions,
  });

  drawDifficultyProgress(svg.group(), {
    x: 170,
    y: 60,
    solved: options.easySolved,
    total: options.totalEasy,
    color: "#00af9b",
    backColor: "#2db55d26",
    difficulty: "Easy",
  });

  drawDifficultyProgress(svg.group(), {
    x: 170,
    y: 110,
    solved: options.mediumSolved,
    total: options.totalMedium,
    color: "#ffb800",
    backColor: "#ffb80026",
    difficulty: "Medium",
  });

  drawDifficultyProgress(svg.group(), {
    x: 170,
    y: 160,
    solved: options.hardSolved,
    total: options.totalHard,
    color: "#ef4743",
    backColor: "#ef474326",
    difficulty: "Hard",
  });

  return svg.svg();
}

function drawTotalProgress(group: G, options: TotalProgressOptions) {
  const { x, y, solved: cur, total: max } = options;
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
    .attr({ x: x, y: y - 10 })
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 24,
      anchor: "middle",
      "dominant-baseline": "middle",
    })
    .fill("#262626");

  group
    .text("Solved")
    .attr({ x: x, y: y + 15 })
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 12,
      anchor: "middle",
      "dominant-baseline": "middle",
    })
    .fill("#3c3c4399");
}

function drawDifficultyProgress(group: G, options: DifficultyProgressOptions) {
  const {
    x,
    y,
    solved: cur,
    total: max,
    color,
    backColor,
    difficulty,
  } = options;
  const fullWidth = 214;
  const smallWidth = Math.floor(fullWidth * (cur / max));

  group.rect(fullWidth, 8).attr({ x: x, y: y }).radius(4, 4).fill(backColor);
  group.rect(smallWidth, 8).attr({ x: x, y: y }).radius(4, 4).fill(color);

  group
    .text(difficulty)
    .attr({ x: x, y: y - 15 })
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 12,
      anchor: "start",
      "dominant-baseline": "middle",
    })
    .fill("#3c3c4399");

  group
    .text(`${cur}/${max}`)
    .attr({ x: x + fullWidth, y: y - 15 })
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 12,
      anchor: "end",
      "dominant-baseline": "middle",
    })
    .fill("#262626bf");
}
