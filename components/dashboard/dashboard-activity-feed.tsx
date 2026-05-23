"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  FolderGit2,
  FolderKanban,
  GitPullRequest,
  MessageSquare,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  ActivityItem,
  ActivityLane,
  FEED_PREVIEW_LIMIT,
  formatRelativeTime,
} from "./dashboard-shared";

export function DashboardActivityFeed({
  title,
  description,
  totalCount,
  href,
  items,
  type,
}: {
  title: string;
  description: string;
  totalCount: number | null;
  href: string;
  items: ActivityItem[];
  type: "issue" | "pull-request";
}) {
  const previewItems = items.slice(0, FEED_PREVIEW_LIMIT);
  const shouldReduceMotion = useReducedMotion();

  return (
    <Card className="border border-sky-200/70 bg-white/80 shadow-[0_24px_70px_-50px_rgba(59,130,246,0.28)] backdrop-blur-xl dark:border-border/70 dark:bg-card/85 dark:shadow-none">
      <CardHeader className="gap-4 border-b border-border/60 pb-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              {type === "issue" ? (
                <FolderGit2 className="h-5 w-5 text-primary" />
              ) : (
                <GitPullRequest className="h-5 w-5 text-primary" />
              )}
              {title}
            </CardTitle>
            <CardDescription className="mt-2 max-w-3xl text-sm leading-6">
              {description}
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="rounded-full px-3 py-1 text-xs"
            >
              {totalCount === null ? "Live data pending" : `${totalCount} open`}
            </Badge>
            {previewItems.length > 0 && (
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-xs"
              >
                Showing {previewItems.length} latest
              </Badge>
            )}
            <Link
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/50 hover:text-foreground"
            >
              View board
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {previewItems.length > 0 ? (
          <ActivityLane
            ariaLabel={`${title} preview`}
            hintText={
              type === "issue"
                ? "Swipe through issue cards"
                : "Swipe through pull request cards"
            }
          >
            {previewItems.map((item) => (
              <motion.div
                key={item.id}
                className="w-72 shrink-0 snap-start sm:w-84 lg:w-92"
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <Link
                  href={item.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-[1.75rem] border border-sky-200/55 bg-white/82 p-4 shadow-[0_20px_52px_-44px_rgba(56,189,248,0.26)] transition-colors duration-300 hover:border-primary/35 hover:bg-primary/5 dark:border-border/60 dark:bg-background/55 dark:shadow-none"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_58%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Badge
                          variant="outline"
                          className="rounded-full px-2.5 py-0.5 text-[11px]"
                        >
                          #{item.number}
                        </Badge>
                        <span className="inline-flex items-center gap-1">
                          {type === "issue" ? (
                            <FolderKanban className="h-3.5 w-3.5" />
                          ) : (
                            <GitPullRequest className="h-3.5 w-3.5" />
                          )}
                          {type === "issue" ? "Issue" : "Pull request"}
                        </span>
                        {type === "pull-request" &&
                          "draft" in item &&
                          item.draft && (
                            <Badge
                              variant="secondary"
                              className="rounded-full px-2 py-0.5 text-[11px]"
                            >
                              Draft
                            </Badge>
                          )}
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold leading-6 text-foreground sm:text-base">
                      {item.title}
                    </h3>

                    {item.labels.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.labels.slice(0, 3).map((label) => (
                          <span
                            key={label.id}
                            className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium"
                            style={{
                              borderColor: `#${label.color}33`,
                              backgroundColor: `#${label.color}15`,
                              color: `#${label.color}`,
                            }}
                          >
                            {label.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      {item.user.login}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {item.comments} comments
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" />
                      Updated {formatRelativeTime(item.updated_at)}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </ActivityLane>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/70 bg-background/40 p-5 text-sm leading-6 text-muted-foreground">
            Live GitHub activity is temporarily unavailable. Use the board link
            above to inspect the latest issue and PR state directly on GitHub.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
