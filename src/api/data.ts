import axios from "axios";
const BASE_URL = "https://api.unsplash.com";

export const getPopularImages = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/photos?page=${pageParam}&per_page=20&order_by=popular&client_id=${
        import.meta.env.VITE_UNSPLASH_API_KEY
      }`
    );
    //
    if (!response) {
      throw new Error("Api does not give us response");
    }
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
      `${BASE_URL}/photos/${imageId}?client_id=${
        import.meta.env.VITE_UNSPLASH_API_KEY
      }`
    );
    //
    if (!response) {
      throw new Error("Api does not give us response");
    }
    const data = await response.data;

    return data;
  } catch (error) {
    throw new Error("Error while getting image");
  }
};

export const getSearchedImage = async (query: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/photos?page=1&query=${query}`
    );
    if (!response) throw new Error("Response error");

    const data = await response.data;
    const fetchData: Image[] = data.map((image: Image) => ({
      id: image.id,
      likes: image.likes,
      slug: image.slug,
      urls: {
        full: image.urls?.full,
        small: image.urls?.small,
      },
    }));
    if (!data) throw new Error("No Data");

    return fetchData;
  } catch (error) {
    throw new Error("Error while getting searched image");
  }
};

export const getStatistics = async (id: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/photos/${id}/statistics&client_id=${
        import.meta.env.VITE_UNSPLASH_API_KEY
      }`
    );
    //
    if (!response) {
      throw new Error("Api does not give us response");
    }
    const data = response.data;
    const fetchData: Image[] = data.map((image: Image) => ({
      id: image.id,
      likes: image.likes,
      slug: image.slug,
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
