import VideoHero from "@/components/home/Hero"
import HighlightedProjects from "@/components/home/HighlightedProjects"
import PortafolioHome from "@/components/home/PortafolioHome"
import ServiciosHome from "@/components/home/ServiciosHome"

export default function HomePage() {
  return (
    <main>
      <VideoHero />
      <HighlightedProjects />
      <PortafolioHome />
      <ServiciosHome />
    </main>
  )
}
