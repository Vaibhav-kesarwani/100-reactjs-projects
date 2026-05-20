interface Navbar {
  items: {
    label: string;
    href: string;
  }[];
}

export const navbarConfig: Navbar = {
  items: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Quiz",
      href: "/quiz",
    },
    {
      label: "Coding Quiz",
      href: "/coding-quiz",
    },
    {
      label: "Practice",
      href: "/practice",
    },
    {
      label: "Flashcards",
      href: "/flashcards",
    },
    {
      label: "Contributors",
      href: "/contributors",
    },
  ],
};
