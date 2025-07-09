"use client";
import { ChevronDown } from "lucide-react";

export default function VideoHero() {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Mobile Video : Cambiar por video traido de strapi*/}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover md:hidden"
      >
        <source src="videos/landing_video_mobile.mp4" type="video/mp4" />
      </video>

      {/* Desktop Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
      >
        <source src="videos/landing_video_desktop.mp4" type="video/mp4" />
      </video>

      {/* Scroll Down Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 cursor-pointer"
        onClick={scrollToNext}
      >
        {/* Desktop Mouse Indicator */}
        <div className="hidden md:flex flex-col items-center">
          <div className="w-8 h-10 border-2 border-white rounded-full relative">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce absolute top-3 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <span className="text-sm font-normal text-white mt-2">Desliza</span>
        </div>

        {/* Mobile Chevron Down */}
        <div className="md:hidden flex flex-col items-center">
          <ChevronDown className="w-6 h-6 text-white animate-bounce" />
          <span className="text-sm font-normal text-white mt-2">Desliza</span>
        </div>
      </div>

      {/* Subtle overlay for better button visibility */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </section>
  );
}
