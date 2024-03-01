import { GalleryItem } from "./GalleryItem";
import React, { useEffect, useState } from "react";
import { getPopularImages } from "../../api/data";
import Loader from "../Loader";

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const abortController = new AbortController();

  // Fetch images when 'page' changes
  useEffect(() => {
    setIsLoading(true);
    const fetchImages = async () => {
      try {
        const fetchedImages = await getPopularImages(page);
        setImages(() =>
          [...images, ...fetchedImages].filter(
            (image, index, self) =>
              index === self.findIndex((t) => t.id === image.id)
          )
        );
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch images");
        console.error(err);
      }
    };
    const timeoutId = setTimeout(() => {
      fetchImages();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [page]);

  // scroll event listener

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      if (windowHeight + scrollTop === scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <>
      {error && <p>{error}</p>}
      <div className="gallery container">
        {images.map((image: Image) => (
          <GalleryItem key={`${image.id}-${page}`} image={image} />
        ))}
        {isLoading && <Loader />}
      </div>
    </>
  );
};

export default ImageGallery;
