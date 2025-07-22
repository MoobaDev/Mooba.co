"use client"
import { useState, useEffect } from "react"
import AccordionItemComponent from "./AccordionItem"
import { AccordionClientProps } from "@/types/Integrantes"


export default function AccordionClient({ items, teamMembers } : AccordionClientProps ) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length)
      setOpenIndex(randomIndex)
    }
  }, [items.length])

  return (
      <section className="w-full mt-10 mx-auto bg-black border-b border-white/30">
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
      </section>
  );
}