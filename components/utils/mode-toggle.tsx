"use client";

import type { MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const THEME_TRANSITION_STYLE_ID = "theme-toggle-transition-styles";
const THEME_TRANSITION_DURATION_MS = 950;
const THEME_TRANSITION_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

type ThemeTransitionValues = {
  originX: number;
  originY: number;
  radius: number;
};

function getThemeTransitionValues(
  target: HTMLButtonElement,
): ThemeTransitionValues {
  const { left, top, width, height } = target.getBoundingClientRect();
  const originX = left + width / 2;
  const originY = top + height / 2;
  const maxX = Math.max(originX, window.innerWidth - originX);
  const maxY = Math.max(originY, window.innerHeight - originY);

  return {
    originX,
    originY,
    radius: Math.hypot(maxX, maxY),
  };
}

function updateThemeTransitionStyles({
  originX,
  originY,
  radius,
}: ThemeTransitionValues) {
  let styleElement = document.getElementById(
    THEME_TRANSITION_STYLE_ID,
  ) as HTMLStyleElement | null;

  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = THEME_TRANSITION_STYLE_ID;
    document.head.appendChild(styleElement);
  }

  styleElement.textContent = `
    ::view-transition-group(root) {
      animation-duration: ${THEME_TRANSITION_DURATION_MS}ms;
      animation-timing-function: ${THEME_TRANSITION_EASING};
    }

    ::view-transition-new(root) {
      animation-name: theme-reveal-light;
    }

    ::view-transition-old(root),
    .dark::view-transition-old(root) {
      animation: none;
      z-index: -1;
    }

    .dark::view-transition-new(root) {
      animation-name: theme-reveal-dark;
    }

    @keyframes theme-reveal-dark {
      from {
        clip-path: circle(0px at ${originX}px ${originY}px);
        filter: blur(12px);
      }

      60% {
        filter: blur(4px);
      }

      to {
        clip-path: circle(${radius}px at ${originX}px ${originY}px);
        filter: blur(0px);
      }
    }

    @keyframes theme-reveal-light {
      from {
        clip-path: circle(0px at ${originX}px ${originY}px);
        filter: blur(12px);
      }

      60% {
        filter: blur(4px);
      }

      to {
        clip-path: circle(${radius}px at ${originX}px ${originY}px);
        filter: blur(0px);
      }
    }
  `;
}

export function ModeToggle() {
  const { setTheme } = useTheme();
  const label = "Toggle theme";

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    const nextTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";

    updateThemeTransitionStyles(getThemeTransitionValues(event.currentTarget));

    const switchTheme = () => {
      setTheme(nextTheme);
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      type="button"
      className="relative"
      aria-label={label}
      onClick={handleToggle}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <span className="sr-only">{label}</span>
    </Button>
  );
}
