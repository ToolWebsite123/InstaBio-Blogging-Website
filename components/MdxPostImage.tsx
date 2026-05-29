import Image from "next/image";

/** Matches BioBanner / desktop MDX banner proportions on every breakpoint. */
export const MDX_IMAGE_ASPECT_CLASS = "aspect-[680/380]";

type MdxPostImageProps = {
  src: string;
  alt?: string;
};

export default function MdxPostImage({ src, alt = "" }: MdxPostImageProps) {
  return (
    <figure className="my-6 sm:my-8 w-full min-w-0 max-w-full overflow-hidden not-prose">
      <div
        className={`story-card-image relative w-full max-w-full ${MDX_IMAGE_ASPECT_CLASS} overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 shadow-md bg-gray-50`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 680px"
          className="object-cover object-center"
        />
      </div>
    </figure>
  );
}
