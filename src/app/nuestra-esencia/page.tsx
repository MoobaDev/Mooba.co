import VideoHero from "../../components/our-essence/ViewportVideo"
import { Accordion } from "@/components/our-essence/AccordeonItem"
import TeamCarousel from "@/components/our-essence/TeamCarousel";

export default function NuestraEsenciaPage() {
  const InfoSections = [
    {
      title: "Somos Mooba",
      content: "Una agencia creativa donde el diseño, la tecnología y las ideas estratégicas se cruzan para crear marcas, productos y experiencias con impacto."
    },
    {
      title: "Pensamos con intención",
      content: "No seguimos fórmulas. Diseñamos a conciencia, entendiendo qué mueve a las personas y cómo generar valor real para los negocios."
    },
    {
      title: "Nos mueven las ganas de hacerlo bien",
      content: "Por eso cuidamos el detalle, cuestionamos lo obvio y trabajamos para que cada proyecto tenga sentido, consistencia y ambición."
    },
    {
      title:"Somos equipo",
      content:"Diseñadores, desarrolladores, estrategas y creadores. Personas diferentes, pero con un lenguaje común: transformar ideas en resultados."
    },
     
  ];
  return (
    <main>
      <VideoHero/>
      <Accordion items={InfoSections} />
      <TeamCarousel/>
    </main>
  );
}