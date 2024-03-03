import React, { useEffect, useState } from "react";
import { Gallery } from "../components/Gallery";
import Search from "../components/Search";

import { getPopularImages } from "../api/data";
import { GalleryItem } from "../components/GalleryItem";

import { getSearchedImage } from "../api/data";
export default function Home() {
  const [images, setImages] = useState<Image[]>([]);
  const [searchedImage, setSearchedImage] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const abortController = new AbortController();

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
  console.log(query);
  return (
    <>
      {error && <p>{error}</p>}
      <Search handleChange={handleChange} query={query} />
      <Gallery image={images} searchedImage={searchedImage}>
        {query.length >= 3
          ? searchedImage.map((image: Image) => (
              <GalleryItem key={image.id} image={image} />
            ))
          : images.map((image: Image) => (
              <GalleryItem key={image.id} image={image} />
            ))}
      </Gallery>
    </>
  );
}
