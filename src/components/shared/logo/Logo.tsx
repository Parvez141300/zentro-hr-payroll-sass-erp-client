import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={`flex items-center justify-center gap-2 font-medium ${className}`}
    >
      <Image
        src="/assets/logos/zentro-logo-2.png"
        alt="zentor-logo-2"
        width={150}
        height={500}
      />
    </Link>
  );
};

export default Logo;
