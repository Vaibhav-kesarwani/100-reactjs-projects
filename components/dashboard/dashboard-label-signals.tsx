"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { GitHubLabel } from "@/types/github";
import { Sparkles } from "lucide-react";

export function DashboardLabelSignals({
  labels,
}: {
  labels: Array<GitHubLabel & { count: number }>;
}) {
  return (
    <Card className="border border-sky-200/70 bg-white/80 shadow-[0_24px_70px_-50px_rgba(14,165,233,0.28)] backdrop-blur-xl dark:border-border/70 dark:bg-card/85 dark:shadow-none">
      <CardHeader className="gap-3 border-b border-border/60 pb-5">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="h-5 w-5 text-primary" />
          Active label signals
        </CardTitle>
        <CardDescription className="text-sm leading-6">
          The most visible labels across the currently previewed issue and PR
          queue.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {labels.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {labels.map((label) => (
              <span
                key={label.id}
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
                style={{
                  borderColor: `#${label.color}33`,
                  backgroundColor: `#${label.color}15`,
                  color: `#${label.color}`,
                }}
              >
                {label.name}
                <span className="text-[10px] opacity-80">x{label.count}</span>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-6 text-muted-foreground">
            Label insights will appear here as soon as GitHub activity data is
            available.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
