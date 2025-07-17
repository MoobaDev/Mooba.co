"use client"
import { useState, useEffect } from "react"
import AccordionItemComponent from "./AccordionItem"

interface StrapiImage {
  id: number
  url: string
  width: number
  height: number
  alternativeText?: string
  caption?: string
  formats?: {
    thumbnail?: { url: string}
    small?: { url: string }
    medium?: { url: string}
    large?: { url: string}
  };
}
interface AccordionItem {
  title: string
  content: string
  carousel?: boolean
}
interface TeamMember{
  name: string,
  ocupation: string,
  image: StrapiImage[]
}
interface AccordionClientProps{
  items: AccordionItem[]
  teamMembers: TeamMember[]
}

export default function AccordionClient({ items, teamMembers } : AccordionClientProps ) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length)
      setOpenIndex(randomIndex)
    }
  }, [items.length])

  return (
    <div className="w-full mt-10 mx-auto bg-black">
      <div className="divide-y border-white/30">
        {items.map((item, index) => (
          <AccordionItemComponent
            key={index}
            title={item.title}
            carousel={item.carousel}
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex((prev) => (prev === index ? null : index))
            }
            teamMembers={item.carousel ? teamMembers : undefined}
          >
            {item.content}
          </AccordionItemComponent>
        ))}
      </div>
    </div>
  );
}