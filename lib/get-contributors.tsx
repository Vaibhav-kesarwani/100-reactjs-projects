import { GitHubContributor } from '@/types/github';

export async function getContributors(): Promise<GitHubContributor[]> {
  const res = await fetch(
    'https://api.github.com/repos/Vaibhav-kesarwani/100-reactjs-projects/contributors',
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN ?? ''}`,
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch contributors');
  }

  const data: GitHubContributor[] = await res.json();
  return data;
}
