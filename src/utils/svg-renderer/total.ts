import { G } from "@svgdotjs/svg.js";

import { TotalProgressOptions } from "../types";

export function drawTotalProgress(group: G, options: TotalProgressOptions) {
  const {
    x,
    y,
    data,
    theme: { totalProgress },
  } = options;
  const radius = 50;
  const length = 2 * Math.PI * radius;

  const dashLength = length * (data.solved / data.total);
  const gapLength = length - dashLength;

  // Ring
  group
    .circle(radius * 2)
    .center(x, y)
    .stroke({
      width: 3,
      color: totalProgress.ringColor,
    })
    .fill("transparent");

  // Progress ring
  group
    .circle(radius * 2)
    .center(x, y)
    .rotate(-90)
    .stroke({
      width: 5,
      color: totalProgress.progressColor,
      dasharray: `${dashLength} ${gapLength}`,
      dashoffset: 0,
    })
    .fill("transparent");

  // Count
  group
    .text(data.solved.toString())
    .attr({ x: x, y: y - 2 })
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 24,
      anchor: "middle",
    })
    .fill(totalProgress.textColor.count);

  // Solved
  group
    .text("Solved")
    .attr({ x: x, y: y + 21 })
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 12,
      anchor: "middle",
    })
    .fill(totalProgress.textColor.solved);
}
