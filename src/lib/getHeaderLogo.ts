import { HeaderLogo } from "@/types/HeaderLogo";

export async function getHeaderLogo(): Promise<HeaderLogo[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/logos`,
      { 
        next: { tags: ["logoJson"] },
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        }, 
      },
    );
    if (!res.ok) {
      return null;
    }
    const response = await res.json();
    return response.data || null;
  } catch (error) {
    console.error("Error fetching logo:", error);
    return null;
  }
}