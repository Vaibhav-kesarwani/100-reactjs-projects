"use client";

import type { LearningModuleId } from "@/types/learning";
import { useLearning } from "@/components/utils/learning-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const formatDate = (value?: string) => {
  if (!value) return "No attempts";
  return new Date(value).toLocaleDateString();
};

type ProgressSummaryProps = {
  moduleId: LearningModuleId;
  totalCount: number;
};

export default function ProgressSummary({
  moduleId,
  totalCount,
}: ProgressSummaryProps) {
  const { bookmarks, flashcardRatings, getQuizProgress } = useLearning();

  if (moduleId === "practice") {
    const bookmarked = bookmarks.practice.length;
    const percent = totalCount
      ? Math.round((bookmarked / totalCount) * 100)
      : 0;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Practice progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Bookmarked</span>
            <span className="font-medium">
              {bookmarked}/{totalCount}
            </span>
          </div>
          <Progress value={percent} />
        </CardContent>
      </Card>
    );
  }

  if (moduleId === "flashcards") {
    const ratings = Object.values(flashcardRatings);
    const ratedCount = ratings.length;
    const averageRating = ratedCount
      ? ratings.reduce((sum, item) => sum + item.rating, 0) / ratedCount
      : 0;
    const percent = totalCount ? Math.round((ratedCount / totalCount) * 100) : 0;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Flashcard progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Rated cards</span>
            <span className="font-medium">
              {ratedCount}/{totalCount}
            </span>
          </div>
          <Progress value={percent} />
          <div className="text-xs text-muted-foreground">
            Average self-rating: {averageRating.toFixed(1)} / 5
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = getQuizProgress(moduleId);
  const percent = Math.round(progress.averagePercent);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span>Attempts</span>
          <span className="font-medium">{progress.attempts}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Best score</span>
          <span className="font-medium">{progress.bestPercent}%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Average score</span>
          <span className="font-medium">{percent}%</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Last attempt: {formatDate(progress.lastAttemptAt)}
        </div>
      </CardContent>
    </Card>
  );
}
