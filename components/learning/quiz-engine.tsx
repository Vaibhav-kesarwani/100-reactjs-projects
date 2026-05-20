"use client";

import type { FeedbackRule, LearningModuleId, QuizQuestion, ScoringRule } from "@/types/learning";
import { useLearning } from "@/components/utils/learning-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";

const LETTERS = ["A", "B", "C", "D"];

type QuizEngineProps = {
  title: string;
  moduleId: LearningModuleId;
  questions: QuizQuestion[];
  scoringRule: ScoringRule;
  feedbackRule: FeedbackRule;
};

type AnswerState = {
  selectedId?: string;
  isCorrect?: boolean;
};

export default function QuizEngine({
  title,
  moduleId,
  questions,
  scoringRule,
  feedbackRule,
}: QuizEngineProps) {
  const { recordQuizAttempt } = useLearning();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [skippedCount, setSkippedCount] = useState(0);

  const currentQuestion = questions[currentIndex];
  const answerState = answers[currentQuestion?.id ?? ""];
  const selectedId = answerState?.selectedId;
  const isChecked = answerState?.isCorrect !== undefined;

  const correctCount = useMemo(
    () =>
      Object.values(answers).filter((answer) => answer.isCorrect).length,
    [answers]
  );

  const progressValue = questions.length
    ? Math.round(((currentIndex + 1) / questions.length) * 100)
    : 0;

  const resetQuiz = () => {
    setCurrentIndex(0);
    setAnswers({});
    setSkippedCount(0);
    setIsComplete(false);
  };

  const handleSelect = (choiceId: string) => {
    if (isChecked) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedId: choiceId,
      },
    }));
  };

  const handleCheck = () => {
    if (!selectedId || isChecked) return;

    const isCorrect = selectedId === currentQuestion.correctChoiceId;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selectedId,
        isCorrect,
      },
    }));
  };

  const handleSkip = () => {
    if (isChecked) return;
    setSkippedCount((prev) => prev + 1);
    handleNext();
  };

  const handleNext = () => {
    const isLast = currentIndex === questions.length - 1;

    if (isLast) {
      const incorrectCount =
        questions.length - correctCount - skippedCount;
      const score =
        correctCount * scoringRule.correctPoints +
        incorrectCount * scoringRule.incorrectPoints +
        skippedCount * scoringRule.skippedPoints;
      const percent = questions.length
        ? Math.round((correctCount / questions.length) * 100)
        : 0;

      recordQuizAttempt({
        id: `${moduleId}-${Date.now()}`,
        moduleId,
        total: questions.length,
        correct: correctCount,
        score,
        percent,
        completedAt: new Date().toISOString(),
      });
      setIsComplete(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  if (!currentQuestion) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No questions available</CardTitle>
          <CardDescription>
            Add quiz content to start practicing.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (isComplete) {
    const percent = questions.length
      ? Math.round((correctCount / questions.length) * 100)
      : 0;
    const passed = percent >= scoringRule.passingPercent;

    return (
      <Card>
        <CardHeader>
          <CardTitle>{title} results</CardTitle>
          <CardDescription>
            {passed
              ? "Nice work. Keep the streak going."
              : "Keep practicing and try again."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={passed ? "default" : "outline"}>
              {passed ? "Passed" : "In progress"}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {correctCount} correct, {skippedCount} skipped
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Score</span>
              <span className="font-medium">{percent}%</span>
            </div>
            <Progress value={percent} />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={resetQuiz} type="button">
            Restart quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              Question {currentIndex + 1} of {questions.length}
            </CardDescription>
          </div>
          <Badge variant="outline">{currentQuestion.difficulty}</Badge>
        </div>
        <Progress value={progressValue} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-base font-medium text-foreground">
            {currentQuestion.prompt}
          </p>
          <div className="flex flex-wrap gap-2">
            {currentQuestion.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          {currentQuestion.choices.map((choice, index) => {
            const isSelected = selectedId === choice.id;
            const isCorrect =
              isChecked && choice.id === currentQuestion.correctChoiceId;
            const isIncorrect =
              isChecked && isSelected && !isCorrect;

            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => handleSelect(choice.id)}
                aria-pressed={isSelected}
                className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/40"
                } ${
                  isCorrect
                    ? "border-emerald-500/50 bg-emerald-500/10"
                    : ""
                } ${
                  isIncorrect
                    ? "border-rose-500/50 bg-rose-500/10"
                    : ""
                }`}
              >
                <span className="mt-0.5 text-xs font-semibold text-muted-foreground">
                  {LETTERS[index] ?? "-"}
                </span>
                <span className="text-sm text-foreground">
                  {choice.label}
                </span>
              </button>
            );
          })}
        </div>
        {isChecked && feedbackRule.showExplanation && (
          <div
            className="rounded-lg border border-border bg-muted/40 p-3 text-sm"
            aria-live="polite"
          >
            <p className="font-medium text-foreground">
              {answerState?.isCorrect
                ? feedbackRule.correctLabel
                : feedbackRule.incorrectLabel}
            </p>
            <p className="mt-1 text-muted-foreground">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-between gap-3">
        <div className="text-xs text-muted-foreground">
          {correctCount} correct, {skippedCount} skipped
        </div>
        <div className="flex items-center gap-2">
          {!isChecked && (
            <Button variant="ghost" type="button" onClick={handleSkip}>
              Skip
            </Button>
          )}
          <Button
            type="button"
            onClick={isChecked ? handleNext : handleCheck}
            disabled={!selectedId && !isChecked}
          >
            {isChecked
              ? currentIndex === questions.length - 1
                ? "Finish"
                : "Next"
              : "Check answer"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
