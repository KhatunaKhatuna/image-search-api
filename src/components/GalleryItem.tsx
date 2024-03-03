export function GalleryItem({ image }: any) {
  return <img className="image" src={image.urls.small} alt={image.slug} />;
}
