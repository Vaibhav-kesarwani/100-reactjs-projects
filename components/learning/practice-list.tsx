"use client";

import type { PracticeItem } from "@/types/learning";
import { useLearning } from "@/components/utils/learning-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { FaBookmark } from "react-icons/fa";

type PracticeListProps = {
  items: PracticeItem[];
};

export default function PracticeList({ items }: PracticeListProps) {
  const { bookmarks, toggleBookmark } = useLearning();
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return items;

    return items.filter((item) => {
      const haystack = [
        item.title,
        item.prompt,
        item.explanation,
        item.difficulty,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(value);
    });
  }, [items, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Practice prompts</h2>
          <p className="text-sm text-muted-foreground">
            Search prompts, filter by tags, and bookmark the ones you want to
            revisit.
          </p>
        </div>
        <div className="w-full max-w-sm">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search practice topics"
            aria-label="Search practice topics"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredItems.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No practice items found</CardTitle>
              <CardDescription>
                Try another keyword or clear the search.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          filteredItems.map((item) => {
            const isBookmarked = bookmarks.practice.includes(item.id);
            const isExpanded = expanded[item.id];

            return (
              <Card key={item.id}>
                <CardHeader className="gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.prompt}</CardDescription>
                    </div>
                    <Badge variant="outline">{item.difficulty}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isExpanded && (
                    <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">
                        Explanation
                      </p>
                      <p className="mt-1">{item.explanation}</p>
                      {item.solution && (
                        <p className="mt-3 text-xs text-muted-foreground">
                          Suggested approach: {item.solution}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() =>
                      setExpanded((prev) => ({
                        ...prev,
                        [item.id]: !prev[item.id],
                      }))
                    }
                  >
                    {isExpanded ? "Hide explanation" : "Show explanation"}
                  </Button>
                  <Button
                    type="button"
                    variant={isBookmarked ? "secondary" : "outline"}
                    onClick={() => toggleBookmark("practice", item.id)}
                    aria-pressed={isBookmarked}
                  >
                    <FaBookmark aria-hidden="true" />
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
