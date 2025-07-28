import { StrapiBlogsResponse } from "@/types/Blog";

export async function getAllBlogs(): Promise<StrapiBlogsResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/blogs?populate=*&sort=updatedAt:desc`, {
      next: { revalidate: 600 }, // Revalidar cada hora
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      data: [],
      meta: {
        pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 },
      },
    };
  }
}