import ServiceMain from "@/components/services/ServiceMain"
import Section1 from "@/components/services/Section1"
import Section2 from "@/components/services/Section2"
import Section3 from "@/components/services/Section3"
import Section4 from "@/components/services/Section4"
import { getServiceSection } from "@/lib/getServicesSection"
import PortafolioHome from "@/components/home/PortafolioHome"
import { getAllProjects } from "@/lib/getAllProyects"
import ContactSection from "@/components/home/ContactUs"
import type { Metadata } from 'next'
import { getSeoServices } from '@/lib/getSeoServices';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getSeoServices(slug);

  if (!service) return {}

  const seo = service.seo

  return {
    title: seo?.title || service.serviceTitle,
    description: seo?.description || '',
    keywords: seo?.keywords,
    robots: seo?.metaRobots || 'index, follow',
    alternates: {
      canonical: `https://mooba.co/servicios/${slug}`,
    },
    openGraph: {
      title: seo?.title || service.serviceTitle,
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.title || service.serviceTitle,
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
  }
}

export default async function ServicesPage({ params }: { params: { slug: string }}) {
    const { slug } = await params;
    const service = await getServiceSection(slug);
    const allProjectsResponse = await getAllProjects();
    const filteredProjects = allProjectsResponse?.data?.filter(project =>project.categorias?.some(cat => cat.slug === slug)) || [];
    const additionalProjects = allProjectsResponse?.data?.filter(project =>!project.categorias?.some(cat => cat.slug === slug)) || [];
    const combinedProjects = [...filteredProjects, ...additionalProjects].slice(0, 4);

    if (!service) {
        return <div>Servicio no encontrado</div>;
    }
    return (
        <section className="pt-24">
            <div className="max-w-[1440px] mx-auto w-full md:pt-16">
                <div className="px-6">
                    <ServiceMain service={service}/>
                    <div className="w-full border-t border-white/30 my-[32px]"></div>
                    <Section1 firstSectionTitle={service.firstSectionTitle} firstSectionContent={service.firstSectionContent}/>
                    <div className="w-full border-t border-white/30 my-[32px]"></div>
                    <Section2 secondSectionTitle={service.secondSectionTitle} secondSectionContent={service.secondSectionContent}/>
                    <div className="w-full border-t border-white/30 my-[32px]"></div>
                    <Section3 thirdSectionTitle={service.thirdSectionTitle} thirdSectionContent={service.thirdSectionContent} />
                    <div className="w-full border-t border-white/30 my-[32px]"></div>
                    <Section4 fourthSectionTitle={service.fourthSectionTitle} fourthSectionContent={service.fourthSectionContent} />
                    <div className="w-full border-t border-white/30 my-[32px]"></div>
                </div>
                <PortafolioHome projects={combinedProjects} title={"Proyectos relacionados"} categorySlug={slug} />
                <ContactSection />
            </div>
        </section>
    )
}