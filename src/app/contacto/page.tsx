import { getSeo } from "@/lib/getSeo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const seoResponse = await getSeo('contactanos')

  if (!seoResponse) return {}

  const seo = seoResponse?.seo

  return {
    title: seo?.title || "Contactanos - Mooba",
    description: seo?.description || '',
    keywords: seo?.keywords,
    robots: seo?.metaRobots || 'index, follow',
    openGraph: {
      title: seo?.title || "Contactanos - Mooba",
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.title || "Contactanos - Mooba",
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
  }
}

export default function ContactoPage() {
  return (
    <div>
      <p>Página de Contacto</p>
    </div>
  );
}