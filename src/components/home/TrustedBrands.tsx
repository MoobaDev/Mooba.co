"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { allBrands } from "@/mocks/brands";
// Cambiar por marcas extraidas de Strapi
import { Brand } from "@/types/brands.type";

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
            (brand) =>
              !newBrands.some(
                (visible, index) =>
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
