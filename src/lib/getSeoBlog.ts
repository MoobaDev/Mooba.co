import { Blog } from "@/types/Blog";

export async function getSeoBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/blogs?filters[slug][$eq]=${slug}&populate[seo][populate]=image`,
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
    const response: { data: Blog[] } = await res.json();
    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}