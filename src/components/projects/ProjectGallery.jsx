import Image from "next/image";

export default function ProjectGallery({
  images = [],
  title = "Project Gallery",
}) {
  if (!images.length) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center rounded-2xl border border-white/10 bg-[#111417]">
        <p className="text-sm text-white/40">
          Project images will be added soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#111417]"
        >
          <Image
            src={image.src}
            alt={image.alt || `${title} - Image ${index + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}