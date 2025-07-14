import { StrapiImage } from "./Proyecto";

export interface Seo {
  id: number;
  title: string;
  description: string;
  image: StrapiImage;
  keywords: string;
  metaRobots: string;
}

export interface SeoResponse {
    id: number;
    pageTitle: string;
    slug: string;
    seo: Seo;
}