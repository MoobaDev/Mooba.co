"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  tags: string[];
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Luxwave",
    category: "Branding",
    image: "/images/luxwave.png",
    tags: ["Diseño UX/UI", "Desarrollo web"],
  },
  {
    id: 2,
    title: "Sr. Julio",
    category: "Campañas publicitarias",
    image: "/images/julio.jpg",
    tags: ["Campañas publicitarias"],
  },
  {
    id: 3,
    title: "TechFlow",
    category: "Desarrollo web",
    image: "/images/iphone.jpg",
    tags: ["React", "Next.js"],
  },
];

export default function HighlightedProjects() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef] = useKeenSlider({
    initial: 0,
    loop: true,
    mode: "snap",
    slides: {
      origin: 0.1,
      perView: 1.2,
      spacing: 8, // Espacio reducido entre slides en móvil
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          origin: 0.25,
          perView: 1.8,
          spacing: 0, // Eliminado el espacio entre slides
        },
      },
      "(min-width: 1024px)": {
        slides: {
          origin: 0.3,
          perView: 1.8, // Reducido ligeramente para dar más espacio entre slides
          spacing: 20, // Aumentado el espacio entre slides para resolución de laptop
        },
      },
      "(min-width: 1440px)": {
        slides: {
          origin: 0.3,
          perView: 1.8, // Mantener igual que en laptop
          spacing: 20, // Mantener igual que en laptop
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

  return (
    <section className="max-w-[1440px] mx-auto px-6 md:px-8 overflow-hidde¿ mt-16 md:mt-[120px]">

        <div className="w-full  mb-10 flex justify-between items-center">
          {/* Title */}
          <h1 className="text-white text-2xl md:text-3xl font-light">
            Proyectos destacados
          </h1>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden mx-auto">
          {/* Project Carousel */}
          <div className="w-full">
            <div ref={sliderRef} className="keen-slider">
              {mockProjects.map((project, idx) => (
                <div
                  key={project.id}
                  className="keen-slider__slide cursor-pointer" // Eliminado margen negativo para dar más espacio entre slides
                >
                  <div className="flex flex-col transition-all duration-300">
                    {/* Image Container - Different sizes for active vs inactive slides */}
                    <div
                      className={`relative mb-3 md:mb-5 overflow-hidden mx-auto transition-all duration-300 rounded-md max-w-[840px] aspect-[4/3] ${
                        loaded && currentSlide % mockProjects.length === idx
                          ? "w-full h-[min(60vw,630px)]" 
                          : "w-[98%] h-[min(58vw,615px)]"
                      }`}
                    >
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className={`object-cover transition-all duration-300 ${
                          loaded && currentSlide % mockProjects.length === idx
                            ? "brightness-100 scale-100"
                            : "brightness-70 scale-[0.98]" // Menos oscurecimiento y escala reducida
                        }`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                      />
                    </div>

                    {/* Only show text for the active slide */}
                    {loaded && currentSlide % mockProjects.length === idx && (
                      <div
                        className="mx-auto px-2 md:px-0 max-w-[840px] w-full"
                      >
                        <div className="mb-2 md:mb-3">
                          <h3 className="text-white text-lg md:text-xl font-light">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 text-xs md:text-sm">
                            {project.category}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-0">
                          {project.tags.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="text-xs md:text-sm text-white border border-white rounded-full bg-transparent inline-flex items-center justify-center whitespace-nowrap px-[10px] py-[1px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>  
        </div>
    </section>
  );
}
