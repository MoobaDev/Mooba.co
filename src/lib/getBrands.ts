import { Brand } from "@/types/brands.type";

export async function getBrands(): Promise<Brand[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/marcas?populate=*`,
      { 
        next: { tags: ["brands"] },
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
    console.error("Error fetching brands:", error);
    return null;
  }
}