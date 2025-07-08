import VideoHero from "@/components/home/Hero"
import HighlightedProjects from "@/components/home/HighlightedProjects"
import PortafolioHome from "@/components/home/PortafolioHome"
import ServicesHome from "@/components/home/ServicesHome"


import TrustedBrands from "@/components/home/TrustedBrands"

export default function HomePage() {
  return (
    <main>
      <VideoHero />
      <HighlightedProjects />
      <PortafolioHome />
      <TrustedBrands />
      <ServicesHome />
    </main>
  )
}
