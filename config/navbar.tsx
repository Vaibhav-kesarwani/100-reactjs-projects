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
      label: "Contributors",
      href: "/contributors",
    },
    
  ],
};
