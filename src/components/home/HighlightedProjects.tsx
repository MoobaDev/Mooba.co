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
    image: "/luxwave.png",
    tags: ["Diseño UX/UI", "Desarrollo web"],
  },
  {
    id: 2,
    title: "Sr. Julio",
    category: "Campañas publicitarias",
    image: "/julio.jpg",
    tags: ["Campañas publicitarias"],
  },
  {
    id: 3,
    title: "TechFlow",
    category: "Desarrollo web",
    image: "/iphone.jpg",
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
          origin: 0.2,
          perView: 1.6,
          spacing: 15, // Ajustado para mantener proporción en tablets
        },
      },
      "(min-width: 1024px)": {
        slides: {
          origin: 0.2,
          perView: 1.5, // Ajustado para mantener la proporción rectangular en laptop
          spacing: 20,
        },
      },
      "(min-width: 1440px)": {
        slides: {
          origin: 0.2,
          perView: 1.5, // Mantener proporción rectangular en pantallas grandes
          spacing: 30, // Aumentado el espacio para pantallas grandes
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
    <section className="mt-[120px] mx-auto overflow-hidden">
      {/* Contenedor para el título con ancho máximo */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 mb-10">
        <div className="w-full flex justify-between items-center">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-extralight">
            Proyectos destacados
          </h2>
        </div>
      </div>

      {/* Carousel Container - Ahora sin max-width y tomando todo el ancho */}
      <div className="relative overflow-hidden w-full">
        {/* Project Carousel */}
        <div className="w-full">
          <div ref={sliderRef} className="keen-slider">
            {mockProjects.map((project, idx) => (
              <div
                key={project.id}
                className="keen-slider__slide"
              >
                <div className="flex flex-col transition-all duration-300">
                  {/* Image Container - Different sizes for active vs inactive slides */}
                  <div
                    className={`relative mb-3 md:mb-5 overflow-hidden mx-auto transition-all duration-300 max-w-[1440px] aspect-[16/9] ${
                      loaded && currentSlide % mockProjects.length === idx
                        ? "w-full h-auto"
                        : "w-[98%] h-auto"
                    }`}
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className={`object-cover transition-all duration-300 ${
                        loaded && currentSlide % mockProjects.length === idx
                          ? "brightness-100 scale-100"
                          : "brightness-50 scale-[0.98]" // Menos oscurecimiento y escala reducida
                      }`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                    />
                  </div>

                  {/* Show text for all slides, with different opacity */}
                  <div className="max-w-[1440px] mx-auto w-full">
                    <div className="mb-2 md:mb-3 max-w-[840px]">
                      <h5 className={`text-xl font-extralight transition-opacity duration-300 ${
                        loaded && currentSlide % mockProjects.length === idx
                          ? "text-white opacity-100"
                          : "text-white opacity-50"
                      }`}>
                        {project.title}
                      </h5>
                      <p className={`text-xl font-extralight transition-opacity duration-300 ${
                        loaded && currentSlide % mockProjects.length === idx
                          ? "text-gray-400 opacity-100"
                          : "text-gray-400 opacity-50"
                      }`}>
                        {project.category}
                      </p>
                    </div>

                    {/* Tags - shown for all slides */}
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className={`text-sm font-normal border rounded-full bg-transparent inline-flex items-center justify-center whitespace-nowrap px-[10px] py-[1px] transition-opacity duration-300 ${
                            loaded && currentSlide % mockProjects.length === idx
                              ? "text-gray-500 border-gray-300 opacity-100"
                              : "text-gray-500 border-gray-300 opacity-50"
                          }`}
                        >
                          {tag}
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
