"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useState } from "react";
import { HighlightedProject } from '@/types/highlightedProjects.type';
import Link from "next/link";

export default function HighlightedProjects({ projects }: { projects: HighlightedProject[] | null }) {
  
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef] = useKeenSlider({
    initial: 0,
    loop: true,
    mode: "snap",
    slides: {
      origin: 0.1,
      perView: 1.2,
      spacing: 8,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          origin: 0.2,
          perView: 1.5,
          spacing: 15,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          origin: 0.2,
          perView: 1.5,
          spacing: 20,
        },
      },
      "(min-width: 1440px)": {
        slides: {
          origin: 0.2,
          perView: 1.5,
          spacing: 32,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  if (!projects || projects.length === 0) {
    return (
      <section className="max-w-[1440px] mt-[64px] md:mt-[120px] mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-extralight">
          No hemos podido cargar los proyectos destacados
        </h2>
      </section>
    );
  }

  return (
    <section className="mt-[64px] md:mt-[120px] mx-auto overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 mb-10">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-3xl md:text-4xl font-extralight">
            Proyectos destacados
          </h2>
        </div>
      </div>

      <div className="relative overflow-hidden w-full">
        <div className="w-full">
          <div ref={sliderRef} className="keen-slider">
            {projects.map(({ proyecto }, idx) => (
              <div key={proyecto.slug} className="keen-slider__slide">
                <div className="flex flex-col transition-all duration-300">
                  <Link
                    href={`/proyectos/${proyecto.slug}`}
                    className={`relative mb-3 md:mb-5 overflow-hidden mx-auto transition-all duration-300 max-w-[1440px] aspect-[905/605] ${
                      loaded && currentSlide % projects.length === idx
                        ? "w-full h-auto"
                        : "w-full h-auto scale-[0.95]"
                    }`}
                  >
                    {proyecto.desktopVideo ? (
                      <video
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${proyecto.desktopVideo.url}`}
                        autoPlay
                        loop
                        muted
                        className={`object-cover w-full h-full transition-all duration-300 ${
                          loaded && currentSlide % projects.length === idx
                            ? "brightness-100 scale-100"
                            : "brightness-50 scale-100"
                        }`}
                      />
                    ) : (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${proyecto.desktopImage?.url}`}
                        alt={proyecto.title}
                        fill
                        className={`object-cover w-full h-full transition-all duration-300 ${
                          loaded && currentSlide % projects.length === idx
                            ? "brightness-100 scale-100"
                            : "brightness-50 scale-100"
                        }`}
                      />
                    )}
                  </Link>

                  <div
                    className={`max-w-[1440px] mx-auto w-full ${
                      loaded && currentSlide % projects.length === idx
                        ? "text-white opacity-100"
                        : "text-white opacity-50 scale-[0.95]"
                    }`}
                  >
                    <div className="mb-2 md:mb-3 max-w-[840px]">
                      <h5 className="text-xl font-extralight transition-opacity duration-300">
                        {proyecto.title}
                      </h5>
                      <p className="text-xl font-extralight transition-opacity duration-300">
                        {proyecto.shortDescription}
                      </p>
                    </div>

                    <div className="flex flex-wrap transition-all duration-300">
                      {proyecto.categorias.map((cat, tagIdx) => (
                        <span
                          key={tagIdx}
                          className={`text-sm font-normal border rounded-full bg-transparent inline-flex items-center justify-center whitespace-nowrap px-[10px] py-[1px] transition-opacity duration-300 ${
                            loaded && currentSlide % projects.length === idx
                              ? "text-gray-500 border-gray-300 opacity-100"
                              : "text-gray-500 border-gray-300 opacity-50"
                          }`}
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
