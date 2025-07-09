export interface ServiceImage {
  id: number;
  url: string;
  alt: string;
}

export interface Service {
  id: number;
  name: string;
  images: ServiceImage[];
}

