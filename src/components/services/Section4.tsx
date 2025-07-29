import { SectionContent } from "@/types/ServicesSection"
import LoopingIcon from "@/components/services/LoopedIcon"

interface Props {
    fourthSectionTitle: string
    fourthSectionContent: SectionContent[]
}

export default function Section4({ fourthSectionTitle, fourthSectionContent }: Props) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col md:flex-row justify-start">
        <h1 className="text-[32px] md:text-[48px] font-normal">{fourthSectionTitle}</h1>
        <div className="flex flex-row flex-wrap gap-6">
          {fourthSectionContent.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex flex-row items-center space-x-4">
                <LoopingIcon animationData={item.animation} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}