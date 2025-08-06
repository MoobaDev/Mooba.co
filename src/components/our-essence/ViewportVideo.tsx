"use client"
import { VideoHero } from "@/types/videoHero.type";
import { ChevronDown } from "lucide-react"
import Image from 'next/image';

const isVideo = (mime: string) => {
  return mime.startsWith('video/');
}

export default function ViewportVideo({ video }: { video: VideoHero  | null }) {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  if (!video ) {
    return (
      <section className="max-w-[1440px] mt-[64px] md:mt-[120px] mx-auto px-6 md:px-8">
        <h1 className="text-3xl md:text-4xl font-extralight">
          No hemos podido cargar el Demo Reel
        </h1>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {isVideo(video.mobileVideo.mime) ? (
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover md:hidden">
          <source src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${video.mobileVideo.url}`} type="video/mp4" />
        </video>
      ) : (
        <Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${video.mobileVideo.url}`} alt={video.mobileVideo.name} fill className="object-cover md:hidden" sizes="100vw" priority quality={85}/>
      )}

      {isVideo(video.video.mime) ? (
        <video autoPlay muted loop playsInline className="absolute aspect-[16/9] inset-0 object-cover hidden md:block">
          <source src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${video.video.url}`} type="video/mp4" />
        </video>
      ) : (
        <Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${video.video.url}`} alt={video.video.name} fill className="object-cover md:block" sizes="100vw" priority quality={90}/>
      )}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 cursor-pointer" onClick={scrollToNext}>
        <div className="hidden md:flex flex-col items-center">
          <div className="w-8 h-10 border-2 border-white rounded-full relative">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce absolute top-3 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <span className="text-sm font-normal text-white mt-2">Desliza</span>
        </div>

        <div className="md:hidden flex flex-col items-center">
          <ChevronDown className="w-6 h-6 text-white animate-bounce" />
          <span className="text-sm font-normal text-white mt-2">Desliza</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </section>
  )
}