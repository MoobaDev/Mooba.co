import { SectionContent } from "@/types/ServicesSection"
import AnimatedIcon from "@/components/services/AnimatedIcon"

interface Props {
  secondSectionTitle: string
  secondSectionContent: SectionContent[]
}

export default function Section2({ secondSectionTitle, secondSectionContent }: Props) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col md:flex-row justify-start">
        <h1 className="text-[32px] md:text-[48px] font-normal">{secondSectionTitle}</h1>
        <div className="flex flex-row flex-wrap gap-6">
          {secondSectionContent.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex flex-row items-center space-x-4">
                <AnimatedIcon animationData={item.animation} />
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
