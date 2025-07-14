import { Metadata } from "next";
import Image from "next/image";
import { getSeo } from "@/lib/getSeo";

export async function generateMetadata(): Promise<Metadata> {
  const seoResponse = await getSeo('home')

  if (!seoResponse) return {}

  const seo = seoResponse?.seo

  return {
    title: seo?.title || "Home - Mooba",
    description: seo?.description || '',
    keywords: seo?.keywords,
    robots: seo?.metaRobots || 'index, follow',
    alternates: {
      canonical: `https://mooba.co/proyectos`,
    },
    openGraph: {
      title: seo?.title || "Home - Mooba",
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.title || "Home - Mooba",
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
  }
}

export default function HomePage() {
  return (
    <div className="relative w-full h-screen flex flex-col">
      <Image src="/fondo.jpg" alt="Logo mooba" fill className="object-cover" />
    </div>
  );
}