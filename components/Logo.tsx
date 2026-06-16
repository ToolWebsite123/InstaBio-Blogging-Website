"use client";

import { useId } from "react";

type LogoProps = {
  size?: number;
  className?: string;
  title?: string;
};

export default function Logo({
  size = 32,
  className = "",
  title = "Instabiogen.online",
}: LogoProps) {
  const gradId = useId().replace(/:/g, "");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F5BD5" />
          <stop offset="35%" stopColor="#962FBF" />
          <stop offset="65%" stopColor="#D62976" />
          <stop offset="100%" stopColor="#FA7E1E" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill={`url(#${gradId})`} />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fill="white"
        fontSize="18"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        I
      </text>
    </svg>
  );
}
