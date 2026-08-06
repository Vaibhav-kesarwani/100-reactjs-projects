"use client";

import { Badge } from "@/components/ui/badge";
import type {
  GitHubIssueItem,
  GitHubLabel,
  GitHubPullRequestItem,
} from "@/types/github";
import { formatDistanceToNow } from "date-fns";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const compactNumberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export const integerNumberFormatter = new Intl.NumberFormat("en");
export const FEED_PREVIEW_LIMIT = 4;
export const LEADERBOARD_LIMIT = 5;
const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export type ActivityItem = GitHubIssueItem | GitHubPullRequestItem;

export function formatRelativeTime(value: string) {
  return formatDistanceToNow(new Date(value), { addSuffix: true });
}

export function getTopLabels(
  items: ActivityItem[],
): Array<GitHubLabel & { count: number }> {
  const labels = new Map<string, GitHubLabel & { count: number }>();

  items.forEach((item) => {
    item.labels.forEach((label) => {
      const key = label.name.toLowerCase();
      const existing = labels.get(key);

      if (existing) {
        existing.count += 1;
        return;
      }

      labels.set(key, {
        ...label,
        count: 1,
      });
    });
  });

  return [...labels.values()]
    .sort((left, right) => right.count - left.count)
    .slice(0, 5);
}

export function getOrdinalLabel(rank: number) {
  if (rank % 10 === 1 && rank % 100 !== 11) {
    return `${rank}st`;
  }

  if (rank % 10 === 2 && rank % 100 !== 12) {
    return `${rank}nd`;
  }

  if (rank % 10 === 3 && rank % 100 !== 13) {
    return `${rank}rd`;
  }

  return `${rank}th`;
}

export function AnimatedCounter({
  value,
  className,
  formatter = compactNumberFormatter.format,
}: {
  value: number | null;
  className?: string;
  formatter?: (value: number) => string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.55 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value === null || shouldReduceMotion || !isInView) {
      return;
    }

    let animationFrame = 0;
    const startTime = performance.now();
    const duration = 950;

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;

      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, shouldReduceMotion, value]);

  return (
    <span ref={ref} className={className}>
      {value === null
        ? "N/A"
        : shouldReduceMotion
          ? formatter(value)
          : formatter(displayValue)}
    </span>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay, ease: REVEAL_EASE }}
    >
      {children}
    </motion.div>
  );
}

export function DashboardBackdrop() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        className="absolute left-1/2 top-6 h-80 w-[min(72rem,92vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_60%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.18),transparent_60%)]"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.06, 0.98, 1],
                y: [0, 16, -10, 0],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-10 top-48 h-52 w-52 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_65%)] blur-3xl"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 28, -12, 0],
                y: [0, -22, 10, 0],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-96 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.16),transparent_65%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.18),transparent_65%)]"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -24, 12, 0],
                y: [0, 18, -12, 0],
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 top-12 h-px bg-linear-to-r from-transparent via-primary/35 to-transparent" />
    </div>
  );
}

export function AnimatedFlame({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      className={className}
      animate={
        shouldReduceMotion
          ? undefined
          : {
              y: [0, -4, 0],
              scale: [1, 1.12, 1],
              rotate: [-4, 4, -4],
            }
      }
      transition={{ duration: 1.6, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <Flame className="h-4 w-4 fill-orange-400 text-orange-500" />
    </motion.span>
  );
}

export function ActivityLane({
  children,
  ariaLabel,
  hintText,
}: {
  children: ReactNode;
  ariaLabel: string;
  hintText: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div>
      <div className="mb-3 flex items-center justify-between pr-1 md:hidden">
        <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px]">
          {hintText}
        </Badge>
        <motion.span
          className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground"
          animate={shouldReduceMotion ? undefined : { x: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          Swipe
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.span>
      </div>

      <div
        aria-label={ariaLabel}
        className="overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex snap-x snap-mandatory gap-4 pr-4 sm:pr-6">
          {children}
        </div>
      </div>
    </div>
  );
}
