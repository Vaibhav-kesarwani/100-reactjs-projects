/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { projectConfig } from "@/config/projects";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FaBookmark,
  FaGithub,
  FaLink,
  FaSearch,
  FaYoutube,
} from "react-icons/fa";
import SearchBar from "./search-bar";

const PROJECTS_PER_PAGE = 6;

export default function ProjectGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteProjects");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    setVisibleCount(PROJECTS_PER_PAGE);
  }, [searchQuery, showFavorites]);

  const toggleFavorite = (projectName: string) => {
    let updated: string[];

    if (favorites.includes(projectName)) {
      updated = favorites.filter((item) => item !== projectName);
    } else {
      updated = [...favorites, projectName];
    }

    setFavorites(updated);
    localStorage.setItem("favoriteProjects", JSON.stringify(updated));
  };

  const query = searchQuery.toLowerCase();

  const filteredProjects = useMemo(() => {
    return projectConfig.projects.filter((item) => {
      const matchesSearch =
        item.projectName.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.techStack?.some((tech: string) =>
          tech.toLowerCase().includes(query),
        );

      const matchesFavorites =
        !showFavorites || favorites.includes(item.projectName);

      return matchesSearch && matchesFavorites;
    });
  }, [query, favorites, showFavorites]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = filteredProjects.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PROJECTS_PER_PAGE);
  };

  return (
    <div className="mt-15">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Favorites toggle */}
      <div className="mt-6 mb-8 flex items-center gap-4">
        <button
          onClick={() => setShowFavorites((prev) => !prev)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-colors ${
            showFavorites
              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
              : "border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          <FaBookmark />
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
      </div>

      {filteredProjects.length > 0 ? (
        <>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((item, index) => (
              <div
                key={item.projectName}
                className="group relative overflow-hidden rounded-2xl border border-border backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={`/projects/${item.projectImage}`}
                    alt={item.projectName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1024px) 50vw,
                           33vw"
                    priority={index < 2}
                  />

                  {/* Favorite button */}
                  <button
                    onClick={() => toggleFavorite(item.projectName)}
                    className={`absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-black/40 backdrop-blur-md transition hover:scale-110 ${
                      favorites.includes(item.projectName)
                        ? "text-yellow-400"
                        : "text-white/70"
                    }`}
                  >
                    <FaBookmark />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {item.projectName}
                    </h3>

                    <span className="text-xs px-3 py-1 rounded-full border">
                      {item.difficulty}
                    </span>
                  </div>

                  <p className="text-sm text-foreground/70 line-clamp-2">
                    {item.description}
                  </p>

                  {/* TECH STACK */}
                  <div className="flex flex-wrap gap-2">
                    {item.techStack?.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* LINKS */}
                  <div className="flex gap-3">
                    {item.liveLink && (
                      <Link href={item.liveLink} target="_blank">
                        <FaLink />
                      </Link>
                    )}
                    {item.githubLink && (
                      <Link href={item.githubLink} target="_blank">
                        <FaGithub />
                      </Link>
                    )}
                    {item.ytLink && (
                      <Link href={item.ytLink} target="_blank">
                        <FaYoutube />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LOAD MORE */}
          {hasMore && (
            <div className="mt-10 text-center">
              <p className="text-sm mb-3 text-muted-foreground">
                Showing {visibleProjects.length} of {filteredProjects.length}
              </p>

              <button
                onClick={handleLoadMore}
                className="px-6 py-3 rounded-full border border-primary/40 bg-primary/10 hover:bg-primary/20 transition"
              >
                Load More
              </button>
            </div>
          )}

          {/* END STATE */}
          {!hasMore && filteredProjects.length > PROJECTS_PER_PAGE && (
            <p className="text-center mt-10 text-sm text-muted-foreground">
              ✓ All projects loaded
            </p>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center py-16 text-center">
          <FaSearch className="text-3xl opacity-50 mb-3" />
          <h3 className="text-lg font-semibold">No projects found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search
          </p>
        </div>
      )}
    </div>
  );
}
