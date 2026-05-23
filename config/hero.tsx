import { FaStar } from "react-icons/fa";

interface Hero {
  badge: {
    title: string;
    color: string;
    href: string;
  };
  description: string;
  ctaButton: {
    label: string;
    href: string;
    variant: "default" | "outline";
  }[];
  flexCards: {
    label: string;
    icon?: React.ElementType;
    description: string;
  }[];
  categoryTitle: {
    highlight: string;
    normal: string;
  };
  categoryCards: {
    titleLine1: string;
    titleLine2: string;
    description: string;
  }[];
}

export const heroConfig: Hero = {
  badge: {
    title: "Master Modern Web Development",
    color: "#22d3ee",
    href: "/projects",
  },
  description:
    "Build real-world applications, master modern tools, and elevate your frontend development skills with hands-on experience.",
  ctaButton: [
    {
      label: "Get Started",
      href: "/dashboard",
      variant: "default",
    },
    {
      label: "View Projects",
      href: "/projects",
      variant: "outline",
    },
  ],
  flexCards: [
    {
      label: "100+",
      description: "Hands-on Projects",
    },
    {
      label: "50K+",
      description: "Developers Inspired",
    },
    {
      label: "4.9",
      description: "Average Stars",
      icon: FaStar,
    },
  ],
  categoryTitle: {
    highlight: "Project",
    normal: "Categories",
  },
  categoryCards: [
    {
      titleLine1: "Beginner",
      titleLine2: "Projects",
      description:
        "Start your journey with fundamental React concepts, basic components, and simple state management.",
    },
    {
      titleLine1: "Intermediate",
      titleLine2: "Projects",
      description:
        "Deepen your skills with API integrations, complex hooks, and custom routing mechanisms.",
    },
    {
      titleLine1: "Advanced",
      titleLine2: "Projects",
      description:
        "Master React with full-stack integrations, performance optimization, and advanced architectures.",
    },
  ],
};
