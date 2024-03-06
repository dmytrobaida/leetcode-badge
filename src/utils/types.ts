export type TotalProgressOptions = {
  x: number;
  y: number;
  total: number;
  solved: number;
};

export type DifficultyProgressOptions = {
  x: number;
  y: number;
  solved: number;
  total: number;
  color: string;
  backColor: string;
  difficulty: string;
};

export type RenderSvgOptions = {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
};
