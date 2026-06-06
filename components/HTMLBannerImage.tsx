"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

type HTMLBannerImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

const BANNER_WIDTH = 680;

function measureHostWidth(host: HTMLDivElement): number {
  const width = host.offsetWidth;
  if (width > 0) return width;
  const parentWidth = host.parentElement?.clientWidth;
  if (parentWidth && parentWidth > 0) return parentWidth;
  return 0;
}

export default function HTMLBannerImage({
  src,
  alt,
  fill,
  priority,
  sizes,
  className = "",
}: HTMLBannerImageProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    if (!src || !src.endsWith(".html")) return;
    
    const host = hostRef.current;
    if (!host) return;

    const updateScale = () => {
      const width = measureHostWidth(host);
      if (width > 0) {
        setScale(width / BANNER_WIDTH);
      }
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(host);

    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", updateScale);
    window.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();
      viewport?.removeEventListener("resize", updateScale);
      window.removeEventListener("resize", updateScale);
    };
  }, [src]);

  if (src && src.endsWith(".html")) {
    return (
      <div 
        ref={hostRef}
        className={`w-full h-full overflow-hidden ${className.replace('object-cover', '').replace('transition-transform duration-500 group-hover:scale-105', '')}`}
      >
        <div
          className="origin-top-left transition-transform duration-500 group-hover:scale-105"
          style={{
            width: BANNER_WIDTH,
            height: 380,
            transform: `scale(${scale})`,
          }}
        >
          <iframe
            src={src}
            title={alt}
            loading={priority ? "eager" : "lazy"}
            className="w-full h-full border-0 block pointer-events-none"
            width={BANNER_WIDTH}
            height={380}
          />
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
