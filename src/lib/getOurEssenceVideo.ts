import { StrapiVideoResponse } from "@/types/VideoNosotros";

export async function getTeamInfo(): Promise<StrapiVideoResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/viewport-video-nosotros-seccion?populate=*`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch video");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching video:", error);
    return {
      data: [],
      meta: {
        pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 },
      },
    };
  }
}