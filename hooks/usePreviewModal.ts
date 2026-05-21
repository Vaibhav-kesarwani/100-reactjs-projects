// Pure TypeScript Interface for Project Item Data
export interface ProjectItem {
  title: string;
  description: string;
  github: string;
  demo: string;
  tags: string[];
  features?: string[];
  hooks?: string[];
}