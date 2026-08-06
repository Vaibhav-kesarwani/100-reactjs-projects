"use client";

import type { DashboardData } from "@/types/github";
import { ContributorsLeaderboard } from "./contributors-leaderboard";
import { DashboardActivityFeed } from "./dashboard-activity-feed";
import { DashboardHeroSection } from "./dashboard-hero-section";
import { DashboardLabelSignals } from "./dashboard-label-signals";
import { DashboardMetricsSection } from "./dashboard-metrics-section";
import { DashboardBackdrop, Reveal, getTopLabels } from "./dashboard-shared";
import { DashboardWorkflowSection } from "./dashboard-workflow-section";

export default function DashboardOverview({ data }: { data: DashboardData }) {
  const activeLabels = getTopLabels([
    ...data.issues.items,
    ...data.pullRequests.items,
  ]);

  return (
    <section className="relative mt-20 overflow-hidden px-4 pb-16 pt-8 md:pt-10">
      <DashboardBackdrop />

      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:gap-8">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <DashboardHeroSection data={data} />
            <ContributorsLeaderboard
              contributors={data.topContributors}
              href={data.links.contributors}
            />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <DashboardMetricsSection data={data} />
        </Reveal>

        <Reveal delay={0.1}>
          <DashboardActivityFeed
            title="Issue activity"
            description="Open issue context for contributors who want to pick scoped work fast. The lane shows only the latest cards and clearly hints that more activity is available by swiping on mobile."
            totalCount={data.issues.totalCount}
            href={data.links.issues}
            items={data.issues.items}
            type="issue"
          />
        </Reveal>

        <Reveal delay={0.15}>
          <DashboardActivityFeed
            title="Pull request activity"
            description="Current review queue and implementation work already moving through the repository, previewed in compact swipeable cards without overcommitting space on small screens."
            totalCount={data.pullRequests.totalCount}
            href={data.links.pulls}
            items={data.pullRequests.items}
            type="pull-request"
          />
        </Reveal>

        <Reveal delay={0.2}>
          <DashboardWorkflowSection />
        </Reveal>

        <Reveal delay={0.25}>
          <DashboardLabelSignals labels={activeLabels} />
        </Reveal>
      </div>
    </section>
  );
}
