"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Service, ServiceImage } from "@/types/service.type";
// Cambiar por servicios extraidas de Strapi

export default function ServicesShowcase({
  services,
}: {
  services: Service[] | null;
}) {

  const [selectedImage, setSelectedImage] = useState<ServiceImage | null>(
    services && services[0]?.images[0] ? services[0].images[0] : null
  );
  const [hoveredService, setHoveredService] = useState<number | null>(
    services && services[0] ? services[0].id : null
  );
  const [activeService, setActiveService] = useState<number | null>(
    services && services[0] ? services[0].id : null
  );

  useEffect(() => {
    if (!services || services.length === 0) return;

    const randomService = services[Math.floor(Math.random() * services.length)];
    const randomImage =
      randomService.images[
        Math.floor(Math.random() * randomService.images.length)
      ];

    setActiveService(randomService.id);
    setHoveredService(randomService.id);
    setSelectedImage(randomImage);
  }, [services]);

  // Efecto para manejar el scroll en móvil
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined" || window.innerWidth >= 1024) return; // Solo en móvil

      const screenCenter = window.innerHeight / 2;
      const services = document.querySelectorAll("[data-service-id]");

      for (const service of services) {
        const rect = service.getBoundingClientRect();
        const isInCenter =
          rect.top <= screenCenter && rect.bottom >= screenCenter;

        if (isInCenter) {
          const id = parseInt(service.getAttribute("data-service-id") || "0");
          if (id !== activeService) {
            setActiveService(id);
          }
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Ejecutar una vez al cargar
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeService]);

  const handleServiceHover = (service: Service) => {
    // Solo aplicar hover en desktop
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setHoveredService(service.id);
      const randomImage =
        service.images[Math.floor(Math.random() * service.images.length)];
      setSelectedImage(randomImage);
    }
  };

  if (!services || services.length === 0) {
    return (
      <section className="max-w-[1440px] mt-[120px] mx-auto px-6 md:px-8 overflow-hidden">
        <h1 className="text-3xl font-extralight md:text-4xl">
          No hemos podido cargar los servicios
        </h1>
      </section>
    );
  }

  return (
    <section className="max-w-[1440px] mt-16 mx-auto px-6 md:px-8 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-12 md:mb-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extralight">
            Donde realmente la rompemos
          </h1>
          <div className="py-4 space-y-4 text-base font-extralight ">
            <p>
              Cuando la estrategia, la creatividad y la tecnología trabajan
              juntas, el impacto es inevitable.
            </p>
            <p>
              Por eso en Mooba abordamos cada reto desde múltiples disciplinas,
              creando desde marcas sólidas hasta experiencias digitales que
              marcan la diferencia.
            </p>
          </div>
        </div>
      </div>

      {/* Services and Image Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Services List */}
        <div className="space-y-2">
          {services.map((service) => {
            const isActive =
              typeof window !== "undefined" && window.innerWidth < 1024
                ? activeService === service.id
                : hoveredService === service.id;

            return (
              <div
                key={service.id}
                data-service-id={service.id}
                className={`cursor-pointer transition-all duration-300 ${
                  isActive ? "text-white" : "opacity-60"
                }`}
                onMouseEnter={() => handleServiceHover(service)}
              >
                <h2 className="text-4xl font-normal">{service.name}</h2>
              </div>
            );
          })}
        </div>

        {/* Image Display Area - Solo en Desktop */}
        <div className="relative hidden lg:block">
          <div className="aspect-[4/3] bg-gray-100  overflow-hidden">
            {selectedImage ? (
                <div className="relative w-full h-full">
                  {selectedImage.mime?.startsWith("video") ? (
                    <video
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${selectedImage.url}`}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="object-cover w-full h-full absolute inset-0"
                      preload="auto"
                      controls={false}
                    >
                      Tu navegador no soporta el tag de video.
                    </video>
                  ) : (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${selectedImage.url}`}
                      alt={selectedImage.alt || selectedImage.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-opacity duration-500"
                    />
                  )}
                </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <p className="text-lg">Pasa el cursor sobre un servicio</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
