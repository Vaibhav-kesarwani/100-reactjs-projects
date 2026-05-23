"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { DashboardData } from "@/types/github";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  FolderGit2,
  FolderKanban,
  GitFork,
  GitPullRequest,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { AnimatedCounter } from "./dashboard-shared";

interface MetricCardItem {
  title: string;
  value: number | null;
  description: string;
  href: string;
  icon: LucideIcon;
}

function isExternalLink(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function MetricCard({
  title,
  value,
  description,
  href,
  icon: Icon,
}: MetricCardItem) {
  const external = isExternalLink(href);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="group block h-full"
      >
        <Card className="relative h-full border border-sky-200/65 bg-white/85 shadow-[0_20px_52px_-46px_rgba(59,130,246,0.3)] backdrop-blur-xl transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary/5 dark:border-border/70 dark:bg-card/80 dark:shadow-none">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.14),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0" />
          <CardHeader className="relative gap-2 px-3 sm:gap-3">
            <div className="hidden items-center justify-between gap-3 sm:flex">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground sm:text-sm">
                {title}
              </p>
              <AnimatedCounter
                value={value}
                className="mt-1 block text-2xl font-semibold tracking-tight sm:mt-2 sm:text-3xl"
              />
            </div>
          </CardHeader>
          <CardContent className="relative hidden sm:block">
            <p className="text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export function DashboardMetricsSection({ data }: { data: DashboardData }) {
  const metricCards: MetricCardItem[] = [
    {
      title: "Open issues",
      value: data.issues.totalCount,
      description:
        "Tasks available for triage, fixes, feature work, and documentation updates.",
      href: data.links.issues,
      icon: FolderKanban,
    },
    {
      title: "Open pull requests",
      value: data.pullRequests.totalCount,
      description:
        "Changes currently moving through review, feedback, and merge readiness.",
      href: data.links.pulls,
      icon: GitPullRequest,
    },
    {
      title: "Contributors",
      value: data.contributorCount,
      description:
        "Developers already active in the repository and visible on the leaderboard.",
      href: data.links.contributors,
      icon: Users,
    },
    {
      title: "Projects",
      value: data.totalProjects,
      description:
        "Curated React and Next.js project entries available to explore and extend.",
      href: data.links.projects,
      icon: FolderGit2,
    },
    {
      title: "Stars",
      value: data.repo?.stargazers_count ?? null,
      description:
        "Community attention around the repository and the project catalog.",
      href: data.links.stargazers,
      icon: Star,
    },
    {
      title: "Forks",
      value: data.repo?.forks_count ?? null,
      description:
        "Active repository copies used by contributors to build and submit changes.",
      href: data.links.network,
      icon: GitFork,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
      {metricCards.map((card) => (
        <MetricCard key={card.title} {...card} />
      ))}
    </div>
  );
}
