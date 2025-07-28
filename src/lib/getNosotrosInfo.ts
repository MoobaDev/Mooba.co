import { StrapiNosotrosResponse } from "@/types/Nosotros";

export async function getNosotrosInfo(): Promise<StrapiNosotrosResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/secciones-nosotros`, {
      next: { revalidate: 600 }, // Revalidar cada hora
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch info");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching info:", error);
    return {
      data: [],
      meta: {
        pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 },
      },
    };
  }
}