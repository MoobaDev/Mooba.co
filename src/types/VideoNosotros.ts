 interface StrapiVideo {
    id: number;
    url: string;
    mime: string;
  }
export interface Video{
    name: string;
    video: StrapiVideo;
    mobileVideo: StrapiVideo;
}
export interface StrapiVideoResponse {
  data: Video[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}