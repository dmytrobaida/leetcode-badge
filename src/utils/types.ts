export type TotalProgressOptions = {
  x: number;
  y: number;
  data: {
    total: number;
    solved: number;
  };
  theme: Theme;
};

export type DifficultyProgressOptions = {
  x: number;
  y: number;
  data: {
    difficulty: "Easy" | "Medium" | "Hard";
    solved: number;
    total: number;
  };
  theme: Theme;
};

export type RenderSvgOptions = {
  data: {
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    totalEasy: number;
    mediumSolved: number;
    totalMedium: number;
    hardSolved: number;
    totalHard: number;
  };
  theme: Theme;
  bgColor?: string;
};

type DifficultyProgress = {
  lineColor: string;
  progressColor: string;
};

export type Theme = {
  solvedText: {
    textColor: string;
  };
  totalProgress: {
    ringColor: string;
    progressColor: string;
    textColor: {
      solved: string;
      count: string;
    };
  };
  difficultyProgress: {
    textColor: {
      difficulty: string;
      total: string;
    };
    Easy: DifficultyProgress;
    Medium: DifficultyProgress;
    Hard: DifficultyProgress;
  };
};
