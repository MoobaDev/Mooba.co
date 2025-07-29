'use client'
import { useState } from "react"
import { SectionContent } from "@/types/ServicesSection"
import AnimatedIcon from "@/components/services/AnimatedIcon"

interface Props {
  secondSectionTitle: string
  secondSectionContent: SectionContent[]
}

export default function Section2({ secondSectionTitle, secondSectionContent }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
      <div className="flex flex-col md:grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <h2 className="text-[32px] md:text-[36px] font-normal">{secondSectionTitle}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-[300px_auto] gap-8 md:col-span-8">
          {secondSectionContent.map((item, index) => (
            <div
              key={index}
              className="flex items-start" 
              onMouseEnter={() => setHoveredIndex(index)} 
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-row items-start gap-1">
                <AnimatedIcon
                  animationData={item.animation}
                  play={hoveredIndex === index}
                />
                <p className="font-[250] text-[14px] md:text-[18px]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}