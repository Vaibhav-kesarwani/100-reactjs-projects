import EngagementForms from "@/components/learning/engagement-forms";
import PracticeList from "@/components/learning/practice-list";
import ProgressSummary from "@/components/learning/progress-summary";
import { learningModules, practiceItems } from "@/config/learning";
import Link from "next/link";

export default function PracticePage() {
  const module = learningModules.find((item) => item.id === "practice");

  return (
    <section className="py-20">
      <div className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Learning module
        </p>
        <h1 className="text-3xl font-semibold md:text-4xl">
          {module?.title ?? "Practice"}
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          {module?.description}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="#practice"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            Jump to prompts
          </Link>
          <Link
            href="#insights"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            View progress
          </Link>
          <Link
            href="#engage"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            Join newsletter
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div id="practice">
          <PracticeList items={practiceItems} />
        </div>
        <div id="insights">
          <ProgressSummary moduleId="practice" totalCount={practiceItems.length} />
        </div>
      </div>

      <div id="engage" className="mt-14 space-y-6">
        <h2 className="text-2xl font-semibold">Stay in the loop</h2>
        <EngagementForms />
      </div>
    </section>
  );
}
