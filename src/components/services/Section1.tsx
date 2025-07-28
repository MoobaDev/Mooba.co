import { SectionContent } from "@/types/ServicesSection";
interface Props {
    firstSectionTitle: string;
    firstSectionContent: SectionContent[];
}
export default function Section1({firstSectionTitle, firstSectionContent}:Props){
    const sectionTitle = firstSectionTitle;
    const sectionDescription = firstSectionContent[0].description;
    return(
        <div className="flex flex-col md:flex-row">
            <div className="flex flex-col md:flex-row justify-start">
                <h1 className="text-[32px] md:text-[48px] font-normal">{sectionTitle}</h1>
                <p>{sectionDescription}</p>
            </div>
        </div>
    )
}