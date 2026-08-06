export interface DashboardStep {
  title: string;
  description: string;
  href: string;
  cta: string;
  external?: boolean;
}

const owner = "Vaibhav-kesarwani";
const repo = "100-reactjs-projects";
const repoUrl = `https://github.com/${owner}/${repo}`;

export const dashboardConfig = {
  title: "Contributor Dashboard",
  description:
    "Track issues, pull requests, contribution flow, and repository momentum from one contributor-focused dashboard.",
  repo: {
    owner,
    name: repo,
    issuesUrl: `${repoUrl}/issues`,
    pullsUrl: `${repoUrl}/pulls`,
    stargazersUrl: `${repoUrl}/stargazers`,
    networkUrl: `${repoUrl}/network/members`,
    guideUrl: `${repoUrl}/blob/main/contributing.md`,
  },
  contributionSteps: [
    {
      title: "Find a scoped issue",
      description:
        "Start from the open issue queue, understand the acceptance criteria, and choose a task that matches your current bandwidth.",
      href: `${repoUrl}/issues`,
      cta: "Open issues",
      external: true,
    },
    {
      title: "Set up the workspace",
      description:
        "Fork the repository, install dependencies with pnpm, and run the Next.js app locally before making changes.",
      href: `${repoUrl}/blob/main/contributing.md#getting-started`,
      cta: "Setup guide",
      external: true,
    },
    {
      title: "Ship a focused change",
      description:
        "Keep edits minimal, follow the existing config-driven structure, and verify responsive UI behavior before opening a PR.",
      href: "/projects",
      cta: "View project surface",
    },
    {
      title: "Open a review-ready PR",
      description:
        "Use a clear summary, reference the related issue, and attach before/after screenshots for UI updates.",
      href: `${repoUrl}/pulls`,
      cta: "Review PR board",
      external: true,
    },
  ] as DashboardStep[],
};
