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
            <Suspense fallback={<div>Loading video hero...</div>}>
                <VideoHero videoHero={videoHero} />
            </Suspense>
            <Suspense fallback={<div>Loading featured projects...</div>}>
                <HighlightedProjects projects={featuredProjects} />
            </Suspense>
            <Suspense fallback={<div>Loading portfolio projects...</div>}>
                <PortafolioHome projects={allProjects} />
            </Suspense>
            <Suspense fallback={<div>Loading trusted brands...</div>}>
                <TrustedBrands brands={brandsResponse!} />
            </Suspense>
            <ServicesHome services={services} />
            <ContactSection />
        </>
    );
}
