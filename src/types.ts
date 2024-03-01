interface Image {
  id: string;
  likes: number;
  slug: string;
  urls?: {
    full: string;
    small: string;
  };
  downloads?: {
    total: number;
  };
  views?: {
    total: number;
  };
}
