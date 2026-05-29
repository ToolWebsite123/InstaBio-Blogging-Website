type BioBannerProps = {
  src: string;
  title?: string;
};

export default function BioBanner({ src, title = "Instagram bio preview" }: BioBannerProps) {
  return (
    <div className="bio-banner-host my-6 sm:my-8 w-full min-w-0 max-w-full border border-gray-100 bg-gray-50 shadow-md">
      <iframe src={src} title={title} loading="lazy" />
    </div>
  );
}
