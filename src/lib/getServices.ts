import { Service } from "@/types/service.type";

export async function getServices(): Promise<Service[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/servicios?populate=*`,
      { 
        next: { revalidate: 600 }, // Revalidar cada hora
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