import HTMLBannerImage from "@/components/HTMLBannerImage";

/** Matches BioBanner / desktop MDX banner proportions on every breakpoint. */
export const MDX_POST_IMAGE_ASPECT_CLASS = "aspect-[680/380]";

type MdxPostImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export default function MdxPostImage({ src, alt, priority = false }: MdxPostImageProps) {
  return (
    <div className="not-prose my-6 sm:my-8 w-full">
      <div className={`relative w-full ${MDX_POST_IMAGE_ASPECT_CLASS} overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-gray-50 shadow-md shrink-0`}>
        <HTMLBannerImage
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 680px) 100vw, 680px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
