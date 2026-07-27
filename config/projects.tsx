import { projectItemConfig, ProjectItems } from "./project-Item";

interface Project {
  description: string;
  searchbar: string;
  notFound: {
    title: string;
    description: string;
  };
  projects: ProjectItems[];
}

export const projectConfig: Project = {
  description:
    "Explore a curated collection of real-world React projects designed to help you master modern frontend development—from beginner to advanced.",
  searchbar: "Search projects",
  notFound: {
    title: "No projects found",
    description: "Try searching with a different keyword.",
  },
  projects: projectItemConfig,
};