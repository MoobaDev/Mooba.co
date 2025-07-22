"use client";

import { DropdownDownItem, DropdownUpItem } from "../ui/Icons";
import TeamCarousel from "@/components/our-essence/TeamCarousel";
import {AccordionItemProps} from '@/types/Integrantes'

export default function AccordionItemComponent({ title, children, carousel = false, isOpen = false, onToggle, teamMembers,}: AccordionItemProps) {
  return (
    <section className="">
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? "min-h-fit" : ""}`}>
      <button className="w-full flex flex-col text-left font-light text-white transition-all duration-200 hover:cursor-pointer" onClick={onToggle} aria-expanded={isOpen}>
        <div className="flex flex-col max-w-[1440px] mx-auto w-full">
          <div className={`flex justify-between px-8 py-8 gap-4 ${!carousel ? 'border-b border-white/30' : ''}`}>
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
        </div>
        {isOpen && carousel && teamMembers && (
          <div className="hidden md:block w-full h-auto mt-6">
            <TeamCarousel teamMembers={teamMembers}/>
          </div>
        )}
      </button>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-8 pb-8 text-gray-300 leading-relaxed font-[250] text-[18px] md:text-[20px] space-y-2">
          {children}
        </div>
        {isOpen && carousel && teamMembers &&(
          <div className="w-full mt-6">
            <TeamCarousel teamMembers={teamMembers}/>
          </div>
        )}
      </div>
    </section>
  )
}
