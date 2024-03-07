import { createSVGWindow } from "svgdom";
import { SVG, G, registerWindow } from "@svgdotjs/svg.js";

import { RenderSvgOptions } from "../types";
import { drawTotalProgress } from "./total";
import { drawDifficultyProgress } from "./difficulty";

const window = createSVGWindow();
registerWindow(window, window.document);

export function renderSvg(options: RenderSvgOptions) {
  const { data, theme, bgColor } = options;
  const svg = SVG();
  const width = 410;
  const height = 186;

  svg.width(width);
  svg.height(height);

  svg
    .rect(width, height)
    .radius(5, 5)
    .fill(bgColor ?? "transparent");

  svg
    .text("Solved Problems")
    .attr({ x: 12, y: 30 })
    .font({
      family:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      size: 13,
      anchor: "start",
    })
    .fill(theme.solvedText.textColor);

  drawTotalProgress(svg.group(), {
    x: 75,
    y: 110,
    data: {
      solved: data.totalSolved,
      total: data.totalQuestions,
    },
    theme: theme,
  });

  drawDifficultyProgress(svg.group(), {
    x: 170,
    y: 60,
    data: {
      difficulty: "Easy",
      solved: data.easySolved,
      total: data.totalEasy,
    },
    theme: theme,
  });

  drawDifficultyProgress(svg.group(), {
    x: 170,
    y: 110,
    data: {
      difficulty: "Medium",
      solved: data.mediumSolved,
      total: data.totalMedium,
    },
    theme: theme,
  });

  drawDifficultyProgress(svg.group(), {
    x: 170,
    y: 160,
    data: {
      difficulty: "Hard",
      solved: data.hardSolved,
      total: data.totalHard,
    },
    theme: theme,
  });

  return svg.svg();
}
