"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useState} from "react";
import { HighlightedProject } from '@/types/highlightedProjects.type';
import { useRouter } from "next/navigation";
import { CursorLeftArrow, CursorRightArrow, CursorViewProject } from '@/components/ui/Icons';

export default function HighlightedProjects({ projects }: { projects: HighlightedProject[] | null }) {
  
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [cursorType, setCursorType] = useState<'left' | 'right' | 'default'>('default');
  const [slider, setSlider] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  const [sliderRef] = useKeenSlider({
    initial: 0,
    loop: true,
    mode: "snap",
    slides: {
      origin: 0.085,
      perView: 1.2,
      spacing: 12,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          origin: 0.2,
          perView: 1.5,
          spacing: 16,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          origin: 0.2,
          perView: 1.5,
          spacing: 8,
        },
      },
      "(min-width: 1440px)": {
        slides: {
          origin: 0.27,
          perView: 2.2,
          spacing: 8,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(s) {
      setLoaded(true);
      setSlider(s);
    },
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Actualizar posición del mouse
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    // Zona más pequeña para activar las flechas (20% en cada extremo)
    if (x < width * 0.27) {
      setCursorType('left');
    } else if (x > width * 0.75) {
      setCursorType('right');
    } else {
      setCursorType('default');
    }
  };  

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setCursorType('default');
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, projectSlug: string) => {
    if (!slider) return;
    
    // Usar el estado del cursor que ya se calculó en handleMouseMove
    // En lugar de recalcular la posición
    if (cursorType === 'left') {
      slider.prev();
    } else if (cursorType === 'right') {
      slider.next();
    } else {
      // Zona central - navegar al proyecto
      router.push(`/proyectos/${projectSlug}`);
    }
  };

  const renderCustomCursor = () => {
    switch (cursorType) {
      case 'left':
        return <CursorLeftArrow />;
      case 'right':
        return <CursorRightArrow />;
      default:
        return <CursorViewProject />;
    }
  };

  if (!projects || projects.length === 0) {
    return (
      <section className="max-w-[1440px] mt-[64px] md:mt-[120px] mx-auto px-6 md:px-8">
        <h1 className="text-3xl md:text-4xl font-extralight">
          No hemos podido cargar los proyectos destacados
        </h1>
      </section>
    );
  }

  return (
    <section className="mt-[64px] md:mt-[120px] mx-auto overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 mb-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-extralight">
            Proyectos destacados
          </h1>
        </div>
      </div>

      <div className="relative overflow-hidden w-full">
        {/* Cursor personalizado */}
        <div 
          className="fixed z-50 pointer-events-none"
          style={{
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
            transform: 'translate(-50%, -50%)',
            opacity: cursorType !== 'default' || mousePosition.x !== 0 ? 1 : 0,
            transition: 'opacity 0.2s ease'
          }}
        >
          {renderCustomCursor()}
        </div>
        
        <div className="w-full">
          <div 
            ref={sliderRef} 
            className="keen-slider cursor-none"
            style={{ cursor: 'none' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {projects.map(({ proyecto }, idx) => (
              <div key={proyecto.slug} className="keen-slider__slide cursor-none">
                <div className="flex flex-col transition-all duration-300 cursor-none">
                  <div
                    className={`relative mb-3 md:mb-5 overflow-hidden mx-auto transition-all duration-300 aspect-[905/605] cursor-none ${
                      loaded && currentSlide % projects.length === idx
                        ? "w-full h-auto max-w-[1440px] "
                        : "w-full h-auto max-w-[1440px] scale-[0.95]"
                    }`}
                    style={{ cursor: 'none' }}
                    onClick={(e) => handleClick(e, proyecto.slug)}
                  >
                    {proyecto.desktopVideo ? (
                      <video
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${proyecto.desktopVideo.url}`}
                        autoPlay
                        loop
                        muted
                        className={`object-cover w-full h-full transition-all duration-300 cursor-none ${
                          loaded && currentSlide % projects.length === idx
                            ? "brightness-100 scale-100"
                            : "brightness-50 scale-100"
                        }`}
                        style={{ cursor: 'none' }}
                      />
                    ) : (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${proyecto.desktopImage?.url}`}
                        alt={proyecto.title}
                        fill
                        className={`object-cover w-full h-full transition-all duration-300 cursor-none ${
                          loaded && currentSlide % projects.length === idx
                            ? "brightness-100 scale-100"
                            : "brightness-50 scale-100"
                        }`}
                        style={{ cursor: 'none' }}
                      />
                    )}
                  </div>

                  <div
                    className={`max-w-[1440px] mx-auto w-full cursor-none ${
                      loaded && currentSlide % projects.length === idx
                        ? "text-white opacity-100"
                        : "text-white opacity-50 scale-[0.95]"
                    }`}
                    style={{ cursor: 'none' }}
                  >
                    <div className="mb-2 md:mb-3 max-w-[840px]">
                      <h5 className="text-xl font-extralight transition-opacity duration-300">
                        {proyecto.title}
                      </h5>
                      <p className="text-xl text-[#ABB1BA] font-extralight transition-opacity duration-300">
                        {proyecto.shortDescription}
                      </p>
                    </div>

                    <div className="flex flex-wrap transition-all duration-300">
                      {proyecto.categorias.map((cat, tagIdx) => (
                        <span
                          key={tagIdx}
                          className={`text-sm font-normal border  rounded-full bg-transparent inline-flex items-center justify-center whitespace-nowrap px-3 py-0.5 transition-opacity duration-300 ${
                            loaded && currentSlide % projects.length === idx
                              ? "text-[#7A7F89] border-[#D0D5DD]  opacity-100"
                              : "text-[#7A7F89] border-[#D0D5DD]  opacity-100"
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
