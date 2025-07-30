import { StrapiProjectsResponse } from "@/types/Proyecto";

export async function getProjectByCategory(slug: string): Promise<StrapiProjectsResponse> {
    try {
        const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/proyectos?filters[categorias][slug][$eq]=${slug}&populate=*`,
        {
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
        }
        );
        if (!res.ok) {
            throw new Error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching projects by category:", error);
        return {
            data: [],
            meta: {
            pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 },
            },
        };
    }
}