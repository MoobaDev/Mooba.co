import ServiceMain from "@/components/services/ServiceMain"
import Section1 from "@/components/services/Section1"
import Section2 from "@/components/services/Section2"
import Section3 from "@/components/services/Section3"
import Section4 from "@/components/services/Section4"
import { getServiceSection } from "@/lib/getServicesSection"
import PortafolioHome from "@/components/home/PortafolioHome"
import { getAllProjects } from "@/lib/getAllProyects"
import ContactSection from "@/components/home/ContactUs"


export default async function ServicesPage({ params }: { params: { slug: string }}) {
    const { slug } = await params;
    const service = await getServiceSection(slug);
    const allProjectsResponse = await getAllProjects();
    const allProjects = allProjectsResponse.data.slice(0, 4);
    if (!service) return null;

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
                <PortafolioHome projects={allProjects} />
                <ContactSection />
            </div>
        </section>
    )
}