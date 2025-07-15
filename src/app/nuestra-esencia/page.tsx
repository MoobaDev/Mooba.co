import ViewportVideo from "../../components/our-essence/ViewportVideo";
import { getNosotrosInfo } from "@/lib/getNosotrosInfo";
import AccordionClient from "@/components/our-essence/AccordionClient";
import {getTeamInfo} from "../../lib/getTeamInfo";
import { getVideos } from "@/lib/getOurEssenceVideo";

export default async function NuestraEsenciaPage() {
  const { data } = await getNosotrosInfo();
  const {data: integrantes} = await getTeamInfo();
  const {data: videos} = await getVideos();

  const infoSections = data.map((item) => ({
    title: item.sectionName,
    content: item.sectionDescription,
    carousel: item.sectionName.toLowerCase().includes("equipo"),
  }));
  const TeamMembers = integrantes.map((persona) => ({
    name: persona.name, 
    ocupation: persona.ocupation,
    image: persona.image,
  }))
  return (
    <main>
      <ViewportVideo video={videos[0]} />
      <AccordionClient items={infoSections} teamMembers={TeamMembers}/>
    </main>
  );
}
