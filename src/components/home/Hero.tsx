"use client";
import { ChevronDown } from "lucide-react";
import type { VideoHero } from "@/types/videoHero.type";

export default function VideoHero({
  videoHero,
}: {
  videoHero: VideoHero[] | null;
}) {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  if (!videoHero || videoHero.length === 0) {
    return (
      <section className="max-w-[1440px] mt-[64px] md:mt-[120px] mx-auto px-6 md:px-8">
        <h1 className="text-3xl md:text-4xl font-extralight">
          No hemos podido cargar el Demo Reel
        </h1>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden aspect-[16/9]">
      {/* Mobile Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover md:hidden"
      >
        <source
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${videoHero[0].mobileVideo.url}`}
          type={videoHero[0].mobileVideo.mime}
        />
      </video>

      {/* Desktop Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
      >
        <source
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${videoHero[0].video.url}`}
          type={videoHero[0].video.mime}
        />
      </video>

      {/* Scroll Down Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 cursor-pointer"
        onClick={scrollToNext}
      >
        {/* Desktop Mouse Indicator */}
        <div className="hidden md:flex flex-col items-center">
          <div className="w-7 h-10 border-3 border-white rounded-t-xl rounded-b-xl relative">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce absolute top-2 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <span className="text-sm font-normal text-white mt-2">Desliza</span>
        </div>

        {/* Mobile Chevron Down */}
        <div className="md:hidden flex flex-col items-center">
          <ChevronDown className="w-6 h-6 text-white animate-bounce" />
          <span className="text-sm font-normal text-white">Desliza</span>
        </div>
      </div>

      {/* Subtle overlay for better button visibility */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </section>
  );
}
