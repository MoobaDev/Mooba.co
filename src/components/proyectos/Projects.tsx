'use client';
import { Project } from '@/types/Proyecto';
import GlassCursor from '@/components/ui/GlassCursor';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  const searchParams = useSearchParams();
  const categoria = searchParams.get('categoria');

  const filtered =
    categoria && categoria !== 'todos'
      ? projects.filter((project) =>
          project.categorias.some((cat) => cat.slug === categoria)
        )
      : projects;

  function getColSpan(idx: number) {
    const mod = idx % 6;
    if (mod === 0 || mod === 5) return 'col-span-12 md:col-span-12';
    if (mod === 1) return 'col-span-12 md:col-span-4';
    if (mod === 2) return 'col-span-12 md:col-span-8';
    if (mod === 3) return 'col-span-12 md:col-span-8';
    if (mod === 4) return 'col-span-12 md:col-span-4';
    return 'col-span-12 md:col-span-12';
  }

  return (
    <div>
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No hay proyectos disponibles</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {filtered.map((project, idx) => {
            const colSpan = getColSpan(idx);
            const mod = idx % 6;
            /* const aspectRatio = mod === 1 || mod === 5 ? 'h-full object-cover' : 'aspect-[16/9] md:max-h-[350px] lg:max-h-[510px]  overflow-hidden'; */
            const mediaClass =
              mod === 1 || mod === 4
                ? 'h-full md:max-h-[350px] lg:max-h-[510px] object-cover'
                : 'aspect-[16/9] md:max-h-[350px] lg:max-h-[510px] object-cover';

            return (
              <Link
                key={project.slug}
                href={`/proyectos/${project.slug}`}
                className={`flex flex-col gap-y-4 md:gap-y-2 ${colSpan} h-full`}
              >
                {/* Media (imagen o video) */}
                <div id={`proyecto-img-${project.slug}`} className="relative cursor-none h-full">
                  <div className={`hidden md:block w-full h-full ${mediaClass}`}>
                    {project.desktopVideo ? (
                      <video
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${project.desktopVideo.url}`}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : project.desktopImage ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${project.desktopImage.url}`}
                        alt={project.desktopImage.alternativeText || project.title}
                        width={project.desktopImage.width}
                        height={project.desktopImage.height}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                  
                  <div className={`block md:hidden w-full aspect-[1/1] overflow-hidden`}>
                    {project.desktopVideo ? (
                      <video
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${project.desktopVideo.url}`}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : project.desktopImage ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${project.desktopImage.url}`}
                        alt={project.desktopImage.alternativeText || project.title}
                        width={project.desktopImage.width}
                        height={project.desktopImage.height}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>

                  <GlassCursor targetId={`proyecto-img-${project.slug}`} label="Ver Proyecto" />
                </div>

                {/* Contenido del proyecto */}
                <div className="flex flex-col flex-1 gap-y-2">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-extralight line-clamp-1 mb-1">
                      {project.title}
                    </h2>
                    <p className="text-[#ABB1BA] text-xl font-extralight line-clamp-1">
                      {project.shortDescription}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex flex-wrap gap-y-2">
                      {Array.isArray(project.categorias) &&
                        project.categorias.map((cat) => (
                          <div
                            key={cat.slug}
                            className="border-1 rounded-[100px] px-3 py-[2px] text-sm text-[#7A7F89] bg-transparent border-[#D0D5DD]"
                          >
                            {cat.name}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
