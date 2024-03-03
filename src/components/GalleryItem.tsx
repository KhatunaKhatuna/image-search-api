export function GalleryItem({ image }: any) {
  return (
    <img className="gallery-image" src={image.urls.small} alt={image.slug} />
  );
}
