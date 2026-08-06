"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuroraText } from "@/components/utils/aurora-text";
import { dashboardConfig } from "@/config/dashboard";
import type { DashboardData } from "@/types/github";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { AnimatedCounter, integerNumberFormatter } from "./dashboard-shared";

function HeroStat({
  label,
  value,
  description,
}: {
  label: string;
  value: number | null;
  description: string;
}) {
  return (
    <div className="rounded-[1.35rem] border border-sky-200/55 bg-white/80 p-3 shadow-[0_18px_44px_-42px_rgba(14,165,233,0.4)] backdrop-blur-md dark:border-border/60 dark:bg-background/55 dark:shadow-none sm:rounded-[1.75rem] sm:p-4">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:text-[11px]">
        {label}
      </p>
      <AnimatedCounter
        value={value}
        formatter={integerNumberFormatter.format}
        className="mt-2 block text-xl font-semibold tracking-tight sm:mt-3 sm:text-3xl"
      />
      <p className="mt-2 hidden text-sm leading-6 text-muted-foreground sm:block">
        {description}
      </p>
    </div>
  );
}

export function DashboardHeroSection({ data }: { data: DashboardData }) {
  return (
    <Card className="border border-sky-200/70 bg-linear-to-br from-white via-sky-50/80 to-emerald-50/75 shadow-[0_32px_90px_-54px_rgba(59,130,246,0.32)] backdrop-blur-xl dark:border-border/70 dark:from-card/85 dark:via-card/85 dark:to-card/85 dark:shadow-none">
      <CardHeader className="gap-5 pb-2 text-center lg:text-left">
        <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <Badge
            variant="outline"
            className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.16em]"
          >
            Live contribution hub
          </Badge>
        </div>

        <div className="space-y-4">
          <CardTitle className="text-4xl font-bold leading-tight md:text-6xl">
            Contributor{" "}
            <AuroraText
              colors={["#22d3ee", "#3b82f6", "#6366f1", "#a855f7", "#ec4899"]}
            >
              Dashboard
            </AuroraText>
          </CardTitle>
          <CardDescription className="mx-auto max-w-3xl text-sm leading-7 text-foreground/60 md:text-xl lg:mx-0">
            {dashboardConfig.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 pt-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <HeroStat
            label="Issue queue"
            value={data.issues.totalCount}
            description="Open tasks ready for contribution and triage."
          />
          <HeroStat
            label="Review lane"
            value={data.pullRequests.totalCount}
            description="Pull requests currently moving through review."
          />
          <HeroStat
            label="Project surface"
            value={data.totalProjects}
            description="Catalog entries contributors can explore or improve."
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
          <Link
            href={data.links.issues}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
          >
            Browse open issues
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <Link
            href={data.links.pulls}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-primary/45 hover:bg-primary/5 sm:w-auto"
          >
            Review pull requests
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <Link
            href={data.links.guide}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-primary/45 hover:bg-primary/5 sm:w-auto"
          >
            Read contributing guide
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
