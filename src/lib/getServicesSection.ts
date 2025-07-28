import { ServicesSection } from "@/types/ServicesSection";

export async function getServiceSection(slug: string): Promise<ServicesSection | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/seccion-servicios?filters[slug][$eq]=${slug}&populate=*`,
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
    console.log(response)
    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}