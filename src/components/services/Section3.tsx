import { SectionContent } from "@/types/ServicesSection"

interface Props {
    thirdSectionTitle: string
    thirdSectionContent: SectionContent[]
}

export default function Section3({ thirdSectionTitle, thirdSectionContent }: Props){
    return(
            <div className="flex flex-col md:grid  md:grid-cols-12 gap-8">
                <div className="col-span-4">
                    <h2 className="text-[32px] md:text-[36px] font-normal">{thirdSectionTitle}</h2>
                </div>
                    <div className="grid grid-cols-2 gap-10 md:col-span-8">
                        {thirdSectionContent.map((item, index) => (
                            <div key={index} className="flex flex-col border border-white/15">
                                <div className="flex p-3 md:p-4">
                                    <div className="flex flex-col md:flex-row items-start gap-2">
                                        <div className="w-[56px] h-[44px] flex items-start justify-start">
                                            <h3 className="text-[32px] md:text-[64px] p-0 text-[#0062FF] leading-none">{index + 1}.</h3>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="text-[18px] md:text-[28px] font-normal"> {item.title}</h3>
                                            <p className="text-[14px] md:text-[16px] font-[250] tracking-tighter text-left break-normal">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
    )
}