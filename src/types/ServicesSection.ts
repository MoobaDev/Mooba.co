import { Seo } from "./Seo";

export interface ServicesSection {
    serviceTitle: string;
    slug: string;
    serviceDescription: string;
    firstSectionTitle: string;
    secondSectionTitle: string;
    thirdSectionTitle: string;
    fourthSectionTitle: string;
    firstSectionContent: SectionContent[];
    secondSectionContent: SectionContent[];
    thirdSectionContent: SectionContent[];
    fourthSectionContent: SectionContent[];
    serviceVideo: VideoSection;
    seo: Seo;
}
export interface VideoSection {
    id: number;
    name: string;
    url:string;
  }
export interface SectionContent{
    title:string;
    description:string;
    animation: object;
}
export interface StrapiServicesSectionResponse {
    data: ServicesSection[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}