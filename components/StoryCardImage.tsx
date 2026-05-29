import Image from "next/image";

/** Same 16:10 crop on all screen sizes — matches desktop story cards. */
export const STORY_CARD_ASPECT_CLASS = "aspect-[16/10]";

export const STORY_CARD_SIZES_GRID =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

export const STORY_CARD_SIZES_FEATURED =
  "(max-width: 768px) 100vw, 50vw";

type StoryCardImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export default function StoryCardImage({
  src,
  alt,
  sizes = STORY_CARD_SIZES_GRID,
  priority = false,
  className = "",
}: StoryCardImageProps) {
  return (
    <div
      className={`story-card-image relative w-full ${STORY_CARD_ASPECT_CLASS} overflow-hidden bg-gray-100 shrink-0 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
