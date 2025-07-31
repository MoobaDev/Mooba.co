import { SectionContent } from "@/types/ServicesSection"
import LoopingIcon from "@/components/services/LoopedIcon"

interface Props {
    fourthSectionTitle: string
    fourthSectionContent: SectionContent[]
}

export default function Section4({ fourthSectionTitle, fourthSectionContent }: Props) {
  return (
   
      <div className="flex flex-col gap-8 md:flex-row md:grid md:grid-cols-12">
        <div className="col-span-4">
          <h2 className="text-[32px] md:text-[36px] font-normal">{fourthSectionTitle}</h2>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-8">
          {fourthSectionContent.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex flex-col items-start space-x-4">
                <LoopingIcon animationData={item.animation} />
                <h3 className="font-normal text-[16px] md:text-[32px] tracking-tight">{item.title}</h3>
                <p className="text-[14px] md:text-[16px] font-[250]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}