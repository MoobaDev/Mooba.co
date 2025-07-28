import { StrapiCategoriesResponse } from "@/types/Proyecto";

export async function getCategories(): Promise<StrapiCategoriesResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/categorias`, {
      next: { revalidate: 3600 }, // Revalidar cada hora
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      data: [],
      meta: {
        pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 },
      },
    };
  }
}