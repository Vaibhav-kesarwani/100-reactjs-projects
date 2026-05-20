"use client";

import type {
  Bookmarks,
  FlashcardRating,
  LearningModuleId,
  ModuleProgress,
  QuizAttempt,
} from "@/types/learning";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEYS = {
  bookmarks: "learning.bookmarks",
  quizHistory: "learning.quizHistory",
  flashcardRatings: "learning.flashcardRatings",
};

type LearningContextValue = {
  bookmarks: Bookmarks;
  quizHistory: QuizAttempt[];
  flashcardRatings: Record<string, FlashcardRating>;
  recordQuizAttempt: (attempt: QuizAttempt) => void;
  toggleBookmark: (scope: keyof Bookmarks, id: string) => void;
  rateFlashcard: (id: string, rating: number) => void;
  getQuizProgress: (moduleId: LearningModuleId) => ModuleProgress;
};

const defaultBookmarks: Bookmarks = {
  practice: [],
  flashcards: [],
};

const LearningContext = createContext<LearningContextValue | null>(null);

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmarks>(defaultBookmarks);
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([]);
  const [flashcardRatings, setFlashcardRatings] = useState<
    Record<string, FlashcardRating>
  >({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setBookmarks(
      safeParse<Bookmarks>(
        window.localStorage.getItem(STORAGE_KEYS.bookmarks),
        defaultBookmarks
      )
    );
    setQuizHistory(
      safeParse<QuizAttempt[]>(
        window.localStorage.getItem(STORAGE_KEYS.quizHistory),
        []
      )
    );
    setFlashcardRatings(
      safeParse<Record<string, FlashcardRating>>(
        window.localStorage.getItem(STORAGE_KEYS.flashcardRatings),
        {}
      )
    );
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;

    window.localStorage.setItem(
      STORAGE_KEYS.bookmarks,
      JSON.stringify(bookmarks)
    );
    window.localStorage.setItem(
      STORAGE_KEYS.quizHistory,
      JSON.stringify(quizHistory)
    );
    window.localStorage.setItem(
      STORAGE_KEYS.flashcardRatings,
      JSON.stringify(flashcardRatings)
    );
  }, [bookmarks, flashcardRatings, hydrated, quizHistory]);

  const recordQuizAttempt = useCallback((attempt: QuizAttempt) => {
    setQuizHistory((prev) => [attempt, ...prev].slice(0, 50));
  }, []);

  const toggleBookmark = useCallback(
    (scope: keyof Bookmarks, id: string) => {
      setBookmarks((prev) => {
        const existing = new Set(prev[scope]);
        if (existing.has(id)) {
          existing.delete(id);
        } else {
          existing.add(id);
        }

        return {
          ...prev,
          [scope]: Array.from(existing),
        } as Bookmarks;
      });
    },
    []
  );

  const rateFlashcard = useCallback((id: string, rating: number) => {
    setFlashcardRatings((prev) => ({
      ...prev,
      [id]: {
        id,
        rating,
        ratedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const getQuizProgress = useCallback(
    (moduleId: LearningModuleId): ModuleProgress => {
      const attempts = quizHistory.filter(
        (attempt) => attempt.moduleId === moduleId
      );

      if (attempts.length === 0) {
        return {
          attempts: 0,
          bestPercent: 0,
          averagePercent: 0,
        };
      }

      const bestPercent = Math.max(...attempts.map((item) => item.percent));
      const averagePercent =
        attempts.reduce((sum, item) => sum + item.percent, 0) / attempts.length;
      const lastAttemptAt = attempts[0]?.completedAt;

      return {
        attempts: attempts.length,
        bestPercent,
        averagePercent,
        lastAttemptAt,
      };
    },
    [quizHistory]
  );

  const value = useMemo<LearningContextValue>(
    () => ({
      bookmarks,
      quizHistory,
      flashcardRatings,
      recordQuizAttempt,
      toggleBookmark,
      rateFlashcard,
      getQuizProgress,
    }),
    [
      bookmarks,
      flashcardRatings,
      getQuizProgress,
      quizHistory,
      rateFlashcard,
      recordQuizAttempt,
      toggleBookmark,
    ]
  );

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error("useLearning must be used within LearningProvider");
  }
  return context;
}
