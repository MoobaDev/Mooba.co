"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ServiceImage {
  id: number
  url: string
  alt: string
}

interface Service {
  id: number
  name: string
  images: ServiceImage[]
}

const servicesData: Service[] = [
  {
    id: 1,
    name: "Branding",
    images: [
      {
        id: 1,
        url: "/servicio.svg",
        alt: "Branding project 1",
      },
      {
        id: 2,
        url: "/JH-banner-1.png",
        alt: "Branding project 2",
      },
      {
        id: 3,
        url: "/ecommer-banner-ecommer.png",
        alt: "Branding project 3",
      },
    ],
  },
  {
    id: 2,
    name: "Diseño web & Desarrollo",
    images: [
    {
        id: 4,
        url: "/servicio.svg",
        alt: "Branding project 1",
      },
      {
        id: 5,
        url: "/JH-banner-1.png",
        alt: "Branding project 2",
      },
      {
        id: 6,
        url: "/ecommer-banner-ecommer.png",
        alt: "Branding project 3",
      },
    ],
  },
  {
    id: 3,
    name: "Marketing Digital",
    images: [
     {
        id: 7,
        url: "/servicio.svg",
        alt: "Branding project 1",
      },
      {
        id: 8,
        url: "/JH-banner-1.png",
        alt: "Branding project 2",
      },
      {
        id: 9,
        url: "/ecommer-banner-ecommer.png",
        alt: "Branding project 3",
      },
    ],
  },
  {
    id: 4,
    name: "Contenido Audiovisual",
    images: [
      {
        id: 10,
        url: "/servicio.svg",
        alt: "Branding project 1",
      },
      {
        id: 11,
        url: "/JH-banner-1.png",
        alt: "Branding project 2",
      },
      {
        id: 12,
        url: "/ecommer-banner-ecommer.png",
        alt: "Branding project 3",
      },
    ],
  },
  {
    id: 5,
    name: "Campañas Publicitarias",
    images: [
      {
        id: 13,
        url: "/servicio.svg",
        alt: "Branding project 1",
      },
      {
        id: 14,
        url: "/JH-banner-1.png",
        alt: "Branding project 2",
      },
      {
        id: 15,
        url: "/ecommer-banner-ecommer.png",
        alt: "Branding project 3",
      },
    ],
  },
]

export default function ServicesShowcase() {
  const [selectedImage, setSelectedImage] = useState<ServiceImage | null>(null)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [activeService, setActiveService] = useState<number | null>(null)

  // Simple scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) return // Solo en móvil
      
      const screenCenter = window.innerHeight / 2
      const services = document.querySelectorAll('[data-service-id]')
      let foundService = false
      
      for (const service of services) {
        const rect = service.getBoundingClientRect()
        const isInCenter = rect.top <= screenCenter && rect.bottom >= screenCenter
        
        if (isInCenter) {
          const id = parseInt(service.getAttribute('data-service-id') || '0')
          if (id !== activeService) {
            setActiveService(id)
          }
          foundService = true
          break
        }
      }
      
      // Si no hay ningún servicio en el centro, desactivar todos
      if (!foundService && activeService !== null) {
        setActiveService(null)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Ejecutar una vez al cargar
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeService])

  const handleServiceHover = (service: Service) => {
    if (window.innerWidth >= 1024) {
      setHoveredService(service.id)
      const randomImage = service.images[Math.floor(Math.random() * service.images.length)]
      setSelectedImage(randomImage)
    }
  }

  return (
    <section className="max-w-[1440px] mt-16 mx-auto px-6 md:px-8 overflow-hidden">
      
        {/* Header */}
        <div className="flex justify-between items-start mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-extralight">Donde realmente la rompemos</h1>
            <div className="py-4 space-y-4 text-base font-extralight ">
              <p>Cuando la estrategia, la creatividad y la tecnología trabajan juntas, el impacto es inevitable.</p>
              <p>
                Por eso en Mooba abordamos cada reto desde múltiples disciplinas, creando desde marcas sólidas hasta
                experiencias digitales que marcan la diferencia.
              </p>
            </div>
          </div>
        </div>

        {/* Services and Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Services List */}
          <div className="space-y-2">
            {servicesData.map((service) => (
              <div
                key={service.id}
                data-service-id={service.id}
                className={`cursor-pointer transition-all duration-300 ${
                  (window.innerWidth < 1024 ? activeService === service.id : hoveredService === service.id) 
                    ? "text-white" 
                    : "opacity-60"
                }`}
                onMouseEnter={() => handleServiceHover(service)}
              >
                <h1 className="text-4xl font-normal">{service.name}</h1>
              </div>
            ))}
          </div>

          {/* Image Display Area - Solo en Desktop */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
              {selectedImage ? (
                <div className="relative w-full h-full">
                  <Image
                    src={selectedImage.url || "/placeholder.svg"}
                    alt={selectedImage.alt}
                    fill
                    className="object-cover transition-opacity duration-500"
                  />
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
  )
}
