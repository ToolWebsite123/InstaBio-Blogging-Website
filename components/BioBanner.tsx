type BioBannerProps = {
  src: string;
  title?: string;
};

export default function BioBanner({ src, title = "Instagram bio preview" }: BioBannerProps) {
  return (
    <div className="my-8 flex justify-center overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-md">
      <iframe
        src={src}
        title={title}
        width={680}
        height={380}
        className="max-w-full"
        style={{ width: "min(100%, 680px)", height: "auto", aspectRatio: "680 / 380" }}
        loading="lazy"
      />
    </div>
  );
}
