"use client";

import { useLayoutEffect, useRef, useState } from "react";

type BioBannerProps = {
  src: string;
  title?: string;
};

const BANNER_WIDTH = 680;
const BANNER_HEIGHT = 380;

function estimateScale(): number {
  if (typeof window === "undefined") return 0.55;
  const width = Math.min(window.innerWidth, 800) - 32;
  return width > 0 ? width / BANNER_WIDTH : 0.55;
}

function measureHostWidth(host: HTMLDivElement): number {
  const width = host.offsetWidth;
  if (width > 0) return width;
  const parentWidth = host.parentElement?.clientWidth;
  if (parentWidth && parentWidth > 0) return parentWidth;
  return 0;
}

export default function BioBanner({ src, title = "Instagram bio preview" }: BioBannerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(estimateScale);

  useLayoutEffect(() => {
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
  }, []);

  return (
    <div
      ref={hostRef}
      className="bio-banner-scale-host relative my-6 sm:my-8 w-full min-w-0 max-w-full aspect-[680/380] overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-gray-50 shadow-md"
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: BANNER_WIDTH,
          height: BANNER_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className="w-full h-full border-0 block"
          width={BANNER_WIDTH}
          height={BANNER_HEIGHT}
        />
      </div>
    </div>
  );
}
