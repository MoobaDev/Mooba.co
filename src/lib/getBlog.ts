import { Project } from "@/types/Proyecto";

export async function getBlog(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`,
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
    const response: { data: Project[] } = await res.json();
    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}