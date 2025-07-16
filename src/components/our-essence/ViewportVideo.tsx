"use client";
import { ChevronDown } from "lucide-react";

interface StrapiVideo {
  id: number;
  url: string;
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
export default function ViewportVideo({video}: {video: Video}) {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover md:hidden"
      >
        <source src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${video.mobileVideo.url}`} type="video/mp4" />
      </video>

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute aspect-[16/9] inset-0 object-cover hidden md:block"
      >
        <source src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${video.video.url}`} type="video/mp4" />
      </video>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 cursor-pointer" onClick={scrollToNext}>
        <div className="hidden md:flex flex-col items-center">
          <div className="w-8 h-10 border-2 border-white rounded-full relative">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce absolute top-3 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <span className="text-sm font-normal text-white mt-2">Desliza</span>
        </div>

        <div className="md:hidden flex flex-col items-center">
          <ChevronDown className="w-6 h-6 text-white animate-bounce" />
          <span className="text-sm font-normal text-white mt-2">Desliza</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </section>
  );
}
