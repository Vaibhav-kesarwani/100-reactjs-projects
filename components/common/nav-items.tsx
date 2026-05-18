'use client';

import { navbarConfig } from '@/config/navbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItems() {
  const pathname = usePathname();

  return (
    <ul
      aria-label="Desktop navigation menu"
      className="hidden md:flex items-center justify-center gap-5"
    >
      {navbarConfig.items.map((item, index) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={index}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`font-medium
             ${isActive ? 'text-foreground' : 'text-foreground/50'}
            `}
          >
            {item.label}
          </Link>
        );
      })}
    </ul>
  );
}
