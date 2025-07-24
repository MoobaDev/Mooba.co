import { StrapiCategoriesResponse } from "@/types/Blog";

export async function getBlogCategories(): Promise<StrapiCategoriesResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/categoria-blogs`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch blog categories");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return {
      data: [],
      meta: {
        pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 },
      },
    };
  }
}