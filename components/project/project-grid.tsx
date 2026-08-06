/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { projectConfig } from "@/config/projects";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FaBookmark,
  FaChevronDown,
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
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteProjects");

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(PROJECTS_PER_PAGE);
  }, [searchQuery, showFavorites]);

  const toggleFavorite = (projectName: string) => {
    let updatedFavorites: string[];

    if (favorites.includes(projectName)) {
      updatedFavorites = favorites.filter((item) => item !== projectName);
    } else {
      updatedFavorites = [...favorites, projectName];
    }

    setFavorites(updatedFavorites);

    localStorage.setItem("favoriteProjects", JSON.stringify(updatedFavorites));
  };

  const filteredProjects = useMemo(() => {
    return projectConfig.projects.filter((item) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        item.projectName.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.techStack &&
          item.techStack.some((tech: string) =>
            tech.toLowerCase().includes(query),
          ));

      const matchesFavorites =
        !showFavorites || favorites.includes(item.projectName);

      return matchesSearch && matchesFavorites;
    });
  }, [searchQuery, favorites, showFavorites]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = filteredProjects.length > visibleCount;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Small delay for visual feedback, then reveal next batch
    setTimeout(() => {
      setVisibleCount((prev) => prev + PROJECTS_PER_PAGE);
      setIsLoadingMore(false);
    }, 400);
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.97 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.38,
        delay: i * 0.06,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  return (
    <div className="mt-15">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="mt-6 mb-8 flex items-center gap-4">
        <button
          onClick={() => setShowFavorites((prev) => !prev)}
          aria-pressed={showFavorites}
          aria-label={
            showFavorites ? "Show all projects" : "Show favorite projects only"
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
            showFavorites
              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
              : "border-border bg-background text-foreground hover:bg-muted"
          } transition-colors duration-300 hover:bg-primary/10`}
        >
          <FaBookmark aria-hidden="true" />
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
      </div>

      {filteredProjects.length > 0 ? (
        <>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((item, index) => (
                <motion.div
                  key={item.projectName}
                  custom={index % PROJECTS_PER_PAGE}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                  layout
                  className="group relative overflow-hidden rounded-2xl border border-border backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={`/projects/${item.projectImage}`}
                      alt={item.projectName}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw,
                             (max-width: 1024px) 50vw,
                             33vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <button
                      onClick={() => toggleFavorite(item.projectName)}
                      aria-pressed={favorites.includes(item.projectName)}
                      aria-label={
                        favorites.includes(item.projectName)
                          ? `Remove ${item.projectName} from favorites`
                          : `Add ${item.projectName} to favorites`
                      }
                      className={`absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/60 ${
                        favorites.includes(item.projectName)
                          ? "text-yellow-400"
                          : "text-white/70"
                      }`}
                    >
                      <FaBookmark aria-hidden="true" />
                    </button>
                  </div>

                  <div className="relative flex flex-col gap-4 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold tracking-tight text-start">
                        {item.projectName}
                      </h3>

                      <span
                        aria-label={`Difficulty level: ${item.difficulty}`}
                        className={`rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap ${
                          item.difficulty === "Beginner"
                            ? "border-green-500/30 bg-green-500/10 text-green-400"
                            : item.difficulty === "Intermediate"
                              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                              : "border-red-500/30 bg-red-500/10 text-red-400"
                        }`}
                      >
                        {item.difficulty}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-foreground/70 font-medium text-start line-clamp-2">
                      {item.description}
                    </p>

                    {item.techStack && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.techStack.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex items-center gap-3">
                      {item.liveLink && (
                        <Link
                          href={item.liveLink}
                          target="_blank"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 hover:scale-110 hover:bg-muted"
                        >
                          <FaLink aria-hidden="true" size={16} />
                        </Link>
                      )}

                      {item.githubLink && (
                        <Link
                          href={item.githubLink}
                          target="_blank"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 hover:scale-110 hover:bg-muted"
                        >
                          <FaGithub aria-hidden="true" size={16} />
                        </Link>
                      )}

                      {item.ytLink && (
                        <Link
                          href={item.ytLink}
                          target="_blank"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 hover:scale-110 hover:bg-red-500 hover:text-white"
                        >
                          <FaYoutube aria-hidden="true" size={16} />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More Section */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-12 flex flex-col items-center gap-3"
            >
              {/* Progress indicator */}
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {visibleProjects.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {filteredProjects.length}
                </span>{" "}
                projects
              </p>

              {/* Thin progress bar */}
              <div className="relative w-48 h-1 rounded-full bg-border overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(visibleProjects.length / filteredProjects.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

              {/* Load More Button */}
              <motion.button
                id="load-more-projects-btn"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                whileHover={{ scale: isLoadingMore ? 1 : 1.04 }}
                whileTap={{ scale: isLoadingMore ? 1 : 0.97 }}
                aria-label="Load more projects"
                className={`
                  group relative mt-2 flex items-center gap-2.5
                  rounded-full border border-primary/40
                  bg-primary/10 px-8 py-3
                  text-sm font-semibold text-primary
                  backdrop-blur-md
                  shadow-[0_0_20px_-4px] shadow-primary/30
                  transition-all duration-300
                  hover:bg-primary/20 hover:border-primary/60
                  hover:shadow-[0_0_28px_-4px] hover:shadow-primary/50
                  disabled:cursor-not-allowed disabled:opacity-60
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-ring
                `}
              >
                {isLoadingMore ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Loading…
                  </>
                ) : (
                  <>
                    Load More Projects
                    <FaChevronDown
                      aria-hidden="true"
                      className="h-3 w-3 transition-transform duration-300 group-hover:translate-y-0.5"
                    />
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* All loaded indicator */}
          {!hasMore && filteredProjects.length > PROJECTS_PER_PAGE && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-10 text-center text-sm text-muted-foreground"
            >
              ✓ All{" "}
              <span className="font-semibold text-foreground">
                {filteredProjects.length}
              </span>{" "}
              projects loaded
            </motion.p>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FaSearch
            aria-hidden="true"
            className="mb-4 text-4xl text-foreground/50"
          />
          <h3 className="text-lg font-semibold">
            {projectConfig.notFound.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {projectConfig.notFound.description}
          </p>
        </div>
      )}
    </div>
  );
}
