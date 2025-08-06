import { VideoHero } from "@/types/videoHero.type";

export async function getOurEssenceVideo(): Promise<VideoHero[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/viewport-video-nosotros-seccion?populate=*`,
      { 
        next: { tags: ["ourEssenceVideo"] }, 
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
    console.error("Error fetching VideoHero", error);
    return null;
  }
}