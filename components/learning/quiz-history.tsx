"use client";

import type { LearningModuleId, QuizAttempt } from "@/types/learning";
import { useLearning } from "@/components/utils/learning-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString();

type QuizHistoryProps = {
  moduleId: LearningModuleId;
};

export default function QuizHistory({ moduleId }: QuizHistoryProps) {
  const { quizHistory } = useLearning();
  const history = quizHistory.filter(
    (attempt: QuizAttempt) => attempt.moduleId === moduleId
  );

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent attempts</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          No quiz attempts yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent attempts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {history.slice(0, 5).map((attempt: QuizAttempt) => (
          <div
            key={attempt.id}
            className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2 last:border-b-0 last:pb-0"
          >
            <div>
              <div className="font-medium text-foreground">
                {attempt.percent}%
              </div>
              <div className="text-xs text-muted-foreground">
                {attempt.correct}/{attempt.total} correct
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDateTime(attempt.completedAt)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
