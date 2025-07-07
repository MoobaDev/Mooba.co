"use client"

import { useState, useEffect } from "react"

interface Brand {
  id: number
  name: string
  logo: string
  subtitle?: string
}

const allBrands: Brand[] = [
  {
    id: 1,
    name: "eticos",
    logo: "/placeholder.svg?height=60&width=120&text=eticos",
  },
  {
    id: 2,
    name: "Camila Santos",
    logo: "/placeholder.svg?height=60&width=120&text=CAMILA+SANTOS",
    subtitle: "interiorista",
  },
  {
    id: 3,
    name: "La Economía",
    logo: "/placeholder.svg?height=60&width=120&text=La+Economia",
    subtitle: "Droguería",
  },
  {
    id: 4,
    name: "Tasqui",
    logo: "/placeholder.svg?height=60&width=120&text=Tasqui",
  },
  {
    id: 5,
    name: "Cobru",
    logo: "/placeholder.svg?height=60&width=120&text=Cobru",
  },
  {
    id: 6,
    name: "Luxwave",
    logo: "/placeholder.svg?height=60&width=120&text=Luxwave",
    subtitle: "Design Studio",
  },
  {
    id: 7,
    name: "TechFlow",
    logo: "/placeholder.svg?height=60&width=120&text=TechFlow",
    subtitle: "Software",
  },
  {
    id: 8,
    name: "Verde Natura",
    logo: "/placeholder.svg?height=60&width=120&text=Verde+Natura",
    subtitle: "Cosmética",
  },
  {
    id: 9,
    name: "Café Central",
    logo: "/placeholder.svg?height=60&width=120&text=Cafe+Central",
  },
  {
    id: 10,
    name: "Fitness Pro",
    logo: "/placeholder.svg?height=60&width=120&text=Fitness+Pro",
    subtitle: "Gimnasio",
  },
  {
    id: 11,
    name: "Arte & Diseño",
    logo: "/placeholder.svg?height=60&width=120&text=Arte+Diseño",
    subtitle: "Estudio",
  },
  {
    id: 12,
    name: "Digital Wave",
    logo: "/placeholder.svg?height=60&width=120&text=Digital+Wave",
    subtitle: "Marketing",
  },
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
              <div className="text-white">
                <div className="font-medium text-base md:text-lg lg:text-xl mb-1 md:whitespace-nowrap">
                  {brand.name}
                </div>
                {brand.subtitle && (
                  <div className="text-gray-400 text-sm md:text-base lg:text-base md:whitespace-nowrap">
                    {brand.subtitle}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
