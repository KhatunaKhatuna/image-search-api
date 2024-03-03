const CACHE_KEY = "photoGalleryCache";

export const saveToCache = (key: string, data: any) => {
  const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  cache[key] = data;
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};

export const getFromCache = (key: string) => {
  const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  return cache[key];
};
