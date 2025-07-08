"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Brand {
  id: number;
  name: string;
  logo: string;
  subtitle?: string;
}

const allBrands: Brand[] = [
  {
    id: 1,
    name: "Eticos",
    logo: "brands/eticos.svg",
  },
  {
    id: 2,
    name: "Camila Santos",
    logo: "brands/camila-santos.svg",
    subtitle: "Interiorista",
  },
  {
    id: 3,
    name: "La Economía",
    logo: "brands/la-economia.svg",
    subtitle: "Droguería",
  },
  {
    id: 4,
    name: "Tasqui",
    logo: "brands/tasqui.svg",
  },
  {
    id: 5,
    name: "Cobru",
    logo: "brands/cobru.svg",
  },
  {
    id: 6,
    name: "Luxwave",
    logo: "brands/luxwave.svg",
    subtitle: "Design Studio",
  },
  {
    id: 7,
    name: "BeeActive",
    logo: "brands/beeactive.svg",
    subtitle: "Fitness",
  },
  {
    id: 8,
    name: "Derken",
    logo: "brands/derken.svg",
  },
  {
    id: 9,
    name: "Fenalco",
    logo: "brands/fenalco.svg",
  },
  {
    id: 10,
    name: "Impacto News",
    logo: "brands/impacto-news.svg",
    subtitle: "Noticias",
  },
  {
    id: 11,
    name: "Isimo",
    logo: "brands/isimo.svg",
  },
  {
    id: 12,
    name: "JH",
    logo: "brands/jh.svg",
  },
  {
    id: 13,
    name: "Lions",
    logo: "brands/lions.svg",
  },
  {
    id: 14,
    name: "Lovfaith",
    logo: "brands/lovfaith.svg",
  },
  {
    id: 15,
    name: "Sertemap",
    logo: "brands/sertemap.svg",
  },
  {
    id: 16,
    name: "Sinergia",
    logo: "brands/sinergia.svg",
  },
  {
    id: 17,
    name: "Torres White",
    logo: "brands/torres-white.svg",
  },
];

export default function TrustedBrands() {
  const [visibleBrands, setVisibleBrands] = useState<Brand[]>(
    allBrands.slice(0, 6)
  );
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const [lastChangedPosition, setLastChangedPosition] = useState<number | null>(
    null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      // Seleccionar una posición aleatoria diferente a la anterior
      let randomPosition: number;
      do {
        randomPosition = Math.floor(Math.random() * 6);
      } while (
        randomPosition === lastChangedPosition &&
        lastChangedPosition !== null
      );

      // Guardar la posición que va a cambiar
      setLastChangedPosition(randomPosition);

      // Animar salida de la posición aleatoria
      setAnimatingIndex(randomPosition);

      setTimeout(() => {
        // Cambiar la marca en la posición que está animando
        setVisibleBrands((prev) => {
          const newBrands = [...prev];

          // Encontrar marcas que no están visibles (excluyendo la que está en la posición que va a cambiar)
          const hiddenBrands = allBrands.filter(
            (brand) => !newBrands.some((visible, index) => 
              visible.id === brand.id && index !== randomPosition
            )
          );

          if (hiddenBrands.length > 0) {
            // Seleccionar una marca aleatoria de las ocultas
            const randomHiddenBrand =
              hiddenBrands[Math.floor(Math.random() * hiddenBrands.length)];
            newBrands[randomPosition] = randomHiddenBrand;
          }

          return newBrands;
        });

        // Animar entrada
        setTimeout(() => {
          setAnimatingIndex(null);
        }, 100);
      }, 500);
    }, 2000); // Cada 4 segundos

    return () => clearInterval(interval);
  }, [lastChangedPosition]);

  return (
    <section className="max-w-[1440px] mt-[120px] mx-auto px-6 md:px-8 overflow-hidden">
      
        {/* Title */}
        <h2 className="text-3xl font-extralight md:text-4xl">
          Marcas que han confiado en nosotros
        </h2>

        {/* Single responsive grid */}
        <div className="grid grid-cols-2 py-8 md:grid-cols-6 gap-2.5 justify-items-center">
          {visibleBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className={`w-36 h-36 md:w-48 md:h-48 flex items-center justify-center transition-all duration-500 ease-in-out ${
                animatingIndex === index
                  ? "opacity-0 transform scale-95"
                  : "opacity-100 transform scale-100"
              }`}
            >
              {/* Logo */}
              <div className="w-full h-full flex items-center justify-center p-6">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={130}
                  height={65}
                  className="max-w-32 max-h-16 object-contain filter brightness-0 invert"
                />
              </div>
            </div>
          ))}
        </div>
    
    </section>
  );
}
