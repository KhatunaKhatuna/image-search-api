import { useEffect, useState } from "react";
import { Gallery } from "../components/Gallery";
import Search from "../components/Search";
import { getSearchedImage } from "../api/data";
import { getPopularImages } from "../api/data";
import { getStatistics } from "../api/data";
import { GalleryItem } from "../components/GalleryItem";
import Loader from "../components/Loader";
import { PopUp } from "../components/PopUp";

export default function Home() {
  const [images, setImages] = useState<Image[]>([]);
  const [searchedImage, setSearchedImage] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const abortController = new AbortController();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [imageStatistic, useImageStatistic] = useState<any>(null);

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
    }, 500);

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
        setIsLoading(false);
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
  useEffect(() => {
    if (selectedImage) {
      const id = selectedImage.id;

      const fetchStatistic = async () => {
        try {
          const fetchedStatistic = await getStatistics(id);
          useImageStatistic(fetchedStatistic);
        } catch (err) {
          setError("Failed to fetch images");
          console.error(err);
        }
      };
      const timeoutForPstatistic = setTimeout(() => {
        fetchStatistic();
      }, 1000);

      return () => {
        clearTimeout(timeoutForPstatistic);
        abortController.abort();
      };
    }
  }, [selectedImage]);

  // Infinit scrole
  useEffect(() => {
    const handleScroll = () => {
      // const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      // const windowHeight = window.innerHeight;

      // if (windowHeight + scrollTop >= scrollHeight - 1) {
      //   setPage((prevPage) => prevPage + 1);
      // }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }

      if (scrollTop === 0) {
        setPage(1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function sets in qvery value
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

            <PopUp
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
              imageStatistic={imageStatistic}
            />
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
            <PopUp
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
              imageStatistic={imageStatistic}
            />
          </>
        )}
      </Gallery>
      {isLoading && <Loader />}
    </>
  );
}
