import { SeoResponse } from "@/types/Seo";

export async function getSeo(slug: string): Promise<SeoResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/seos?filters[slug][$eq]=${slug}&populate[seo][populate]=image`,
      { 
        next: { tags: ["seo"] },
        headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      }, },
      
    );
    if (!res.ok) {
      return null;
    }
    const response: { data: SeoResponse[] } = await res.json();
    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching Seo:", error);
    return null;
  }
}