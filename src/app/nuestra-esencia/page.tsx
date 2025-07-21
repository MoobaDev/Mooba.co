import ViewportVideo from "../../components/home/Hero";
import { getNosotrosInfo } from "@/lib/getNosotrosInfo";
import AccordionClient from "@/components/our-essence/AccordionClient";
import {getTeamInfo} from "../../lib/getTeamInfo";
import { getVideos } from "@/lib/getOurEssenceVideo";
import { AccordionItem, TeamMember } from "@/types/Integrantes";

export default async function NuestraEsenciaPage() {
  const { data } = await getNosotrosInfo();
  const {data: integrantes} = await getTeamInfo();
  const videos = await getVideos();

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
      <ViewportVideo videoHero={videos} />
      <AccordionClient items={infoSections} teamMembers={TeamMembers}/>
    </main>
  );
}
