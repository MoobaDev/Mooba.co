interface StrapiImageFormat {
  url: string;
}

export interface StrapiImage {
  id: number;
  url: string;
  width: number;
  height: number;
  alternativeText?: string;
  caption?: string;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface Integrantes {
  name: string;
  ocupation: string;
  phrase: string;
  image: StrapiImage[];
}

export interface StrapiIntegrantesResponse {
  data: Integrantes[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Tipos para el Accordion
export interface AccordionItem {
  title: string;
  content: string;
  carousel?: boolean;
}

export interface TeamMember {
  name: string;
  ocupation: string;
  phrase: string;
  image: StrapiImage[];
}

export interface AccordionClientProps {
  items: AccordionItem[];
  teamMembers: TeamMember[];
}

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  carousel?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  teamMembers?: TeamMember[];
}