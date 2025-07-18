import ContactSection from "@/components/home/ContactUs"
import VideoHero from "@/components/home/Hero"
import HighlightedProjects from "@/components/home/HighlightedProjects"
import PortafolioHome from "@/components/home/PortafolioHome"
import ServicesHome from "@/components/home/ServicesHome"
import TrustedBrands from "@/components/home/TrustedBrands"
import { getFeturedProject } from "@/lib/getFeaturedProjects"
import { getAllProjects } from "@/lib/getAllProyects"
import { getBrands } from "@/lib/getBrands"
import { Suspense } from "react"
import { getServices } from "@/lib/getServices"
import { getVideoHero } from "@/lib/getVideoHero"

export default async function HomePage() {
    
    const videoHero = await getVideoHero();
    const featuredProjects = await getFeturedProject();
    const allProjectsResponse = await getAllProjects();
    const allProjects = allProjectsResponse.data.slice(0, 4);
    const brandsResponse = await getBrands();
    const services = await getServices();

    return (
        <>
            <Suspense fallback={<div>Cargando Demo Reel...</div>}>
                <VideoHero videoHero={videoHero} />
            </Suspense>
            <Suspense fallback={<div>Cargando proyectos destacados...</div>}>
                <HighlightedProjects projects={featuredProjects} />
            </Suspense>
            <Suspense fallback={<div>Cargando proyectos...</div>}>
                <PortafolioHome projects={allProjects} />
            </Suspense>
            <Suspense fallback={<div>Cargando marcas...</div>}>
                <TrustedBrands brands={brandsResponse} />
            </Suspense>
            <Suspense fallback={<div>Cargando servicios...</div>}>
                <ServicesHome services={services} />
            </Suspense>
            <ContactSection />
        </>
    );
}
