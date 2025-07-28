import { ServicesSection } from "@/types/ServicesSection";

export async function getProject(slug: string): Promise<ServicesSection | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/proyectos?filters[slug][$eq]=${slug}&populate=*`,
      { 
        cache: "no-store", 
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        }, 
      },
    );
    if (!res.ok) {
      return null;
    }
    const response: { data: ServicesSection[] } = await res.json();
    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}