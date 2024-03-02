import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { getSearchedImage } from "../api/data";
import { useLocation } from "react-router-dom";

const Search: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const abortController = new AbortController();
  const { pathname } = useLocation();

  useEffect(() => {
    setIsLoading(true);

    if (page === 1) {
      setImages([]);
    }

    const fetchImages = async () => {
      try {
        if (query.length >= 3) {
          const fetchedImages = await getSearchedImage(query, page);
          setImages(() =>
            [...images, ...fetchedImages].filter(
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

    const timeoutId = setTimeout(() => {
      fetchImages();
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [query, page]);

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
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      {/* {pathname === "/" && ( */}
      <div className="search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="Search ..."
        />
      </div>
      {/* )} */}
      <div className="gallery container">
        {images.map((image) => (
          <img src={image.urls.small} />
        ))}
        {isLoading && <Loader />}
      </div>
    </>
  );
};

export default Search;
