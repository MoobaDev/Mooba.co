import { SectionContent } from "@/types/ServicesSection"

interface Props {
    thirdSectionTitle: string
    thirdSectionContent: SectionContent[]
}

export default function Section3({ thirdSectionTitle, thirdSectionContent }: Props){
    return(
        <div className="flex flex-col md:flex-row">
            <div className="flex flex-col md:flex-row justify-start">
                <h1 className="text-[32px] md:text-[48px] font-normal">{thirdSectionTitle}</h1>
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        {thirdSectionContent.map((item, index) => (
                            <div key={index} className="flex flex-col">
                                <div className="flex flex-row items-center space-x-4">
                                <h3>{index + 1}. {item.title}</h3>
                                <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}