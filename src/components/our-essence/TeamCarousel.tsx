"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RightArrow, LeftArrow } from "../ui/Icons";
import type SwiperType from "swiper";
import { TeamCarouselProps,TeamMemberCardProps } from "@/types/Integrantes"

export default function TeamCarousel({ teamMembers, active = false,}: TeamCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorDir, setCursorDir] = useState<"left" | "right" | "center">( "center" )
  const [showCursor, setShowCursor] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const duplicatedMembers = [ ...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers,]

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) return
    e.stopPropagation()
    if (!swiperRef.current) return
    if (cursorDir === "left") {
      swiperRef.current.slidePrev()
    } else if (cursorDir === "right") {
      swiperRef.current.slideNext()
    }
  }

  const handleInteraction = () => {
    if (!hasStarted) {
      setHasStarted(true)
    }
  };

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  useEffect(() => {
    if (isMobile) return
    const handlePointerMove = (e: PointerEvent) => {
      if (!carouselRef.current) return
      const rect = carouselRef.current.getBoundingClientRect()
      const isOver =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      if (!isOver) {
        setShowCursor(false)
        document.body.style.cursor = "auto"
        return
      }
      const relativeX = e.clientX - rect.left
      const zone = rect.width * 0.3
      if (relativeX <= zone) {
        setCursorDir("left")
      } else if (relativeX >= rect.width - zone) {
        setCursorDir("right")
      } else {
        setCursorDir("center")
      }
      setCursorPos({ x: e.clientX, y: e.clientY })
      setShowCursor(true)
      document.body.style.cursor = "none"
    }
    window.addEventListener("pointermove", handlePointerMove)
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      document.body.style.cursor = "auto"
    }
  }, [isMobile])

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        setHasStarted(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [active])

  return (
    <div ref={carouselRef} className="relative w-full cursor-none" onClick={handleClick} style={{ cursor: isMobile ? "auto" : "none" }}>
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

      <div className="transition-all mt-50px overflow-visible duration-800 ease-out">
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
          className="team-swiper mt-50px overflow-visible py-10"
          onTouchStart={handleInteraction}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 4,
            },
            375: {
              slidesPerView: 1.4,
              spaceBetween: 4,
            },
            425: {
              slidesPerView: 1.6,
              spaceBetween: 4,
            },
            540: {
              slidesPerView: 2.1,
              spaceBetween: 4,
            },
            640: {
              slidesPerView: 2.4,
              spaceBetween: 4,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 4,
            },
            892: {
              slidesPerView: 2.6,
              spaceBetween: 4,
            },
            1024: {
              slidesPerView: 2.9,
              spaceBetween: 4,
            },
            1232: {
              slidesPerView: 3.5,
              spaceBetween: 4,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 4,
            },
            1920: {
              slidesPerView: 5.4,
              spaceBetween: 4,
            },
            2560: {
              slidesPerView: 7.4,
              spaceBetween: 4,
            },
          }}
        >
          {duplicatedMembers.map((member, index) => (
            <SwiperSlide key={`${member.name}-${index}`} className="cursor-none overflow-visible transition-all duration-300 ease-out flex items-center w-fit justify-center">
              <TeamMemberCard member={member} isMobile={isMobile} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

function TeamMemberCard({ member, isMobile }: TeamMemberCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isTapped, setIsTapped] = useState(false)
  const [showPhrase, setShowPhrase] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isActive = isHovered || isTapped

  const startImageCycle = (duration: number = 200) => {
    if (member.image.length <= 1) return
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % member.image.length)
    }, duration)
  }

  const stopImageCycle = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setCurrentImageIndex(0)
  }

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true)
      setShowPhrase(true)
      startImageCycle()
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false)
      setShowPhrase(false)
      stopImageCycle()
    }
  }

  const handleTouchStart = () => {
    if (member.image.length <= 1) return
    setIsTapped(true)
    setShowPhrase(true)
    startImageCycle(1000 / member.image.length)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      stopImageCycle()
      setIsTapped(false)
      setShowPhrase(false)
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="flex flex-col w-fit h-130 md:h-158 mt-0 md:mt-5 items-center">
      <div className={`flex flex-col shadow-md transition-all duration-300 ${ isActive ? "z-30 -translate-y-1" : ""}`}
        style={{ transform: showPhrase ? 'translateY(-16px)' : 'translateY(0)', transition: 'transform 300ms ease-in-out' }}>
        <div className={`w-fit p-3 border transition-all duration-300 ${ isActive ? "border-white/30" : "border-transparent" }`}>
          <div className="inline-flex relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onTouchStart={handleTouchStart}>
            {member.image && member.image.length > 0 && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${member.image[currentImageIndex].url}`}
                alt={member.name}
                className="object-cover w-[240px] h-[375px] md:w-[320px] md:h-[500px]"
                width={member.image[currentImageIndex].width}
                height={member.image[currentImageIndex].height}
                priority={currentImageIndex === 0}
              />
            )}
            {(isHovered || isTapped) && (
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            )}
          </div>
          <div className="pt-1 font-[250] min-h-[60px]">
            <h3 className="text-[24px]">{member.name}</h3>
            <p className="text-[18px]">{member.ocupation}</p>
            {showPhrase && (
              <p className="text-[18px] italic text-white mt-1 transition-opacity duration-300 ease-in-out">
                &ldquo;{member.phrase}&rdquo;
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}