export interface HeaderLogo{
    logoJson: object;
    name:string;
}
export interface StrapiHeaderLogoResponse {
    data: HeaderLogo[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}