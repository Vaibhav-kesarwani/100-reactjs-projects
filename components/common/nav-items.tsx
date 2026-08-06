"use client";

import { navbarConfig } from "@/config/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItems() {
  const pathname = usePathname();

  return (
    <ul
      aria-label="Desktop navigation menu"
      className="hidden items-center justify-center gap-3 md:flex"
    >
      {navbarConfig.items.map((item, index) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={index}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            data-active={isActive}
            className="nav-link focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {item.label}
          </Link>
        );
      })}
    </ul>
  );
}
