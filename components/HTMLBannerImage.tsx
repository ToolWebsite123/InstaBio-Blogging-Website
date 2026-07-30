import Image from "next/image";

type HTMLBannerImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function getBannerSrc(src: string): string {
  if (!src) return src;
  if (
    src.endsWith(".html") ||
    src.includes("All%20instagram%20bio") ||
    src.includes("All instagram bio")
  ) {
    return decodeURIComponent(src)
      .replace(/All%20instagram%20bio|All instagram bio/g, "banner-images")
      .replace(/\.html$/, ".webp");
  }
  return src;
}

export default function HTMLBannerImage({
  src,
  alt,
  fill,
  priority,
  sizes,
  className = "",
}: HTMLBannerImageProps) {
  const resolvedSrc = getBannerSrc(src);

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
