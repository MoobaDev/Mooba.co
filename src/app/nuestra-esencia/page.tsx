import ViewportVideo from "../../components/our-essence/ViewportVideo";
import { getNosotrosInfo } from "@/lib/getNosotrosInfo";
import AccordionClient from "@/components/our-essence/AccordionClient";
import {getTeamInfo} from "../../lib/getTeamInfo";

export default async function NuestraEsenciaPage() {
  const { data } = await getNosotrosInfo();
  const {data: integrantes} = await getTeamInfo();

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
      <ViewportVideo />
      <AccordionClient items={infoSections} teamMembers={TeamMembers}/>
    </main>
  );
}
