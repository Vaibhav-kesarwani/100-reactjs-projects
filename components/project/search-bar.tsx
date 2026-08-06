import { projectConfig } from "@/config/projects";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}) {
  return (
    <div className="mb-12 flex justify-center">
      <div className="relative w-full max-w-2xl">
        <div className="group relative">
          <FaSearch
            aria-hidden="true"
            className="z-10 pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 size-4"
          />

          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <input
            id="project-search"
            type="text"
            placeholder={projectConfig.searchbar}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border/60 bg-background/80 py-3.5 pl-12 pr-5 text-sm font-medium text-foreground shadow-sm backdrop-blur-md transition-all duration-300 placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 hover:shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
