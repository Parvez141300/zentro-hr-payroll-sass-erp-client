import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({
  width,
  height,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <Link
      href="/"
      className={`flex items-center justify-center gap-2 font-medium ${className}`}
    >
      <Image
        src="/assets/logos/zentro-logo-2.png"
        alt="zentor-logo-2"
        width={width ? width : 100}
        height={height ? height : 50}
        className={cn("w-auto h-auto", className && `${className}`)}
        loading="eager"
      />
    </Link>
  );
};

export default Logo;
