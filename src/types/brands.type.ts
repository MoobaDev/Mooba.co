export interface Brand {
  id: number;
  brand: string;
  slug: string;
  image: {
    id: number;
    url: string;
    name: string;
    width: number;
    height: number;
    mime: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
}
