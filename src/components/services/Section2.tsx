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
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col md:flex-row justify-start">
        <h1 className="text-[32px] md:text-[48px] font-normal">{secondSectionTitle}</h1>
        <div className="flex flex-row flex-wrap gap-6">
          {secondSectionContent.map((item, index) => (
            <div
              key={index}
              className="flex flex-col"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-row items-center space-x-4">
                <AnimatedIcon
                  animationData={item.animation}
                  play={hoveredIndex === index}
                />
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
