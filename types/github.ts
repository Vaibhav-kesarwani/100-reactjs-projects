export interface GitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
  site_admin: boolean;
}

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubLabel {
  id: number;
  name: string;
  color: string;
  description: string | null;
}

export interface GitHubIssueItem {
  id: number;
  number: number;
  title: string;
  html_url: string;
  comments: number;
  created_at: string;
  updated_at: string;
  state: "open" | "closed";
  user: GitHubUser;
  labels: GitHubLabel[];
}

export interface GitHubPullRequestItem extends GitHubIssueItem {
  draft?: boolean;
}

export interface GitHubRepository {
  stargazers_count: number;
  forks_count: number;
}

export interface GitHubSearchResponse<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

export interface DashboardCollection<T> {
  totalCount: number | null;
  items: T[];
}

export interface DashboardLinks {
  issues: string;
  pulls: string;
  stargazers: string;
  network: string;
  contributors: string;
  guide: string;
  projects: string;
}

export interface DashboardData {
  repo: GitHubRepository | null;
  issues: DashboardCollection<GitHubIssueItem>;
  pullRequests: DashboardCollection<GitHubPullRequestItem>;
  contributorCount: number | null;
  topContributors: GitHubContributor[];
  totalProjects: number;
  links: DashboardLinks;
}
