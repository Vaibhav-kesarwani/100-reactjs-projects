import { getContributors } from "@/lib/get-contributors";
import { GitHubContributor } from "@/types/github";
import Image from "next/image";

export default async function ContributorGrid() {
  const contributors: GitHubContributor[] = (await getContributors()).sort(
    (a, b) => b.contributions - a.contributions,
  );

  if (contributors.length === 0) {
    return (
      <div className="mt-20 rounded-3xl border border-dashed border-border/70 bg-background/60 p-6 text-left text-sm leading-6 text-muted-foreground shadow-sm backdrop-blur-sm">
        Contributor data is temporarily unavailable. GitHub rate limits or a
        transient fetch failure can delay the public leaderboard. Please try
        again shortly.
      </div>
    );
  }

  return (
    <div className="mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {contributors.map((user: GitHubContributor, index: number) => (
        <a
          key={user.id}
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative border border-border p-3 rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
        >
          <Image
            src={user.avatar_url}
            alt={user.login}
            width={80}
            height={80}
            unoptimized
            className="mt-2 rounded-full mx-auto border-2 border-border border-dashed"
          />

          {index < 3 && (
            <div
              className={`flex items-center justify-center z-10 size-6 absolute bottom-22 md:bottom-18 right-13 text-xs font-semibold rounded-full shadow-sm
                ${
                  index === 0
                    ? "bg-yellow-100 text-black"
                    : index === 1
                      ? "bg-gray-300 text-black"
                      : "bg-amber-600 text-white"
                }`}
            >
              {index === 0 ? "1st" : index === 1 ? "2nd" : "3rd"}
            </div>
          )}

          <p className="mt-5 text-sm font-semibold text-start">
            <span className="text-xs font-medium text-foreground/80">ID: </span>
            {user.login}
          </p>

          <p className="mt-1 text-xs font-semibold text-start">
            <span className="text-xs font-medium text-foreground/80">
              Total:{" "}
            </span>
            {user.contributions} commits
          </p>
        </a>
      ))}
    </div>
  );
}
