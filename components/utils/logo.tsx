import { logoConfig } from '@/config/logo';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href={logoConfig.logohref}
      target="_blank"
      className="flex items-center justify-center gap-3"
    >
      <Image
        src={logoConfig.logoImage}
        alt={logoConfig.logoAlt}
        width={60}
        height={60}
        priority
        className="size-10 rounded-full border border-border object-cover"
      />
      <h2 className="text-lg md:text-xl font-semibold">{logoConfig.name}</h2>
    </Link>
  );
}
