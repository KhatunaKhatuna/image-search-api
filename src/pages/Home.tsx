import React, { useEffect, useState } from "react";
import { Gallery } from "../components/Gallery";
import Search from "../components/Search";
import { getSearchedImage } from "../api/data";
import { getPopularImages } from "../api/data";
import { getStatistics } from "../api/data";
import { GalleryItem } from "../components/GalleryItem";
import Loader from "../components/Loader";

export default function Home() {
  const [images, setImages] = useState<Image[]>([]);
  const [searchedImage, setSearchedImage] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const abortController = new AbortController();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [imageStatistic, useImageStatistic] = useState<any>({});

  console.log(query);
  // Gallery data
  // Get Searched Images
  useEffect(() => {
    if (page === 1) {
      setSearchedImage([]);
    }

    const fetchSearchedImages = async () => {
      try {
        if (query.length >= 3) {
          const fetchedImages = await getSearchedImage(query, page);
          setSearchedImage(() =>
            [...searchedImage, ...fetchedImages].filter(
              (image, index, self) =>
                index === self.findIndex((t) => t.id === image.id)
            )
          );
        }
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch images");
        console.error(err);
      }
    };

    const timeoutForSearch = setTimeout(() => {
      fetchSearchedImages();
    }, 1000);

    return () => {
      clearTimeout(timeoutForSearch);
      abortController.abort();
    };
  }, [query, page]);

  //  Get Popular images
  useEffect(() => {
    setIsLoading(true);
    const fetchPopularImages = async () => {
      try {
        const fetchedImages = await getPopularImages(page);
        setImages(() =>
          [...images, ...fetchedImages].filter(
            (image, index, self) =>
              index === self.findIndex((t) => t.id === image.id)
          )
        );
      } catch (err) {
        setError("Failed to fetch images");
        console.error(err);
      }
    };

    const timeoutForPopular = setTimeout(() => {
      fetchPopularImages();
    }, 500);
    return () => {
      clearTimeout(timeoutForPopular);
      abortController.abort();
    };
  }, [page]);
  // Get Statistics

  /*
  useEffect(() => {
    const fetchStatistic = async () => {
      const fetchedStatistic = await getStatistics(id);
      console.log(fetchedStatistic);
      useImageStatistic(fetchedStatistic);
    };

    fetchStatistic();
  }, [id]);
*/

  // Infinit scrole
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
  }, []);

  function handleChange(e: any) {
    e.preventDefault();
    setQuery(e.target.value);
  }

  return (
    <>
      {error && <p>{error}</p>}
      <Search handleChange={handleChange} query={query} />
      <Gallery>
        {query.length >= 3 ? (
          <>
            {searchedImage.map((image: Image) => (
              <div
                className="image-container "
                key={image.id}
                onClick={() => setSelectedImage(image)}
              >
                <GalleryItem key={image.id} image={image} />
              </div>
            ))}

            <div
              className="popup-modal"
              onClick={() => setSelectedImage(null)}
              style={{ display: selectedImage ? "block" : "none" }}
            >
              <span
                className="popup-cancel"
                onClick={() => setSelectedImage(null)}
              >
                &times;
              </span>
              <div className="popup-modal-image-container">
                <div className="image-wraper">
                  <img
                    src={selectedImage?.urls.full}
                    className="popup-modal-image"
                  />
                </div>

                <div className="popap-modal-statistics">
                  <span>likes:</span>
                  <span>views:</span>
                  <span>dawnloads:</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {images.map((image: Image) => (
              <div
                className="image-container "
                key={image.id}
                onClick={() => setSelectedImage(image)}
              >
                <GalleryItem key={image.id} image={image} />
              </div>
            ))}

            <div
              className="popup-modal"
              onClick={() => setSelectedImage(null)}
              style={{ display: selectedImage ? "block" : "none" }}
            >
              <span
                className="popup-cancel"
                onClick={() => setSelectedImage(null)}
              >
                &times;
              </span>
              <div className="popup-modal-image-container">
                <div className="image-wraper">
                  <img
                    src={selectedImage?.urls.full}
                    className="popup-modal-image"
                  />
                </div>

                <div className="popap-modal-statistics">
                  <span>likes:</span>
                  <span>views:</span>
                  <span>dawnloads:</span>
                </div>
              </div>
            </div>
          </>
        )}
      </Gallery>
      {isLoading && <Loader />}
    </>
  );
}
