import { unstable_cache } from "next/cache";
import { dashboardConfig } from "@/config/dashboard";
import { projectConfig } from "@/config/projects";
import type {
  DashboardData,
  GitHubContributor,
  GitHubIssueItem,
  GitHubPullRequestItem,
  GitHubRepository,
  GitHubSearchResponse,
} from "@/types/github";

const GITHUB_API_BASE = "https://api.github.com";
const FEED_PREVIEW_LIMIT = 4;
const DASHBOARD_CACHE_TTL_SECONDS = 1800;
const REPOSITORY = `${dashboardConfig.repo.owner}/${dashboardConfig.repo.name}`;

export const DASHBOARD_CACHE_TAG = "dashboard-data";

let lastSuccessfulDashboardSnapshot: DashboardData | null = null;

class DashboardSnapshotFallbackError extends Error {
  readonly fallbackData: DashboardData;

  constructor(fallbackData: DashboardData) {
    super("Dashboard data is temporarily unavailable.");
    this.name = "DashboardSnapshotFallbackError";
    this.fallbackData = fallbackData;
  }
}

function createDashboardLinks(): DashboardData["links"] {
  return {
    issues: dashboardConfig.repo.issuesUrl,
    pulls: dashboardConfig.repo.pullsUrl,
    stargazers: dashboardConfig.repo.stargazersUrl,
    network: dashboardConfig.repo.networkUrl,
    contributors: "/contributors",
    guide: dashboardConfig.repo.guideUrl,
    projects: "/projects",
  };
}

function createEmptyDashboardData(): DashboardData {
  return {
    repo: null,
    issues: {
      totalCount: null,
      items: [],
    },
    pullRequests: {
      totalCount: null,
      items: [],
    },
    contributorCount: null,
    topContributors: [],
    totalProjects: projectConfig.projects.length,
    links: createDashboardLinks(),
  };
}

function getGitHubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "GSSOC-Dashboard",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (
    process.env.GITHUB_TOKEN &&
    process.env.GITHUB_TOKEN !== "your_github_token_here"
  ) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchGitHubJson<T>(path: string): Promise<T> {
  const response = await fetch(`${GITHUB_API_BASE}${path}`, {
    headers: getGitHubHeaders(),
    next: {
      revalidate: DASHBOARD_CACHE_TTL_SECONDS,
      tags: [DASHBOARD_CACHE_TAG],
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `GitHub API request failed (${response.status} ${response.statusText}): ${errorText}`,
    );
  }

  return (await response.json()) as T;
}

function logRejectedResult(
  label: string,
  result: PromiseSettledResult<unknown>,
) {
  if (result.status === "rejected") {
    console.error(`Dashboard ${label} fetch failed`, result.reason);
  }
}

async function fetchRepository() {
  return fetchGitHubJson<GitHubRepository>(`/repos/${REPOSITORY}`);
}

async function fetchIssues() {
  const query = encodeURIComponent(`repo:${REPOSITORY} is:issue state:open`);

  return fetchGitHubJson<GitHubSearchResponse<GitHubIssueItem>>(
    `/search/issues?q=${query}&sort=updated&order=desc&per_page=${FEED_PREVIEW_LIMIT}`,
  );
}

async function fetchPullRequests() {
  const query = encodeURIComponent(`repo:${REPOSITORY} is:pr state:open`);

  return fetchGitHubJson<GitHubSearchResponse<GitHubPullRequestItem>>(
    `/search/issues?q=${query}&sort=updated&order=desc&per_page=${FEED_PREVIEW_LIMIT}`,
  );
}

async function fetchContributorsForDashboard() {
  return fetchGitHubJson<GitHubContributor[]>(
    `/repos/${REPOSITORY}/contributors`,
  );
}

async function buildDashboardData(): Promise<DashboardData> {
  const [
    repositoryResult,
    issuesResult,
    pullRequestsResult,
    contributorsResult,
  ] = await Promise.allSettled([
    fetchRepository(),
    fetchIssues(),
    fetchPullRequests(),
    fetchContributorsForDashboard(),
  ]);

  logRejectedResult("repository", repositoryResult);
  logRejectedResult("issues", issuesResult);
  logRejectedResult("pull requests", pullRequestsResult);
  logRejectedResult("contributors", contributorsResult);

  const contributors =
    contributorsResult.status === "fulfilled"
      ? [...contributorsResult.value].sort(
          (left: GitHubContributor, right: GitHubContributor) =>
            right.contributions - left.contributions,
        )
      : [];

  const issues =
    issuesResult.status === "fulfilled"
      ? {
          totalCount: issuesResult.value.total_count,
          items: issuesResult.value.items,
        }
      : {
          totalCount: null,
          items: [],
        };

  const pullRequests =
    pullRequestsResult.status === "fulfilled"
      ? {
          totalCount: pullRequestsResult.value.total_count,
          items: pullRequestsResult.value.items,
        }
      : {
          totalCount: null,
          items: [],
        };

  const repository =
    repositoryResult.status === "fulfilled" ? repositoryResult.value : null;

  const snapshot = {
    repo: repository,
    issues,
    pullRequests,
    contributorCount: contributors.length > 0 ? contributors.length : null,
    topContributors: contributors.slice(0, 5),
    totalProjects: projectConfig.projects.length,
    links: createDashboardLinks(),
  };

  const hasRejectedResult = [
    repositoryResult,
    issuesResult,
    pullRequestsResult,
    contributorsResult,
  ].some((result) => result.status === "rejected");

  if (hasRejectedResult) {
    throw new DashboardSnapshotFallbackError(
      lastSuccessfulDashboardSnapshot ?? snapshot,
    );
  }

  return snapshot;
}

const getCachedDashboardData = unstable_cache(
  buildDashboardData,
  [DASHBOARD_CACHE_TAG],
  {
    revalidate: DASHBOARD_CACHE_TTL_SECONDS,
    tags: [DASHBOARD_CACHE_TAG],
  },
);

export async function getDashboardData(): Promise<DashboardData> {
  try {
    const snapshot = await getCachedDashboardData();
    lastSuccessfulDashboardSnapshot = snapshot;
    return snapshot;
  } catch (error) {
    if (error instanceof DashboardSnapshotFallbackError) {
      return error.fallbackData;
    }

    console.error("Dashboard data request failed", error);
    return lastSuccessfulDashboardSnapshot ?? createEmptyDashboardData();
  }
}
