"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

export default function TeamCarousel() {
  const teamMembers = [
    {
      name: "Breyner Lugo",
      position: "Manager",
      image: "/brey.png"
    },
    {
      name: "Edgardo Barreto",
      position: "Director Creativo",
      image: "/edgardo.png"
    },
    {
      name: "Andrea Marenco",
      position: "Jefe de Mercadotecnia",
      image: "/andrea.png"
    },
    {
      name: "Mary Borrás",
      position: "Creadora de campañas",
      image: "/Mary.png"
    },
    {
      name: "Laura",
      position: "Especialista",
      image: "/laura.png"
    }
  ];

  return (
    <div className="w-full h-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1.2}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        slidesOffsetBefore={0}
        slidesOffsetAfter={40}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 20,
          },
          1439: {
            slidesPerView: 4.2,
            spaceBetween: 20,
          },
          2560:{
            slidesPerView: 5.4,
            spaceBetween: 20,
          }
        }}
        className="team-swiper"
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index}>
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

      <style jsx global>{`
        .team-swiper {
          padding: 20px 0;
        }
        
        .team-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </div>
  );
}