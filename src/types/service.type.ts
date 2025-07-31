export type ServiceImage = {
  id: number;
  url: string;
  name: string;
  alt: string;
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

export interface Service {
  id: number;
  name: string;
  description: string;
  images: ServiceImage[];
}

