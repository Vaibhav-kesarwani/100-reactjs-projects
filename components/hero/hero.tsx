import { heroConfig } from "@/config/hero";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import AnimatedBadge from "../utils/animated-badge";
import { AuroraText } from "../utils/aurora-text";

export default function Hero() {
  return (
    <section className="mt-10 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative max-w-4xl px-6 text-center">
        <div
          className="hidden md:block relative md:mb-5"
          suppressHydrationWarning
        >
          <AnimatedBadge
            text={heroConfig.badge.title}
            color={heroConfig.badge.color}
            href={heroConfig.badge.href}
          />
        </div>

        <h1 className="text-3xl md:text-7xl font-bold leading-tight">
          Learn{" "}
          <AuroraText
            colors={["#22d3ee", "#3b82f6", "#6366f1", "#a855f7", "#ec4899"]}
          >
            React JS
          </AuroraText>{" "}
          with 100+ Projects
        </h1>

        <p className="mt-4 md:mt-6 text-sm md:text-xl text-foreground/60 max-w-2xl mx-auto">
          {heroConfig.description}
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          {heroConfig.ctaButton.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  buttonVariants({
                    variant: item.variant,
                    size: "lg",
                  }),
                  "bg-primary text-sm md:text-lg px-4 md:px-8 py-6 rounded-xl",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-15 grid grid-cols-1 md:grid-cols-3 gap-6">
          {heroConfig.flexCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="border border-border p-3 rounded-2xl">
                <div className="flex items-center justify-center gap-3">
                  <h3 className="text-2xl md:text-3xl font-semibold">
                    {item.label}
                  </h3>
                  {Icon && <Icon className="size-3 md:size-5" />}
                </div>
                <p className="md:text-xl font-medium text-foreground/90">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl">
            <AuroraText>{heroConfig.categoryTitle.highlight}</AuroraText>
            <span className="text-black dark:text-white ml-4">
              {heroConfig.categoryTitle.normal}
            </span>
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-center">
          {heroConfig.categoryCards.map((card, index) => (
            <div
              key={index}
              className="group relative rounded-2xl p-0.5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-linear-to-r from-[#22d3ee] via-[#6366f1] to-[#ec4899] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-48 bg-background border border-border group-hover:border-transparent rounded-[14px] flex items-center justify-center p-6 overflow-hidden">
                <div className="absolute flex flex-col items-center justify-center transition-all duration-500 group-hover:opacity-0 group-hover:scale-90">
                  <span className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                    {card.titleLine1}
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                    {card.titleLine2}
                  </span>
                </div>
                <div className="absolute flex flex-col items-center justify-center opacity-0 scale-110 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 px-2">
                  <p className="text-sm md:text-base text-foreground/90 font-medium">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
