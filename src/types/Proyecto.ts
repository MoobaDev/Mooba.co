import { Seo } from "./Seo";

interface StrapiImageFormat {
  url: string;
}
export interface StrapiImage {
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

export interface Project {
  title: string;
  slug: string;
  shortDescription: string;
  desktopImage: StrapiImage;
  desktopVideo: StrapiImage;
  desktopContent: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  categorias: Category[];
  seo: Seo;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiProjectsResponse {
  data: Project[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
export interface StrapiCategoriesResponse {
  data: Category[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
export interface StrapiProjectResponse {
  data: Project[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}