/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

const TRANSITION_DURATION = 0.3;
const EASE_OUT_CUBIC = [0.215, 0.61, 0.355, 1] as const;
const COUNTDOWN_DURATION = 2000;
const AVATAR_COUNT = 5;
const STAGGER_DELAY = 0.05;
const COUNT_VALUE_WIDTH_CLASS = "w-[5ch]";
const COUNT_LABEL_WIDTH_CLASS = "w-10";

export interface Stargazer {
  avatar_url: string;
  html_url: string;
  login: string;
}

export interface GitHubStarsAnimationProps {
  apiEndpoint?: string;
  avatarClassName?: string;
  className?: string;
  countClassName?: string;
  maxAvatars?: number;
  owner?: string;
  repo?: string;
  showAvatars?: boolean;
  starCount?: number;
  stargazers?: Stargazer[];
}

export default function GitHubStarsAnimation({
  owner = "educlopez",
  repo = "smoothui",
  stargazers: providedStargazers,
  starCount: providedStarCount,
  apiEndpoint,
  className = "",
  avatarClassName = "",
  countClassName = "",
  showAvatars = true,
  maxAvatars = AVATAR_COUNT,
}: GitHubStarsAnimationProps) {
  const [stargazers, setStargazers] = useState<Stargazer[]>(
    providedStargazers || [],
  );
  const [starCount, setStarCount] = useState(providedStarCount || 0);
  const [displayCount, setDisplayCount] = useState(0);
  const [isLoading, setIsLoading] = useState(!providedStargazers);
  const [error, setError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const countSpring = useSpring(0, {
    stiffness: 100,
    damping: 30,
  });

  // Fetch stargazers and star count
  useEffect(() => {
    if (providedStargazers && providedStarCount !== undefined) {
      setStargazers(providedStargazers);
      setStarCount(providedStarCount);
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        let didLoadStarCount = false;

        // Try to fetch from custom API endpoint first
        if (apiEndpoint) {
          const response = await fetch(
            `${apiEndpoint}?owner=${owner}&repo=${repo}`,
          );
          if (response.ok) {
            const data = await response.json();
            if (data.stargazers) {
              setStargazers(data.stargazers.slice(0, maxAvatars));
            }
            if (data.stars !== undefined) {
              setStarCount(data.stars);
              didLoadStarCount = true;
            }

            if (didLoadStarCount) {
              return;
            }
          }
        }

        // Fallback to GitHub API directly (client-side)
        // Note: This has rate limits, so using a token is recommended
        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
        };

        // Parallelize independent fetches to eliminate waterfall
        const [repoResponse, stargazersResponse] = await Promise.all([
          fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers }),
          fetch(
            `https://api.github.com/repos/${owner}/${repo}/stargazers?per_page=${maxAvatars}`,
            { headers },
          ),
        ]);

        // Process repo info for star count
        if (repoResponse.ok) {
          try {
            const repoData = await repoResponse.json();
            setStarCount(repoData.stargazers_count || 0);
            didLoadStarCount = true;
          } catch {
            // Silently fail for star count
          }
        }

        // Process stargazers
        if (stargazersResponse.ok) {
          try {
            const stargazersData =
              (await stargazersResponse.json()) as Stargazer[];
            setStargazers(stargazersData.slice(0, maxAvatars));
          } catch {
            // Silently fail for stargazers
          }
        }

        setError(!didLoadStarCount);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    owner,
    repo,
    apiEndpoint,
    maxAvatars,
    providedStargazers,
    providedStarCount,
  ]);

  // Animate countdown
  useEffect(() => {
    if (starCount === 0 || shouldReduceMotion) {
      if (shouldReduceMotion) {
        setDisplayCount(starCount);
        countSpring.set(starCount);
      }
      return;
    }

    const startTime = Date.now();
    const startValue = 0;
    const endValue = starCount;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / COUNTDOWN_DURATION, 1);

      // Ease-out function
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.floor(startValue + (endValue - startValue) * eased);

      setDisplayCount(current);
      countSpring.set(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayCount(endValue);
        countSpring.set(endValue);
      }
    };

    animate();
  }, [starCount, countSpring, shouldReduceMotion]);

  const hasStarCountError = error && starCount === 0;
  const countLabel = hasStarCountError
    ? "stars"
    : displayCount === 1
      ? "star"
      : "stars";
  const countValue = hasStarCountError ? "--" : displayCount.toLocaleString();

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex items-center",
          showAvatars ? "gap-3" : "gap-1.5",
          className,
        )}
      >
        {showAvatars && (
          <div className="h-10 w-10 animate-pulse rounded-full bg-foreground/20" />
        )}
        <div
          className={cn(
            "flex h-6 items-center gap-1.5 font-medium whitespace-nowrap",
            countClassName,
          )}
        >
          <Star className="h-4 w-4 text-foreground/20" />
          <div
            className={cn(
              "h-4 animate-pulse rounded bg-foreground/20",
              COUNT_VALUE_WIDTH_CLASS,
            )}
          />
          <div
            className={cn(
              "h-4 animate-pulse rounded bg-foreground/20",
              COUNT_LABEL_WIDTH_CLASS,
            )}
          />
        </div>
      </div>
    );
  }

  const visibleAvatars = stargazers.slice(0, maxAvatars);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Avatars */}
      {showAvatars && visibleAvatars.length > 0 && (
        <div className="relative flex items-center">
          {visibleAvatars.map((stargazer, index) => (
            <motion.a
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      scale: 1,
                      x: 0,
                    }
              }
              aria-label={`${stargazer.login}'s GitHub profile`}
              className={cn(
                "relative z-10 h-10 w-10 overflow-hidden rounded-full border-2 border-background bg-background transition-transform hover:z-20 hover:scale-110",
                avatarClassName,
              )}
              href={stargazer.html_url}
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 0,
                      scale: 0.8,
                      x: -20,
                    }
              }
              key={stargazer.login}
              rel="noopener noreferrer"
              style={{
                marginLeft: index > 0 ? "-8px" : "0",
              }}
              target="_blank"
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: TRANSITION_DURATION,
                      delay: index * STAGGER_DELAY,
                      ease: EASE_OUT_CUBIC,
                    }
              }
              whileHover={shouldReduceMotion ? {} : { scale: 1.1, zIndex: 20 }}
            >
              <img
                alt={`${stargazer.login}'s avatar`}
                className="h-full w-full object-cover"
                src={stargazer.avatar_url}
              />
            </motion.a>
          ))}
        </div>
      )}

      {/* Star count */}
      <motion.div
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        className={cn(
          "flex h-6 items-center gap-1.5 font-medium whitespace-nowrap",
          countClassName,
        )}
        initial={
          shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: TRANSITION_DURATION,
                ease: EASE_OUT_CUBIC,
              }
        }
      >
        <Star className="h-4 w-4 fill-current" />
        <motion.span
          animate={
            shouldReduceMotion || hasStarCountError
              ? { scale: 1 }
              : { scale: [1, 1.1, 1] }
          }
          className={cn("tabular-nums text-right", COUNT_VALUE_WIDTH_CLASS)}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.3,
                  ease: EASE_OUT_CUBIC,
                }
          }
        >
          {countValue}
        </motion.span>
        <span
          className={cn("text-foreground/70 text-sm", COUNT_LABEL_WIDTH_CLASS)}
        >
          {countLabel}
        </span>
      </motion.div>
    </div>
  );
}
