import "../globals.css";
import { getAllProjects } from "@/lib/getAllProyects";
import { getCategories } from "@/lib/getCategories";
import Categories from "@/components/proyectos/Categories";
import Projects from "@/components/proyectos/Projects";
/* import Link from "next/link";
import Image from "next/image";
 */
export default async function PortafolioPage() {

  const { data: projects } = await getAllProjects();
  const { data: categories } = await getCategories();

  //const [categorieSelected, iscategorieSelected] = useState();

  return (
    <div className="w-full px-6 pt-28 pb-8">

      <div className="mb-6">
        <h1 className="text-[28px] md:text-[52px] font-extralight">Proyectos</h1>
      </div>

      {/* <div className="mb-7 w-screen border-[0.2px]  border-[#D0D5DD] relative left-1/2 -translate-x-1/2"></div> */}

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

      {/* {categories.length === 0 ? (
        <p className="mb-16">No hay categorias</p>
      ) : (
        <div className="mb-16 flex flex-wrap gap-2">
          {categories.map((categorie) => (
            <div key={categorie.slug} className="border-1 border-[#D0D5DD] rounded-[100px] px-3 py-[2px]">
              <Link href={`/proyectos/${categorie.slug}`} className="text-sm text-[#7A7F89]">{categorie.name}</Link>
            </div>
          ))}
        </div>
      )} */}

      <Projects projects={projects} />

      
      {/* <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Proyectos desde Strapi CMS</h1>
        <p className="text-gray-500">
          Contenido HTML generado desde Figma e inyectado con CKEditor
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No hay posts disponibles</h2>
          <p className="text-gray-500">
            Asegúrate de que tu servidor Strapi esté ejecutándose en localhost:1337
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="bg-gray-500 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col p-4"
            >
              {project.mobileImage && (
                <div className="mb-4">
                  <Image
                    src={`${process.env.STRAPI_API_URL}${project.mobileImage.formats?.medium?.url || project.mobileImage.url}`}
                    alt={project.mobileImage.alternativeText || project.title}
                    width={`${project.mobileImage.width}`}
                    height={`${project.mobileImage.height}`}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{project.title}</h2>
                <p className="text-gray-200 mb-4 line-clamp-3">
                  {project.shortDescription}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="inline-block bg-gray-600 text-xs px-2 py-1 rounded">
                    {new Date(project.publishedAt).toLocaleDateString("es-ES")}
                  </span>
                  <Link
                    href={`/proyectos/${project.slug}`}
                    className="text-white hover:underline font-medium"
                  >
                    Ver projecto →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )} */}
      
    </div>
  );
}