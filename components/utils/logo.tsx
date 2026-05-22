import { logoConfig } from "@/config/logo";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href={logoConfig.logohref}
      target="_blank"
      className="flex items-center justify-center w-40 h-12 overflow-hidden relative"
    >
      <Image
        src={logoConfig.logoImage}
        alt={logoConfig.logoAlt}
        width={360}
        height={40}
        priority
        className="object-contain h-20 w-auto min-w-[110px]"
      />
    </Link>
  );
}
