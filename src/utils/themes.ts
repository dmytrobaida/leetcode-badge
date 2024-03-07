import { Theme } from "./types";

export const Themes: { [name: string]: Theme } = {
  // Light
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

  // Dark
  dark: {
    solvedText: {
      textColor: "#eff2f699",
    },
    totalProgress: {
      ringColor: "#4a4a4a",
      progressColor: "#ffa116",
      textColor: {
        solved: "#eff2f699",
        count: "#ffffff",
      },
    },
    difficultyProgress: {
      textColor: {
        difficulty: "#eff2f699",
        total: "#eff1f6bf",
      },
      Easy: {
        lineColor: "#2cbb5d40",
        progressColor: "#00b8a3",
      },
      Medium: {
        lineColor: "#ffc01e40",
        progressColor: "#ffc01e",
      },
      Hard: {
        lineColor: "#ef474340",
        progressColor: "#ef4743",
      },
    },
  },

  // Neutral
  neutral: {
    solvedText: {
      textColor: "#006AFF",
    },
    totalProgress: {
      ringColor: "#dfdfdf",
      progressColor: "#ffa116",
      textColor: {
        solved: "#417e87cc",
        count: "#417E87",
      },
    },
    difficultyProgress: {
      textColor: {
        difficulty: "#417E87",
        total: "#417e87cc",
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
