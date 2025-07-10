interface StrapiImageFormat {
    url: string;
  }
interface StrapiImage {
    id: number;
    url: string;
    width: number;
    height: number;
    alternativeText?: string;
    caption?: string;
    formats?: {
      thumbnail?: StrapiImageFormat;
      small?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      large?: StrapiImageFormat;
    };
  }
export interface Integrantes{
    name: string;
    ocupation: string;
    image: StrapiImage[];
}
export interface StrapiIntegrantesResponse {
  data: Integrantes[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
