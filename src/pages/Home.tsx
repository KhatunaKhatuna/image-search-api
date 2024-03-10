import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import { getPopularImages, getSearchedImage, getStatistics } from "../api/data";
import useDebounce from "../hooks/useDebounce";
import InfiniteScroll from "../components/InfiniteScroll";
import Gallery from "../components/Gallery";
import PopUp from "../components/PopUp";

const Home = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [imageStatistic, setImageStatistic] = useState(null);
  const abortController = new AbortController();

  useEffect(() => {
    setIsLoading(true);
    const fetchImages = async () => {
      try {
        let fetchedImages: any;
        if (debouncedSearchQuery) {
          fetchedImages = await getSearchedImage(debouncedSearchQuery, page);
        } else {
          fetchedImages = await getPopularImages(page);
        }
        setImages((prevImages) =>
          page === 1
            ? fetchedImages
            : [...prevImages, ...fetchedImages].filter(
                (image, index, self) =>
                  index === self.findIndex((t) => t.id === image.id)
              )
        );
        if (fetchedImages.length === 0 || fetchedImages.length < 20) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (error: any) {
        console.error("Error fetching images:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [page, debouncedSearchQuery]);

  // Get Statistics
  useEffect(() => {
    if (selectedImage) {
      const id = selectedImage.id;

      const fetchStatistic = async () => {
        try {
          const fetchedStatistic = await getStatistics(id);
          setImageStatistic(fetchedStatistic);
        } catch (error: any) {
          console.error("Error fetching images:", error.message);
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

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page for new search
    setImages([]); // Optionally clear images for new search
  };

  return (
    <InfiniteScroll
      loadMore={loadMoreImages}
      isLoading={isLoading}
      hasMore={hasMore}
    >
      <section style={{}}>
        <Search onInputChange={handleSearchInputChange} />

        <Gallery images={images} setSelectedImage={setSelectedImage} />
        <PopUp
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
          imageStatistic={imageStatistic}
        />
        {isLoading && <Loader />}
      </section>
    </InfiniteScroll>
  );
};

export default Home;
