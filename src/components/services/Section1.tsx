import { SectionContent } from "@/types/ServicesSection";
interface Props {
    firstSectionTitle: string;
    firstSectionContent: SectionContent[];
}
export default function Section1({firstSectionTitle, firstSectionContent}:Props){
    const sectionTitle = firstSectionTitle;
    const sectionDescription = firstSectionContent[0].description;
    return(
        <div className="grid grid-cols-1  md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
                <h2 className="text-[32px] md:text-[36px] font-normal">{sectionTitle}</h2>
            </div>
            <div className="md:col-span-5">
                <p className="text-[20px] font-[250]">{sectionDescription}</p>
            </div>
        </div>
    )
}