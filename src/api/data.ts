import axios from "axios";

const BASE_URL = "https://api.unsplash.com";

export const getPopularImages = async (page: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/photos?page=${page}&per_page=20&order_by=popular&client_id=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const data = response.data;

    const fetchData: Image[] = data.map((image: Image) => ({
      id: image.id,
      likes: image.likes,
      slug: image.slug,
      urls: {
        full: image.urls?.full,
        small: image.urls?.small,
      },
    }));
    return fetchData;
  } catch (error) {
    throw new Error("Error while getting images");
  }
};

export const getSingleImage = async (imageId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/photos/${imageId}?client_id=${import.meta.env.VITE_API_KEY}`
    );
    const data = await response.data;

    return data;
  } catch (error) {
    throw new Error("Error while getting image");
  }
};

export const getSearchedImage = async (query: string, page: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/photos?query=${query}&page=${page}&per_page=20&client_id=${
        import.meta.env.VITE_API_KEY
      }`
    );

    const data = await response.data.results;
    const fetchData: Image[] = data.map((image: Image) => ({
      id: image.id,
      likes: image.likes,
      slug: image.slug,
      urls: {
        full: image.urls?.full,
        small: image.urls?.small,
      },
    }));

    return fetchData;
  } catch (error) {
    throw new Error("Error while getting searched image");
  }
};

export const getStatistics = async (id: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/photos/${id}/statistics&client_id=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const data = response.data;
    const fetchData: Image[] = data.map((image: Image) => ({
      id: image.id,
      likes: image.likes,
      slug: image?.slug,
      downloads: {
        total: image.downloads?.total,
      },
      views: {
        total: image.views?.total,
      },
    }));
    return fetchData;
  } catch (error) {
    throw new Error("Error while getting images");
  }
};
