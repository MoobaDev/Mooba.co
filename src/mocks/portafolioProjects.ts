import { portafolioProject } from "@/types/proyecto.type";

// Mock data - in a real app, this would come from an API or CMS
export const mockProjects: portafolioProject[] = [
  {
    id: 1,
    title: "beeactive",
    category: "Identidad de marca",
    image: "/luxwave.png",
    tags: ["Branding"],
    slug: "beeactive",
  },
  {
    id: 2,
    title: "eCommerce Eticos",
    category: "Experiencia digital",
    image: "/julio.jpg",
    tags: ["Diseño UX/UI", "Desarrollo web"],
    slug: "ecommerce-eticos",
  },
  {
    id: 3,
    title: "Luxwave",
    category: "Identidad de marca",
    image: "/luxwave.png",
    tags: ["Branding"],
    slug: "luxwave",
  },
  {
    id: 4,
    title: "Sitio institucional Eticos",
    category: "Rediseño de sitio",
    image: "/iphone.jpg",
    tags: ["Diseño UX/UI", "Desarrollo app"],
    slug: "sitio-institucional-eticos",
  },
];