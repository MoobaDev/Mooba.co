import { getSeo } from "@/lib/getSeo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const seoResponse = await getSeo('servicios')

  if (!seoResponse) return {}

  const seo = seoResponse?.seo

  return {
    title: seo?.title || "Servicios - Mooba",
    description: seo?.description || '',
    keywords: seo?.keywords,
    robots: seo?.metaRobots || 'index, follow',
    openGraph: {
      title: seo?.title || "Servicios - Mooba",
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.title || "Servicios - Mooba",
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
  }
}

export default function ServiciosPage() {
  return (
    <div>
      <p>Página de Servicios</p>
    </div>
  );
}