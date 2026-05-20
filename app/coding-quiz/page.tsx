import CodingQuizEngine from "@/components/learning/coding-quiz-engine";
import EngagementForms from "@/components/learning/engagement-forms";
import ProgressSummary from "@/components/learning/progress-summary";
import QuizHistory from "@/components/learning/quiz-history";
import {
  codingQuizQuestions,
  feedbackRules,
  learningModules,
  scoringRules,
} from "@/config/learning";
import Link from "next/link";

export default function CodingQuizPage() {
  const module = learningModules.find((item) => item.id === "coding-quiz");

  return (
    <section className="py-20">
      <div className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Learning module
        </p>
        <h1 className="text-3xl font-semibold md:text-4xl">
          {module?.title ?? "Coding Quiz"}
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          {module?.description}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="#quiz"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            Jump to quiz
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

      <div id="quiz" className="mt-10 grid gap-6 lg:grid-cols-[2fr,1fr]">
        <CodingQuizEngine
          title="Code comprehension"
          moduleId="coding-quiz"
          questions={codingQuizQuestions}
          scoringRule={scoringRules["coding-quiz"]}
          feedbackRule={feedbackRules["coding-quiz"]}
        />
        <div className="space-y-6" id="insights">
          <ProgressSummary
            moduleId="coding-quiz"
            totalCount={codingQuizQuestions.length}
          />
          <QuizHistory moduleId="coding-quiz" />
        </div>
      </div>

      <div id="engage" className="mt-14 space-y-6">
        <h2 className="text-2xl font-semibold">Stay in the loop</h2>
        <EngagementForms />
      </div>
    </section>
  );
}
