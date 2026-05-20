export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Choice = {
  id: string;
  label: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
  difficulty: Difficulty;
  tags: string[];
};

export type CodingQuizQuestionType = "output" | "error" | "concept";

export type CodingQuizQuestion = {
  id: string;
  type: CodingQuizQuestionType;
  prompt: string;
  code: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
  expectedOutput?: string;
  difficulty: Difficulty;
  tags: string[];
};

export type PracticeItem = {
  id: string;
  title: string;
  prompt: string;
  explanation: string;
  solution?: string;
  difficulty: Difficulty;
  tags: string[];
};

export type Flashcard = {
  id: string;
  front: string;
  back: string;
  difficulty: Difficulty;
  tags: string[];
};

export type LearningModuleId = "quiz" | "coding-quiz" | "practice" | "flashcards";

export type LearningModule = {
  id: LearningModuleId;
  title: string;
  description: string;
  href: string;
  badge?: string;
  questionCount?: number;
};

export type ScoringRule = {
  correctPoints: number;
  incorrectPoints: number;
  skippedPoints: number;
  passingPercent: number;
};

export type FeedbackRule = {
  correctLabel: string;
  incorrectLabel: string;
  showExplanation: boolean;
};

export type QuizAttempt = {
  id: string;
  moduleId: LearningModuleId;
  total: number;
  correct: number;
  score: number;
  percent: number;
  completedAt: string;
};

export type Bookmarks = {
  practice: string[];
  flashcards: string[];
};

export type FlashcardRating = {
  id: string;
  rating: number;
  ratedAt: string;
};

export type ModuleProgress = {
  attempts: number;
  bestPercent: number;
  averagePercent: number;
  lastAttemptAt?: string;
};
