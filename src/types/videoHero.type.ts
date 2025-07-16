export interface VideoHero {
  id: number;
  mobileVideo: {
    url: string;
    alternativeText: string | null;
    caption: string | null;
    mime: string;
    name: string;
    size: number;
    ext: string;
  };
  video: {
    url: string;
    alternativeText: string | null;
    caption: string | null;
    mime: string;
    name: string;
    size: number;
    ext: string;
  };
}
