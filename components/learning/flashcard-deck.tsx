"use client";

import type { Flashcard } from "@/types/learning";
import { useLearning } from "@/components/utils/learning-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMemo, useState } from "react";
import { FaBookmark } from "react-icons/fa";

type FlashcardDeckProps = {
  cards: Flashcard[];
};

const ratingOptions = [1, 2, 3, 4, 5];

export default function FlashcardDeck({ cards }: FlashcardDeckProps) {
  const { flashcardRatings, rateFlashcard, bookmarks, toggleBookmark } =
    useLearning();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = cards[index];
  const progressValue = cards.length
    ? Math.round(((index + 1) / cards.length) * 100)
    : 0;

  const rating = useMemo(() => {
    if (!card) return undefined;
    return flashcardRatings[card.id]?.rating;
  }, [card, flashcardRatings]);

  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  if (!card) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No flashcards yet</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const isBookmarked = bookmarks.flashcards.includes(card.id);

  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Flashcard deck</CardTitle>
            <p className="text-sm text-muted-foreground">
              Card {index + 1} of {cards.length}
            </p>
          </div>
          <Badge variant="outline">{card.difficulty}</Badge>
        </div>
        <Progress value={progressValue} />
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setFlipped((prev) => !prev)}
          className="w-full rounded-2xl border border-border bg-muted/30 p-8 text-left text-base font-medium text-foreground shadow-sm transition-all hover:shadow-md"
        >
          {flipped ? card.back : card.front}
        </button>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            Rate your confidence
          </p>
          <div className="flex flex-wrap gap-2">
            {ratingOptions.map((value) => (
              <Button
                key={value}
                type="button"
                variant={rating === value ? "secondary" : "outline"}
                onClick={() => {
                  rateFlashcard(card.id, value);
                  nextCard();
                }}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={prevCard}>
            Previous
          </Button>
          <Button type="button" variant="outline" onClick={nextCard}>
            Next
          </Button>
        </div>
        <Button
          type="button"
          variant={isBookmarked ? "secondary" : "outline"}
          onClick={() => toggleBookmark("flashcards", card.id)}
          aria-pressed={isBookmarked}
        >
          <FaBookmark aria-hidden="true" />
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </Button>
      </CardFooter>
    </Card>
  );
}
