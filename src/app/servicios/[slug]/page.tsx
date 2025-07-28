import ServiceMain from "@/components/services/ServiceMain"
import Section1 from "@/components/services/Section1"
import Section2 from "@/components/services/Section2"
import Section3 from "@/components/services/Section3"
import Section4 from "@/components/services/Section4"

export default function ServicesPage() {
    return (
        <section className="pt-24">
            <div className="max-w-[1440px] mx-auto w-full px-8 pb-8 md:pt-16">
                <ServiceMain/>
                <Section1/>
                <Section2/>
                <Section3/>
                <Section4/>
            </div>
        </section>
    )
}