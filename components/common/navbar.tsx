"use client";

import { useState } from "react";
import Logo from "../utils/logo";
import { ModeToggle } from "../utils/mode-toggle";
import NavItems from "./nav-items";
import NavMenu from "./nav-menu";
import { Menu, X } from "lucide-react";
import GitHubStarsAnimation from "../utils/github-star-animation";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl -translate-x-1/2
      flex items-center justify-between
      ${open ? "rounded-t-2xl" : "rounded-2xl"} md:rounded-2xl border border-border
      backdrop-blur-md
      px-6 py-3 shadow-lg`}
    >
      <Logo />
      <NavItems />
      <div className="flex items-center justify-center gap-2 md:gap-5">
        <ModeToggle />

        <Link
          href={"https://github.com/Vaibhav-kesarwani/100-reactjs-projects"}
          target="_blank"
          aria-label="View GitHub repository (opens in new tab)"
          className="hidden md:block border border-border p-2 rounded-lg"
        >
          <GitHubStarsAnimation
            maxAvatars={3}
            owner="Vaibhav-kesarwani"
            repo="100-reactjs-projects"
            showAvatars={false}
          />
        </Link>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <X size={22} className="text-foreground/50" />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </div>
      <NavMenu open={open} setOpen={setOpen} />
    </nav>
  );
}
