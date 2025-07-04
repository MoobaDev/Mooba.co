"use client";
import { Project } from "@/types/Proyecto";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  const searchParams = useSearchParams();
  const categoria = searchParams.get("categoria");

  const filtered = categoria && categoria !== "todos"
    ? projects.filter((project) =>
        project.categorias.some((cat) => cat.slug === categoria)
      )
    : projects;

  return (
    <div>
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No hay proyectos disponibles</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
                <Link
                key={project.slug}
                href={`/proyectos/${project.slug}`}
                className="flex flex-col gap-y-4"
                >
                    {project.mobileImage && (
                        <div className="">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${project.mobileImage.formats?.medium?.url || project.mobileImage.url}`}
                                alt={project.mobileImage.alternativeText || project.title}
                                width={project.mobileImage.width}
                                height={project.mobileImage.height}
                                className="w-full h-80 object-contain"
                            />
                        </div>
                    )}
                    <div className="flex flex-col flex-1 gap-y-2">
                        <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                            {project.title}
                        </h2>
                        <p className="text-gray-200 mb-4 line-clamp-1">
                            {project.shortDescription}
                        </p>
                        <div className="flex justify-between items-center mt-auto">
                            <div className="flex flex-wrap gap-y-2">
                                {Array.isArray(project.categorias) && project.categorias.map((cat) => (
                                    <div
                                        key={cat.slug}
                                        className={`border-1 rounded-[100px] px-3 py-[2px] text-sm ${
                                        categoria === cat.slug
                                            ? "bg-white text-black border-white"
                                            : "text-[#7A7F89] bg-transparent border-[#D0D5DD]"
                                        }`}
                                    >
                                        {cat.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      )}
    </div>
  );
}