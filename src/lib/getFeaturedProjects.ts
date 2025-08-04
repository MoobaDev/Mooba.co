import { HighlightedProject } from "@/types/highlightedProjects.type";
export async function getFeturedProject(): Promise<HighlightedProject[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/proyecto-destacados?populate[proyecto][populate]=*&sort=createdAt:desc`,
      { 
        next: { tags: ["featuredProjects"] },
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
    console.error("Error fetching project:", error);
    return null;
  }
}