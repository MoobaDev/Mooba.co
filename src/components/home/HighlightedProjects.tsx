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
      origin: 0.2,
      perView: 1.6,
      spacing: 0, // Eliminado el espacio entre slides
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
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <section className="mt-16 md:mt-[120px]">
      <div className="w-full">
        <div className="max-w-7xl px-6 md:px-8 mb-8">
          {/* Title */}
          <h1 className="text-white text-2xl md:text-3xl font-light">
            Proyectos destacados
          </h1>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
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
                      className="relative mb-5 overflow-hidden mx-auto transition-all duration-300 rounded-md"
                      style={{
                        width:
                          loaded && currentSlide % mockProjects.length === idx
                            ? "min(100%, 840px)"
                            : "min(98%, 820px)", // Aumento del ancho para reducir espacios
                        height:
                          loaded && currentSlide % mockProjects.length === idx
                            ? "min(70vw, 630px)"
                            : "min(68vw, 615px)", // Aumento de altura para reducir espacios
                        aspectRatio: "4/3"
                      }}
                    >
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className={`object-cover transition-all duration-300 ${
                          loaded && currentSlide % mockProjects.length === idx
                            ? "brightness-100 scale-100"
                            : "brightness-70" // Menos oscurecimiento
                        }`}
                        style={{
                          transform: loaded && currentSlide % mockProjects.length !== idx ? "scale(0.98)" : ""
                        }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                      />
                    </div>

                    {/* Only show text for the active slide */}
                    {loaded && currentSlide % mockProjects.length === idx && (
                      <div
                        style={{ maxWidth: "840px" }}
                        className="mx-auto w-full"
                      >
                        <div className="mb-3">
                          <h3 className="text-white text-xl font-light">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {project.category}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-0">
                          {project.tags.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="text-sm text-white border border-white rounded-full bg-transparent inline-flex items-center justify-center whitespace-nowrap"
                              style={{ 
                                paddingLeft: "12px",
                                paddingRight: "12px",
                                paddingTop: "2px",
                                paddingBottom: "2px",
                          
                              }}
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
      </div>
    </section>
  );
}
