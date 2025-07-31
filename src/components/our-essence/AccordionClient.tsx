"use client"
import { useState, useEffect } from "react"
import AccordionItemComponent from "./AccordionItem"
import { AccordionClientProps } from "@/types/Integrantes"

export default function AccordionClient({ items, teamMembers }: AccordionClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (items.length > 0) {
      const carouselIndex = items.findIndex(item => item.carousel)
      if (carouselIndex !== -1) {
        setOpenIndex(carouselIndex)
      } else {
        const randomIndex = Math.floor(Math.random() * items.length)
        setOpenIndex(randomIndex)
      }
    }
  }, [items])

  const handleToggle = (index: number) => {
    const item = items[index]
    if (item.carousel) {
      return
    }
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
      <section className="w-full mt-10 mx-auto ">
        {items.map((item, index) => (
          <AccordionItemComponent
            key={index}
            title={item.title}
            carousel={item.carousel}
            isOpen={item.carousel ? true : openIndex === index}
            onToggle={() => handleToggle(index)}
            teamMembers={item.carousel ? teamMembers : undefined}
          >
            {item.content}
          </AccordionItemComponent>
        ))}
      </section>
  );
}