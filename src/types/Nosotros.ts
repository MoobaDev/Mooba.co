export interface Nosotros{
    sectionName: string;
    sectionDescription: string;
}
export interface StrapiNosotrosResponse {
  data: Nosotros[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}