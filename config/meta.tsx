export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
}

// Base site configuration
export const siteConfig = {
  name: "100+ Reactjs Projects",
  title: "Reactjs Projects",
  description:
    "Build real-world applications, master modern tools, and elevate your frontend development skills with hands-on experience.",
  url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
  ogImage: "/meta/hero.png",
  author: {
    name: "Vaibhav Kesarwani",
    twitter: "@vaibhav_k__",
    github: "Vaibhav-kesarwani",
    linkedin: "vaibhavdev",
    email: "vaibhavkesarwani100@gmail.com",
  },
  keywords: [
    "100+ Reactjs projects",
    "100 reactjs projects",
    "Nextjs Projects",
    "50+ React.js Projects",
    "Open Source",
    "Community",
    "nsoc",
    "Nexus Spring of Code",
    "gssoc",
    "GirlScript Summer of Code",
  ],
};

export const pageMetadata: Record<string, PageMeta> = {
  "/": {
    title: "100+ Reactjs Projects",
    description:
      "Build real-world applications, master modern tools, and elevate your frontend development skills with hands-on experience.",
    keywords: [
      "100+ Reactjs projects",
      "100 reactjs projects",
      "Nextjs Projects",
      "50+ React.js Projects",
      "Open Source",
      "Community",
      "nsoc",
      "Nexus Spring of Code",
      "gssoc",
      "GirlScript Summer of Code",
    ],
    ogImage: "/meta/hero.png",
    twitterCard: "summary_large_image",
  },

  "/projects": {
    title: "100+ Reactjs Projects | Projects",
    description:
      "Build real-world applications, master modern tools, and elevate your frontend development skills with hands-on experience.",
    keywords: [
      "100+ Reactjs projects",
      "100 reactjs projects",
      "Nextjs Projects",
      "sendly",
      "gitsolve",
      "github",
      "50+ React.js Projects",
      "Open Source",
      "Community",
      "nsoc",
      "Nexus Spring of Code",
      "gssoc",
      "GirlScript Summer of Code",
    ],
    ogImage: "/meta/projects.png",
    twitterCard: "summary_large_image",
  },

  "/dashboard": {
    title: "Contributor Dashboard | 100+ Reactjs Projects",
    description:
      "Follow issue activity, pull request progress, contributor leaderboard updates, and contribution workflow from one centralized dashboard.",
    keywords: [
      "100+ Reactjs projects dashboard",
      "GitHub issue tracker",
      "pull request dashboard",
      "open source contribution",
      "contributor leaderboard",
      "repository activity",
      "gssoc",
      "GirlScript Summer of Code",
    ],
    ogImage: "/meta/projects.png",
    twitterCard: "summary_large_image",
  },

  "/contributors": {
    title: "Contributors of 100+ Reactjs projects",
    description:
      "Meet the amazing developers behind this project. Discover our top contributors and their impactful contributions.",
    keywords: [
      "100+ Reactjs projects",
      "100 reactjs projects",
      "Nextjs Projects",
      "GitHub Contributors",
      "Top Contributors",
      "50+ React.js Projects",
      "Open Source",
      "Community",
      "nsoc",
      "Nexus Spring of Code",
      "gssoc",
      "GirlScript Summer of Code",
    ],
    ogImage: "/meta/projects.png",
    twitterCard: "summary_large_image",
  },
};

// Helper function to get metadata for a specific page
export function getPageMetadata(pathname: string): PageMeta {
  return pageMetadata[pathname] || pageMetadata["/"];
}

// Helper function to generate complete metadata object for Next.js
export function generateMetadata(pathname: string) {
  const pageMeta = getPageMetadata(pathname);

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageMeta.title,
    description: pageMeta.description,
    icons: {
      icon: "/logo/logo.png",
      shortcut: "/logo/logo.png",
      apple: "/logo/logo.png",
    },
    keywords: pageMeta.keywords?.join(", "),
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    openGraph: {
      type: "website",
      url: `${siteConfig.url}${pathname}`,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: siteConfig.title,
      images: [
        {
          url: pageMeta.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
        },
      ],
    },
    twitter: {
      card: pageMeta.twitterCard || "summary_large_image",
      title: pageMeta.title,
      description: pageMeta.description,
      creator: siteConfig.author.twitter,
      images: [pageMeta.ogImage || siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}${pathname}`,
    },
  };
}
