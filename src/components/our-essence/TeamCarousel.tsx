"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import {RightArrow, LeftArrow} from "../ui/Icons"

interface TeamMember {
  name: string;
  position: string;
  image: string;
}

export default function TeamCarousel() {
  const teamMembers: TeamMember[] = [
    { name: "Breyner Lugo", position: "Manager", image: "/brey.png" },
    { name: "Edgardo Barreto", position: "Director Creativo", image: "/edgardo.png" },
    { name: "Andrea Marenco", position: "Jefe de Mercadotecnia", image: "/andrea.png" },
    { name: "Mary Borrás", position: "Creadora de campañas", image: "/Mary.png" },
    { name: "Laura", position: "Especialista", image: "/laura.png" },
    { name: "Breyner Lugo", position: "Manager", image: "/brey.png" },
    { name: "Edgardo Barreto", position: "Director Creativo", image: "/edgardo.png" },
    { name: "Andrea Marenco", position: "Jefe de Mercadotecnia", image: "/andrea.png" },
    { name: "Mary Borrás", position: "Creadora de campañas", image: "/Mary.png" },
    { name: "Laura", position: "Especialista", image: "/laura.png" },
  ];

  const swiperRef = useRef<SwiperType | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(false);
  const [isCentered, setIsCentered] = useState(false);
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorDirection, setCursorDirection] = useState<'left' | 'right' | 'center'>('right');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAutoplayEnabled(true);
      setIsCentered(true);
      if (swiperRef.current) {
        swiperRef.current.params.slidesOffsetBefore = 0;
        swiperRef.current.params.centeredSlides = true;
        swiperRef.current.update();
        swiperRef.current.autoplay.start();
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!carouselRef.current) return;
      
      const carouselRect = carouselRef.current.getBoundingClientRect();
      const isOverCarousel = (
        e.clientX >= carouselRect.left &&
        e.clientX <= carouselRect.right &&
        e.clientY >= carouselRect.top &&
        e.clientY <= carouselRect.bottom
      );
      
      if (!isOverCarousel) {
        setShowCustomCursor(false);
        return;
      }
      
      const carouselWidth = carouselRect.width;
      const relativeX = e.clientX - carouselRect.left;
      const sideZone = carouselWidth * 0.3;
      
    if (relativeX <= sideZone) {
      setShowCustomCursor(true);
      setCursorDirection('left');
      setCursorPosition({ x: e.clientX, y: e.clientY });
      document.body.style.cursor = 'none';
    } else if (relativeX >= carouselWidth - sideZone) {
      setShowCustomCursor(true);
      setCursorDirection('right');
      setCursorPosition({ x: e.clientX, y: e.clientY });
      document.body.style.cursor = 'none';
    } else {
      setShowCustomCursor(true);
      setCursorDirection('center');
      setCursorPosition({ x: e.clientX, y: e.clientY });
      document.body.style.cursor = 'none';
    }

    };

    const handleClick = (e: MouseEvent) => {
      if (!carouselRef.current) return;
      
      const carouselRect = carouselRef.current.getBoundingClientRect();
      const isOverCarousel = (
        e.clientX >= carouselRect.left &&
        e.clientX <= carouselRect.right &&
        e.clientY >= carouselRect.top &&
        e.clientY <= carouselRect.bottom
      );
      
      if (!isOverCarousel) return;
      
      const carouselWidth = carouselRect.width;
      const relativeX = e.clientX - carouselRect.left;
      const sideZone = carouselWidth * 0.3;
      
      if (swiperRef.current) {
        if (relativeX <= sideZone) {
          e.stopPropagation();
          swiperRef.current.slidePrev();
        } else if (relativeX >= carouselWidth - sideZone) {
          e.stopPropagation();
          swiperRef.current.slideNext();
        }
      }
    };

    const handleMouseLeave = () => {
      setShowCustomCursor(false);
      document.body.style.cursor = 'auto';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick, true);
    if (carouselRef.current) {
      carouselRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.body.style.cursor = 'auto';
    };
  }, []);

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    swiper.autoplay.stop();
  };

  return (
    <div ref={carouselRef} className="w-full h-auto mb-10 relative">
      {showCustomCursor && (
        <div className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2" style={{ left: cursorPosition.x, top: cursorPosition.y}}>
          <div className="w-15 h-15 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center ">
            {cursorDirection === 'right' && <RightArrow/>}
            {cursorDirection === 'left' && <LeftArrow/>}
            {cursorDirection === 'center' && <p className="text-white text-[14px] font-light">DRAG</p>}
          </div>
        </div>
      )}

      <Swiper
        onSwiper={handleSwiperInit}
        modules={[Autoplay, FreeMode]}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.9,
        }}
        loop={true}
        autoplay={isAutoplayEnabled ? {
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        } : false}
        slidesPerView="auto"
        slidesOffsetBefore={isCentered ? 0 : 20}
        centeredSlides={isCentered}
        spaceBetween={10}
        grabCursor={true}
        breakpoints={{
          320: { spaceBetween: 10, slidesOffsetBefore: isCentered ? 0 : 35 },
          640: { spaceBetween: 10, slidesOffsetBefore: isCentered ? 0 : 35 },
          768: { spaceBetween: 10, slidesOffsetBefore: isCentered ? 0 : 35 },
          1024: { spaceBetween: 10, slidesOffsetBefore: isCentered ? 0 : 35 },
          1439: { spaceBetween: 10, slidesOffsetBefore: isCentered ? 0 : 35 },
          2560: { spaceBetween: 10, slidesOffsetBefore: isCentered ? 0 : 35 },
        }}
        className="team-swiper"
        style={{ cursor: showCustomCursor ? 'none' : 'grab' }}
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index} style={{ width: "auto" , cursor: showCustomCursor ? 'none' : 'grab'}}>
            <div className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-[240px] h-[375px] md:w-[320px] md:h-[500px] relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="pt-2">
                <h3 className="font-[250] text-[16px]">{member.name}</h3>
                <p className="font-[400] text-[12px]">{member.position}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}