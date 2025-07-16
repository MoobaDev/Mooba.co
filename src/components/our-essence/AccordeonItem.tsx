"use client";

import { useState, useEffect } from "react";
import { DropdownDownItem, DropdownUpItem } from "../ui/Icons";
import TeamCarousel from "@/components/our-essence/TeamCarousel";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  carousel?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AccordionItemComponent({
  title,
  children,
  carousel = false,
  isOpen = false,
  onToggle,
}: AccordionItemProps) {
  return (
    <section className="border-b border-white/30">
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? "min-h-fit" : ""}`}>
        <button 
          className="w-full flex justify-between items-start py-8 text-left font-light text-white transition-all duration-200" 
          onClick={onToggle} 
          aria-expanded={isOpen}
        >
          <div className="flex flex-col w-full">
            <div className="flex justify-between px-8 items-start w-full gap-4">
              <h2 className="text-[36px] md:text-[40px] font-[250] md:max-w-[31%] leading-tight tracking-tight flex-1">
                {title}
              </h2>

              <div className={`hidden md:block flex-1 max-w-[23%] transition-all duration-700 ease-in-out ${isOpen ? "opacity-100 max-h-[1000px]" : "opacity-0 max-h-0 overflow-hidden"}`}>
                <div className="font-[250] leading-relaxed text-[18px] md:text-[20px]">
                  {children}
                </div>
              </div>

              <div className="flex-shrink-0 mt-2">
                {isOpen ? <DropdownUpItem /> : <DropdownDownItem />}
              </div>
            </div>
            {isOpen && carousel && (
              <div className="hidden md:block w-full mt-6">
                <TeamCarousel/>
              </div>
            )}
          </div>
        </button>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-8 pb-8 text-gray-300 leading-relaxed font-[250] text-[18px] md:text-[20px] space-y-2">
          {children}
        </div>
        {isOpen && carousel && (
            <div className="w-full mt-6">
              <TeamCarousel/>
            </div>
          )}
      </div>
    </section>
  );
}

export function Accordion({ items }: { items: Array<{ title: string; content: string | React.ReactNode; carousel?: boolean }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length);
      setOpenIndex(randomIndex);
    }
  }, [items.length]);

  return (
    <div className="w-full mt-10 mx-auto bg-black">
      <div className="divide-y border-white/30">
        {items.map((item, index) => (
          <AccordionItemComponent
            key={index}
            title={item.title}
            carousel={item.carousel}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(prev => prev === index ? null : index)}
          >
            {item.content}
          </AccordionItemComponent>
        ))}
      </div>
    </div>
  );
}