import { StrapiIntegrantesResponse } from "@/types/Integrantes";

export async function getTeamInfo(): Promise<StrapiIntegrantesResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/integrantes?populate=*&sort=createdAt:desc`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch team info");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching team info:", error);
    return {
      data: [],
      meta: {
        pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 },
      },
    };
  }
}