"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Project } from "@/types/Proyecto";
import { CursorViewProject } from '@/components/ui/Icons';

// Animation configuration constants
const ANIMATION_CONFIG = {
  SECTION_START_THRESHOLD: 1.2, // Start animation before section is visible
  SECTION_END_THRESHOLD: 0.5, // Continue animation longer
  PROJECT_SPACING: 0.12, // Slightly more spacing between project animations
  TRANSFORM_DURATION: 0.3, // Duration of transform animation
  OPACITY_DURATION: 0.2, // Duration of opacity animation
  INITIAL_TRANSLATE_Y: 200, // Starting position (200% below)
  FADE_MULTIPLIER: 1.5, // Opacity animation speed
  ANIMATION_DELAY: 0.08, // Small delay before starting animations
} as const;

/**
 * Custom hook for managing scroll-based animations
 */
const useScrollAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const calculateScrollProgress = () => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = rect.height;

    const sectionTop = rect.top;
    const sectionBottom = rect.bottom;

    const startPoint = windowHeight * ANIMATION_CONFIG.SECTION_START_THRESHOLD;
    const endPoint = -sectionHeight * ANIMATION_CONFIG.SECTION_END_THRESHOLD;

    if (sectionTop <= startPoint && sectionBottom >= 0) {
      const progress = Math.min(
        1,
        Math.max(0, (startPoint - sectionTop) / (startPoint - endPoint))
      );
      setScrollProgress(progress);
    } else if (sectionTop > startPoint) {
      setScrollProgress(0);
    } else {
      setScrollProgress(1);
    }
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    calculateScrollProgress();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { sectionRef, scrollProgress };
};

export default function PortafolioHome({ projects }: { projects: Project[] }) {
  const { sectionRef, scrollProgress } = useScrollAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const getProjectTransform = (index: number): string => {
    // First project is always visible
    if (index === 0) {
      return "translateY(0%)";
    }

    const adjustedIndex = index - 1; // Adjust index so second project starts at 0
    const startProgress =
      ANIMATION_CONFIG.ANIMATION_DELAY +
      adjustedIndex * ANIMATION_CONFIG.PROJECT_SPACING;
    const endProgress = startProgress + ANIMATION_CONFIG.TRANSFORM_DURATION;

    if (scrollProgress <= startProgress) {
      return `translateY(${ANIMATION_CONFIG.INITIAL_TRANSLATE_Y}%)`;
    } else if (scrollProgress >= endProgress) {
      return "translateY(0%)";
    } else {
      // Smooth easing animation
      const progress =
        (scrollProgress - startProgress) / (endProgress - startProgress);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      return `translateY(${
        ANIMATION_CONFIG.INITIAL_TRANSLATE_Y * (1 - easeProgress)
      }%)`;
    }
  };

  const getProjectOpacity = (index: number): number => {
    // First project is always visible
    if (index === 0) {
      return 1;
    }

    const adjustedIndex = index - 1;
    const startProgress =
      ANIMATION_CONFIG.ANIMATION_DELAY +
      adjustedIndex * ANIMATION_CONFIG.PROJECT_SPACING;
    const endProgress = startProgress + ANIMATION_CONFIG.OPACITY_DURATION;

    if (scrollProgress <= startProgress) {
      return 0;
    } else if (scrollProgress >= endProgress) {
      return 1;
    } else {
      const progress =
        (scrollProgress - startProgress) / (endProgress - startProgress);
      return Math.min(1, progress * ANIMATION_CONFIG.FADE_MULTIPLIER);
    }
  };

  const getProjectAnimationStyles = (index: number) => ({
    transform: getProjectTransform(index),
    opacity: getProjectOpacity(index),
    transition: "transform 0.1s ease-out, opacity 0.2s ease-out",
    willChange: "transform, opacity",
  });

  const handleProjectMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsHovering(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleProjectMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleProjectMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  if (!projects || projects.length === 0) {
    return (
      <section className="max-w-[1440px] mt-[64px] md:mt-[120px] mx-auto px-6 md:px-8">
        <h1 className="text-3xl md:text-4xl font-extralight">
          No hemos podido cargar los proyectos
        </h1>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="max-w-[1440px] mt-[64px] md:mt-[120px] mx-auto md:pb-8 px-6 md:px-8 overflow-hidden"
    >
      {/* Header Section */}
      <div className="w-full mb-10 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-extralight">
          Ideas que se volvieron realidad
        </h1>
        {/* Desktop: Link with underline */}
        <Link
          href="/proyectos"
          className="hidden md:block text-base font-normal  underline"
        >
          Ver todos los proyectos
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="w-full">
        {/* Cursor personalizado */}
        <div 
          className="fixed z-50 pointer-events-none"
          style={{
            left: mousePosition.x,
            top: mousePosition.y - 20,
            transform: 'translate(-50%, -50%)',
            opacity: isHovering && mousePosition.x !== 0 ? 1 : 0,
            transition: 'opacity 0.2s ease'
          }}
        >
          <CursorViewProject />
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 ${isHovering ? 'cursor-none' : ''}`}
             style={isHovering ? { cursor: 'none' } : {}}>
          {projects.map((project, index) => (
            <Link
              href={`/proyectos/${project.slug}`}
              key={project.slug}
              className={`block group w-full ${isHovering ? 'cursor-none' : 'cursor-pointer'}`}
              style={{
                ...getProjectAnimationStyles(index),
                ...(isHovering ? { cursor: 'none' } : {})
              }}
              onMouseEnter={handleProjectMouseEnter}
              onMouseMove={handleProjectMouseMove}
              onMouseLeave={handleProjectMouseLeave}
            >
              <div className={`flex flex-col h-full ${isHovering ? 'cursor-none' : ''}`}>
                {/* Image Container */}
                <div className={`relative mb-4 overflow-hidden w-full aspect-[4/4] ${isHovering ? 'cursor-none' : ''}`}>
                  {project.desktopVideo ? (
                    <video
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${project.desktopVideo.url}`}
                      autoPlay
                      loop
                      muted
                      className={`object-cover w-full h-full ${isHovering ? 'cursor-none' : ''}`}
                      style={isHovering ? { cursor: 'none' } : {}}
                    />
                  ) : (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${project.desktopImage?.url}`}
                      alt={project.title}
                      fill
                      className={`object-cover w-full h-full ${isHovering ? 'cursor-none' : ''}`}
                      style={isHovering ? { cursor: 'none' } : {}}
                    />
                  )}
                </div>

                {/* Project Info */}
                <div className={`mb-3 mt-2 font-extralight text-xl flex-grow ${isHovering ? 'cursor-none' : ''}`}>
                  <h5 className={`truncate overflow-hidden whitespace-nowrap ${isHovering ? 'cursor-none' : ''}`}>
                    {project.title}
                  </h5>
                  <p className={`text-[#ABB1BA] truncate overflow-hidden whitespace-nowrap ${isHovering ? 'cursor-none' : ''}`}>
                    {project.shortDescription}
                  </p>
                </div>

                {/* Tags */}
                <div className={`flex flex-wrap mt-auto ${isHovering ? 'cursor-none' : ''}`}>
                  {project.categorias.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className={`text-sm font-normal text-gray-500 border border-white rounded-full bg-transparent inline-flex items-center justify-center whitespace-nowrap px-3 py-0.5 ${isHovering ? 'cursor-none' : ''}`}
                      style={isHovering ? { cursor: 'none' } : {}}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: Button at the bottom */}
        <div className="flex mt-8 md:hidden">
          <Link
            href="/portafolio"
            className="bg-gray-50 text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Ver más proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}
