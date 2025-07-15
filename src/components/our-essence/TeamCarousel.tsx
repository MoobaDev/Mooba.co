"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RightArrow, LeftArrow } from "../ui/Icons";
import type SwiperType from 'swiper';

interface StrapiImage {
  id: number;
  url: string;
  width: number;
  height: number;
  alternativeText?: string;
  caption?: string;
  formats?: {
    thumbnail?: { url: string; };
    small?: { url: string; };
    medium?: { url: string; };
    large?: { url: string; };
  };
}

interface TeamMember {
  name: string;
  ocupation: string;
  image: StrapiImage[];
}

interface TeamCarouselProps {
  teamMembers: TeamMember[];
  active?: boolean;
}

export default function TeamCarousel({ teamMembers, active = false }: TeamCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorDir, setCursorDir] = useState<'left' | 'right' | 'center'>('center');
  const [showCursor, setShowCursor] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const duplicatedMembers = [...teamMembers, ...teamMembers, ...teamMembers];

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  useEffect(() => {

    if (isMobile) return;
    const handlePointerMove = (e: PointerEvent) => {
      if (!carouselRef.current) return;

      const rect = carouselRef.current.getBoundingClientRect();
      const isOver = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (!isOver) {
        setShowCursor(false);
        document.body.style.cursor = 'auto'
        return;
      }

      const relativeX = e.clientX - rect.left;
      const zone = rect.width * 0.3;

      if (relativeX <= zone) {
        setCursorDir("left");
      } else if (relativeX >= rect.width - zone) {
        setCursorDir("right");
      } else {
        setCursorDir("center");
      }

      setCursorPos({ x: e.clientX, y: e.clientY });
      setShowCursor(true);
      document.body.style.cursor = "none";
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.body.style.cursor = "auto";
    };
  }, [isMobile]);

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.stopPropagation();

    if (!swiperRef.current) return;

    if (cursorDir === "left") {
      swiperRef.current.slidePrev();
    } else if (cursorDir === "right") {
      swiperRef.current.slideNext();
    }
  };

  const handleInteraction = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
  };

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        setHasStarted(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div
      ref={carouselRef}
      className="relative w-full cursor-none"
      onClick={handleClick}
      style={{cursor : isMobile ? 'auto' : 'none'}}
    >
      {showCursor && (
        <div className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2" style={{ left: cursorPos.x, top: cursorPos.y }}>
          <div className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
            {cursorDir === "left" && <LeftArrow />}
            {cursorDir === "right" && <RightArrow />}
            {cursorDir === "center" && (
              <p className="text-white text-sm font-light">DRAG</p>
            )}
          </div>
        </div>
      )}

      <div className={`transition-all duration-800 ease-out`}>
        <Swiper
          modules={[Autoplay]}
          loop={true}
          grabCursor={isMobile}
          centeredSlides={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={600}
          resistance={true}
          resistanceRatio={0.7}
          slidesPerGroup={1}
          watchSlidesProgress={true}
          className="team-swiper"
          onTouchStart={handleInteraction}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 12
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 16
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24
            },
            1440: {
              slidesPerView: 4.5,
              spaceBetween: 24
            },
            1920: {
              slidesPerView: 5.5,
              spaceBetween: 28
            },
          }}
        >
          {duplicatedMembers.map((member, index) => (
            <SwiperSlide
              key={`${member.name}-${index}`}
              className="cursor-none transition-transform duration-300 ease-out"
            >
              <TeamMemberCard member={member} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startImageCycle = (duration: number = 200) => {
    if (member.image.length <= 1) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % member.image.length);
    }, duration);
  };

  const stopImageCycle = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImageIndex(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    startImageCycle();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    stopImageCycle();
  };

  const handleTouchStart = () => {
    if (member.image.length <= 1) return;

    setIsTapped(true);
    startImageCycle(1000 / member.image.length);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      stopImageCycle();
      setIsTapped(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col overflow-hidden shadow-md transition-transform duration-300 mb-10">
      <div
        className="w-[240px] h-[375px] md:w-[320px] md:h-[500px] relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
      >
        {member.image && member.image.length > 0 &&
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${member.image[currentImageIndex].url}`}
            alt={member.name}
            className="object-cover h-full w-full transition-opacity duration-300 ease-in-out"
            width={member.image[currentImageIndex].width}
            height={member.image[currentImageIndex].height}
            priority={currentImageIndex === 0}
          />
        }
        {(isHovered || isTapped) && (
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        )}
      </div>
      <div className="pt-2">
        <h3 className="font-medium text-lg">{member.name}</h3>
        <p className="text-sm">{member.ocupation}</p>
      </div>
    </div>
  );
}