"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Brand } from "@/types/brands.type";


export default function TrustedBrands({ brands }: { brands: Brand[] | null }) {
  
  const [visibleBrands, setVisibleBrands] = useState<Brand[]>((brands ?? []).slice(0, 6));
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const [lastChangedPosition, setLastChangedPosition] = useState<number | null>(
    null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      let randomPosition: number;
      do {
        randomPosition = Math.floor(Math.random() * 6);
      } while (
        randomPosition === lastChangedPosition &&
        lastChangedPosition !== null
      );

      setLastChangedPosition(randomPosition);
      setAnimatingIndex(randomPosition);

      setTimeout(() => {
        setVisibleBrands((prev) => {
          const newBrands = [...prev];

          const hiddenBrands = (brands ?? []).filter(
            (brand) => !newBrands.some((visible, index) => visible.id === brand.id && index !== randomPosition)
          );

          if (hiddenBrands.length > 0) {
            const randomHiddenBrand =
              hiddenBrands[Math.floor(Math.random() * hiddenBrands.length)];
            newBrands[randomPosition] = randomHiddenBrand;
          }

          return newBrands;
        });

        setTimeout(() => {
          setAnimatingIndex(null);
        }, 100);
      }, 500);
    }, 1500);

    return () => clearInterval(interval);
  }, [lastChangedPosition, brands]);


  if (!brands || brands.length === 0) { 
    return (
      <section className="max-w-[1440px] mt-[120px] mx-auto px-6 md:px-8 overflow-hidden">
        <h1 className="text-3xl font-extralight md:text-4xl">
          No hemos podido cargar las marcas
        </h1>
      </section>
    );
  }
  return (
    <section className="max-w-[1440px] mt-[64px] md:mt-[120px] mx-auto px-6 md:px-8 overflow-hidden">
      {/* Title */}
      <h1 className="text-3xl font-extralight md:text-4xl">
        Marcas que han confiado en nosotros
      </h1>

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
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${brand.image.url}`}
                alt={brand.brand}
                width={130}
                height={65}
                className="w-full h-full object-cover filter brightness-0 invert"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
