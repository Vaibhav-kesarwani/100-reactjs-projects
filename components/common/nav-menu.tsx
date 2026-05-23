"use client";

import { navbarConfig } from "@/config/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavMenu {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavMenu({ open, setOpen }: NavMenu) {
  const pathname = usePathname();


  return (
    <ul
      id="mobile-menu"
      aria-label="Mobile navigation menu"
      className={`absolute top-full left-1/2 w-full max-w-sm
-translate-x-1/2 rounded-b-2xl border border-border
bg-background/95 backdrop-blur-md shadow-lg overflow-hidden
md:hidden flex flex-col items-start gap-2 px-4
transition-all duration-300 ease-in-out origin-top
${open
          ? "max-h-96 opacity-100 py-4 translate-y-0"
          : "max-h-0 opacity-0 py-0 -translate-y-3 pointer-events-none border-transparent"
        }`}
    >
      {navbarConfig.items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive ? "page" : undefined}
              data-active={isActive}
              className="nav-link focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
