import { G } from "@svgdotjs/svg.js";

import { DifficultyProgressOptions } from "../types";

export function drawDifficultyProgress(
  group: G,
  options: DifficultyProgressOptions
) {
  const {
    x,
    y,
    data,
    theme: { difficultyProgress },
  } = options;
  const diffProgressTheme = difficultyProgress[data.difficulty];
  const fullWidth = 214;
  const smallWidth = Math.floor(fullWidth * (data.solved / data.total));

  group
    .rect(fullWidth, 8)
    .attr({ x: x, y: y })
    .radius(4, 4)
    .fill(diffProgressTheme.lineColor);
  group
    .rect(smallWidth, 8)
    .attr({ x: x, y: y })
    .radius(4, 4)
    .fill(diffProgressTheme.progressColor);

  group
    .text(data.difficulty)
    .attr({ x: x, y: y - 9 })
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 12,
      anchor: "start",
    })
    .fill(difficultyProgress.textColor.difficulty);

  group
    .text(`${data.solved}/${data.total}`)
    .attr({ x: x + fullWidth, y: y - 9 })
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 12,
      anchor: "end",
    })
    .fill(difficultyProgress.textColor.total);
}
