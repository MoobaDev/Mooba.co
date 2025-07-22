import "../globals.css";
import { getAllProjects } from "@/lib/getAllProyects";
import { getCategories } from "@/lib/getCategories";
import Categories from "@/components/proyectos/Categories";
import Projects from "@/components/proyectos/Projects";
import ContactSection from "@/components/home/ContactUs";
import PortafolioHome from "@/components/home/PortafolioHome";

export default async function PortafolioPage() {

  const { data: projects } = await getAllProjects();
  const portfolioProjects = projects.slice(0, 4);
  const { data: categories } = await getCategories();

  return (
    <div className="w-full max-w-360 mx-auto px-6 md:px-8 pt-28 pb-8">

      <div className="mb-6">
        <h1 className="text-[28px] md:text-[52px] font-extralight">Proyectos</h1>
      </div>

      <div
        className="w-screen relative left-1/2 -translate-x-1/2 mb-7"
        style={{
          height: "1px",
          backgroundColor: "#D0D5DD",
          transform: "scaleY(0.2)",
          transformOrigin: "top",
        }}
      ></div>

      <Categories categories={categories} />

      <Projects projects={projects} />

      <div className="hidden md:block">
        <PortafolioHome projects={portfolioProjects} />
      </div>
    </div>
  );
}