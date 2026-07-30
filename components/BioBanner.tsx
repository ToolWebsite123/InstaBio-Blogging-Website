import Image from "next/image";
import { getBannerSrc } from "@/components/HTMLBannerImage";

type BioBannerProps = {
  src: string;
  title?: string;
};

export default function BioBanner({
  src,
  title = "Instagram bio preview",
}: BioBannerProps) {
  const resolvedSrc = getBannerSrc(src);

  return (
    <div className="not-prose relative my-6 sm:my-8 w-full min-w-0 max-w-full aspect-[680/380] overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-gray-50 shadow-md">
      <Image
        src={resolvedSrc}
        alt={title}
        fill
        sizes="(max-width: 680px) 100vw, 680px"
        className="object-cover object-top"
      />
    </div>
  );
}
