import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000/";

const projects = Array.from({ length: 100 }, (_, i) => ({
  slug: `project-${i + 1}`,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/dashboard", "/projects", "/contributors"].map(
    (route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.8,
    }),
  );

  const projectRoutes = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
