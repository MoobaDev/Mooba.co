import ViewportVideo from "../../components/our-essence/ViewportVideo";
import { getNosotrosInfo } from "@/lib/getNosotrosInfo";
import AccordionClient from "@/components/our-essence/AccordionClient";
import {getTeamInfo} from "../../lib/getTeamInfo";
import { AccordionItem, TeamMember } from "@/types/Integrantes";
import { getOurEssenceVideo } from "@/lib/getOurEssenceVideo";
import ContactUs from "@/components/layout/ContactUs";
import { getSeo } from "@/lib/getSeo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const seoResponse = await getSeo('nosotros')

  if (!seoResponse) return {}

  const seo = seoResponse?.seo

  return {
    title: seo?.title || "Mooba | Nuestra esencia",
    description: seo?.description || '',
    keywords: seo?.keywords,
    robots: seo?.metaRobots || 'index, follow',
    alternates: {
      canonical: `https://mooba.co/nuestra-esencia`,
    },
    openGraph: {
      title: seo?.title || "Mooba | Nuestra esencia",
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.title || "Mooba | Nuestra esencia",
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
  }
}

export default async function NuestraEsenciaPage() {
  const { data } = await getNosotrosInfo();
  const {data: integrantes} = await getTeamInfo();
  const videos = await getOurEssenceVideo();
  const video = videos ? videos[0] : null;

  const infoSections: AccordionItem[] = data.map((item) => ({
    title: item.sectionName,
    content: item.sectionDescription,
    carousel: item.sectionName.toLowerCase().includes("equipo"),
  }));
  const TeamMembers: TeamMember[] = integrantes.map((persona) => ({
    name: persona.name, 
    ocupation: persona.ocupation,
    phrase: persona.phrase,
    image: persona.image,
  }))
  return (
    <main>
      <ViewportVideo video={video} />
      <AccordionClient items={infoSections} teamMembers={TeamMembers}/>
      <section className="max-w-[1440px] mx-auto w-full px-8 py-8">
        <ContactUs/>
      </section>
    </main>
  );
}
