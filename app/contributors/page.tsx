import ContributorGrid from "@/components/contributors/contributor-grid";
import ProjectSuggestionForm from "@/components/contributors/project-suggestion-form";
import { AuroraText } from "@/components/utils/aurora-text";
import { contributorsConfig } from "@/config/contributors";
import { generateMetadata as getMetadata } from "@/config/meta";

export const metadata = getMetadata("/contributors");

export default async function Contributors() {
  return (
    <section className="mt-20 relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Contributors of 100+{" "}
          <AuroraText
            colors={["#22d3ee", "#3b82f6", "#6366f1", "#a855f7", "#ec4899"]}
          >
            React JS
          </AuroraText>{" "}
          Projects
        </h1>

        <p className="mt-4 md:mt-6 text-base md:text-xl text-foreground/60 max-w-2xl mx-auto">
          {contributorsConfig.description}
        </p>

        <ContributorGrid />
      </div>

      <div className="relative z-10 mx-auto mt-20 max-w-lg">
        <ProjectSuggestionForm />
      </div>
    </section>
  );
}
