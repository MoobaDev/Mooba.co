import ViewportVideo from "../../components/our-essence/ViewportVideo";
import { getNosotrosInfo } from "@/lib/getNosotrosInfo";
import AccordionClient from "@/components/our-essence/AccordionClient"; 

export default async function NuestraEsenciaPage() {
  const { data } = await getNosotrosInfo();

  const infoSections = data.map((item) => ({
    title: item.sectionName,
    content: item.sectionDescription,
    carousel: item.sectionName.toLowerCase().includes("equipo"),
  }));

  return (
    <main>
      <ViewportVideo />
      <AccordionClient items={infoSections} />
    </main>
  );
}
