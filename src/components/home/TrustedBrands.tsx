"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Brand {
  id: number
  name: string
  logo: string
  subtitle?: string
}

const allBrands: Brand[] = [
  {
    id: 1,
    name: "Eticos",
    logo: "/images/brands/eticos.svg",
  },
  {
    id: 2,
    name: "Camila Santos",
    logo: "/images/brands/camila-santos.svg",
    subtitle: "Interiorista",
  },
  {
    id: 3,
    name: "La Economía",
    logo: "/images/brands/la-economia.svg",
    subtitle: "Droguería",
  },
  {
    id: 4,
    name: "Tasqui",
    logo: "/images/brands/tasqui.svg",
  },
  {
    id: 5,
    name: "Cobru",
    logo: "/images/brands/cobru.svg",
  },
  {
    id: 6,
    name: "Luxwave",
    logo: "/images/brands/luxwave.svg",
    subtitle: "Design Studio",
  },
  {
    id: 7,
    name: "BeeActive",
    logo: "/images/brands/beeactive.svg",
    subtitle: "Fitness",
  },
  {
    id: 8,
    name: "Derken",
    logo: "/images/brands/derken.svg",
  },
  {
    id: 9,
    name: "Fenalco",
    logo: "/images/brands/fenalco.svg",
  },
  {
    id: 10,
    name: "Impacto News",
    logo: "/images/brands/impacto-news.svg",
    subtitle: "Noticias",
  },
  {
    id: 11,
    name: "Isimo",
    logo: "/images/brands/isimo.svg",
  },
  {
    id: 12,
    name: "JH",
    logo: "/images/brands/jh.svg",
  },
  {
    id: 13,
    name: "Lions",
    logo: "/images/brands/lions.svg",
  },
  {
    id: 14,
    name: "Lovfaith",
    logo: "/images/brands/lovfaith.svg",
  },
  {
    id: 15,
    name: "Sertemap",
    logo: "/images/brands/sertemap.svg",
  },
  {
    id: 16,
    name: "Sinergia",
    logo: "/images/brands/sinergia.svg",
  },
  {
    id: 17,
    name: "Torres White",
    logo: "/images/brands/torres-white.svg",
  },
  {
    id:18,
    name: "Beeactive",
    logo: "/images/brands/beeactive.svg",
  }
]

export default function TrustedBrands() {
  const [visibleBrands, setVisibleBrands] = useState<Brand[]>(allBrands.slice(0, 6))
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null)
  const [lastChangedPosition, setLastChangedPosition] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      // Seleccionar una posición aleatoria diferente a la anterior
      let randomPosition: number
      do {
        randomPosition = Math.floor(Math.random() * 6)
      } while (randomPosition === lastChangedPosition && lastChangedPosition !== null)

      // Guardar la posición que va a cambiar
      setLastChangedPosition(randomPosition)

      // Animar salida de la posición aleatoria
      setAnimatingIndex(randomPosition)

      setTimeout(() => {
        // Cambiar la marca en la posición que está animando
        setVisibleBrands((prev) => {
          const newBrands = [...prev]

          // Encontrar marcas que no están visibles
          const hiddenBrands = allBrands.filter((brand) => !newBrands.some((visible) => visible.id === brand.id))

          if (hiddenBrands.length > 0) {
            // Seleccionar una marca aleatoria de las ocultas
            const randomHiddenBrand = hiddenBrands[Math.floor(Math.random() * hiddenBrands.length)]
            newBrands[randomPosition] = randomHiddenBrand
          }

          return newBrands
        })

        // Animar entrada
        setTimeout(() => {
          setAnimatingIndex(null)
        }, 100)
      }, 500)
    }, 4000) // Cada 4 segundos

    return () => clearInterval(interval)
  }, [lastChangedPosition])

  return (
    <section className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-light mb-12 md:mb-16">
          Marcas que han confiado en nosotros
        </h2>

        {/* Single responsive grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-12 md:gap-x-12 md:gap-y-0">
          {visibleBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className={`flex flex-col items-start md:items-center justify-center text-left md:text-center transition-all duration-500 ease-in-out ${
                animatingIndex === index ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"
              }`}
            >
              {/* Logo */}
              <div className="mb-3 md:mb-4 w-full max-w-[120px] h-[60px] flex items-center justify-start md:justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="max-w-full max-h-full object-contain filter brightness-0 invert"
                />
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
