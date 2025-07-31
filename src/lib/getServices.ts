import { Service } from "@/types/service.type";

export async function getServices(): Promise<Service[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/categorias?populate=*`,
      { 
        next: { tags: ["services"] },
        headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      }, },
      
    );
    if (!res.ok) {
      return null;
    }
    const response = await res.json();
    return response.data || null;
  } catch (error) {
    console.error("Error fetching services:", error);
    return null;
  }
}