import Link from "next/link";
import "../globals.css";
import Image from "next/image";

interface StrapiImageFormat {
  url: string;
}
interface StrapiImage {
  id: number;
  url: string;
  width: number;
  height: number;
  alternativeText?: string;
  caption?: string;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

interface Project {
  title: string;
  slug: string;
  shortDescription: string;
  mobileImage: StrapiImage;
  desktopImage: StrapiImage;
  desktopContent: string;
  mobileContent: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiResponse {
  data: Project[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function getProjects(): Promise<StrapiResponse> {
  try {
    const res = await fetch(`${process.env.STRAPI_API_URL}/api/proyectos?populate=*`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      data: [],
      meta: {
        pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 },
      },
    };
  }
}

export default async function PortafolioPage() {

  const { data: projects } = await getProjects();

  return (
    <div className="w-full px-8 py-12">

      <div className="mb-6">
        <h1 className="text-[28px] font-[250]">Proyectos</h1>
      </div>

      <hr className="mb-8 bg-[#D0D5DD]" />

      <div className="mb-8">
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
      )}
    </div>
  );
}