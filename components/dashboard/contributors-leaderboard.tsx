"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { GitHubContributor } from "@/types/github";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatedCounter,
  AnimatedFlame,
  getOrdinalLabel,
  integerNumberFormatter,
  LEADERBOARD_LIMIT,
} from "./dashboard-shared";

export function ContributorsLeaderboard({
  contributors,
  href,
}: {
  contributors: GitHubContributor[];
  href: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Card className="border border-emerald-200/70 bg-linear-to-br from-white via-emerald-50/75 to-cyan-50/80 shadow-[0_30px_80px_-48px_rgba(16,185,129,0.3)] backdrop-blur-xl dark:border-border/70 dark:from-primary/10 dark:via-card dark:to-card dark:shadow-none">
      <CardHeader className="gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Trophy className="h-5 w-5 text-primary" />
              Contributors leaderboard
            </CardTitle>
            <CardDescription className="mt-2 text-sm leading-6">
              Top {LEADERBOARD_LIMIT} contributors ranked by public GitHub
              contributions.
            </CardDescription>
          </div>
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
            Top 5
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {contributors.length > 0 ? (
          contributors.slice(0, LEADERBOARD_LIMIT).map((contributor, index) => {
            const rank = index + 1;
            const isLeader = index === 0;

            return (
              <motion.div
                key={contributor.id}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <Link
                  href={contributor.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex items-center gap-3 rounded-3xl border px-3 py-3 transition-all duration-300 hover:border-primary/35 hover:bg-primary/5 sm:px-4 ${
                    isLeader
                      ? "border-primary/35 bg-background/65 shadow-lg shadow-primary/8"
                      : "border-border/60 bg-background/55"
                  }`}
                >
                  <div className="relative shrink-0">
                    <Image
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      width={isLeader ? 56 : 48}
                      height={isLeader ? 56 : 48}
                      unoptimized
                      className={`rounded-full border-2 border-dashed border-border object-cover ${
                        isLeader ? "h-14 w-14" : "h-12 w-12"
                      }`}
                    />
                    <span className="absolute -left-2 -top-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                      #{rank}
                    </span>
                    {rank <= 3 && (
                      <AnimatedFlame
                        className="absolute -right-2 -top-2"
                        delay={index * 0.12}
                      />
                    )}
                    {isLeader && (
                      <AnimatedFlame
                        className="absolute -left-2 bottom-0"
                        delay={0.3}
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground sm:text-base">
                      {contributor.login}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {isLeader
                        ? "Top performer"
                        : `${getOrdinalLabel(rank)} ranked contributor`}
                    </p>
                  </div>

                  <div className="text-right">
                    <AnimatedCounter
                      value={contributor.contributions}
                      formatter={integerNumberFormatter.format}
                      className="block text-lg font-semibold tracking-tight text-foreground sm:text-xl"
                    />
                    <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      commits
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-border/70 bg-white/60 p-4 text-sm leading-6 text-muted-foreground dark:bg-background/35">
            Contributor ranking is temporarily unavailable. Use the contributors
            page to inspect the latest public leaderboard directly.
          </div>
        )}

        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Open full contributors page
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
