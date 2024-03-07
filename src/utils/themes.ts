import { Theme } from "./types";

export const Themes: { [name: string]: Theme } = {
  light: {
    solvedText: {
      textColor: "#3c3c4399",
    },
    totalProgress: {
      ringColor: "#dfdfdf",
      progressColor: "#ffa116",
      textColor: {
        solved: "#3c3c4399",
        count: "#262626",
      },
    },
    difficultyProgress: {
      textColor: {
        difficulty: "#3c3c4399",
        total: "#262626bf",
      },
      Easy: {
        lineColor: "#2db55d26",
        progressColor: "#00af9b",
      },
      Medium: {
        lineColor: "#ffb80026",
        progressColor: "#ffb800",
      },
      Hard: {
        lineColor: "#ef474326",
        progressColor: "#ef4743",
      },
    },
  },
};
