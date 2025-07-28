import ServiceMain from "@/components/services/ServiceMain"
import Section1 from "@/components/services/Section1"
import Section2 from "@/components/services/Section2"
import Section3 from "@/components/services/Section3"
import Section4 from "@/components/services/Section4"
import { getServiceSection } from "@/lib/getServicesSection"

export default async function ServicesPage({ params }: { params: { slug: string }}) {
    const { slug } = await params;
    console.log(slug)
    const service = await getServiceSection(slug);
    console.log(service)
    if (!service) return null;

    return (
        <section className="pt-24">
            <div className="max-w-[1440px] mx-auto w-full px-8 pb-8 md:pt-16">
                <ServiceMain service={service}/>
                <Section1 firstSectionTitle={service.firstSectionTitle} firstSectionContent={service.firstSectionContent}/>
                <Section2 secondSectionTitle={service.secondSectionTitle} secondSectionContent={service.secondSectionContent}/>
                <Section3/>
                <Section4/>
            </div>
        </section>
    )
}