import VideoHero from "../../components/our-essence/ViewportVideo"
import { Accordion } from "@/components/our-essence/AccordeonItem"
import { getSeo } from "@/lib/getSeo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const seoResponse = await getSeo('nosotros')

  if (!seoResponse) return {}

  const seo = seoResponse?.seo

  return {
    title: seo?.title || "Nosotros - Mooba",
    description: seo?.description || '',
    keywords: seo?.keywords,
    robots: seo?.metaRobots || 'index, follow',
    alternates: {
      canonical: `https://mooba.co/nuestra-esencia`,
    },
    openGraph: {
      title: seo?.title || "Nosotros - Mooba",
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.title || "Nosotros - Mooba",
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
  }
}

export default function NuestraEsenciaPage() {
  const InfoSections = [
    {
      title: "Somos Mooba",
      content: "Una agencia creativa donde el diseño, la tecnología y las ideas estratégicas se cruzan para crear marcas, productos y experiencias con impacto.",
      carousel: false
    },
    {
      title: "Pensamos con intención",
      content: "No seguimos fórmulas. Diseñamos a conciencia, entendiendo qué mueve a las personas y cómo generar valor real para los negocios.",
      carousel: false
    },
    {
      title: "Nos mueven las ganas de hacerlo bien",
      content: "Por eso cuidamos el detalle, cuestionamos lo obvio y trabajamos para que cada proyecto tenga sentido, consistencia y ambición",
      carousel: false
    },
    {
      title:"Somos equipo",
      content:"Diseñadores, desarrolladores, estrategas y creadores. Personas diferentes, pero con un lenguaje común: transformar ideas en resultados.",
      carousel: true
    },
     
  ];
  return (
    <main>
      <VideoHero/>
      <Accordion items={InfoSections} />
    </main>
  );
}