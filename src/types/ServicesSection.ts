export interface ServicesSection {
    serviceTitle: string;
    slug: string;
    serviceDescription: string;
    firstSectionTitle: string;
    secondSectionTitle: string;
    thirdSectionTitle: string;
    fourthSectionTitle: string;
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