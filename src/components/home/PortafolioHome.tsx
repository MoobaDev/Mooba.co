import Image from "next/image";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  tags: string[];
  slug: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: "beeactive",
    category: "Identidad de marca",
    image: "/images/luxwave.png",
    tags: ["Branding"],
    slug: "beeactive",
  },
  {
    id: 2,
    title: "eCommerce Eticos",
    category: "Experiencia digital",
    image: "/images/julio.jpg",
    tags: ["Diseño UX/UI", "Desarrollo web"],
    slug: "ecommerce-eticos",
  },
  {
    id: 3,
    title: "Luxwave",
    category: "Identidad de marca",
    image: "/images/luxwave.png",
    tags: ["Branding"],
    slug: "luxwave",
  },
  {
    id: 4,
    title: "Sitio institucional Eticos",
    category: "Rediseño de sitio",
    image: "/images/iphone.jpg",
    tags: ["Diseño UX/UI", "Desarrollo app"],
    slug: "sitio-institucional-eticos",
  },
];

export default function PortafolioHome() {
  return (
    <section className="max-w-[1440px] mt-[120px] mx-auto px-6 md:px-8 overflow-hidden">
      <div className="w-full mb-10 flex justify-between items-center">
        {/* Title */}
        <h1 className="text-white text-2xl md:text-3xl font-light">
          Ideas que se volvieron realidad
        </h1>
        <Link href="/portafolio" className="text-white hover:underline">
          Ver todos los proyectos
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="w-full overflow-x-auto">
        <div className="flex gap-8 pb-6 justify-start">
          {mockProjects.map((project) => (
            <Link
              href={`/portafolio/${project.slug}`}
              key={project.id}
              className="block group cursor-pointer flex-shrink-0"
              style={{ width: "320px", height: "424px", maxHeight: "424px" }}
            >
              <div className="flex flex-col h-full">
                {/* Image Container */}
                <div className="relative mb-4 overflow-hidden  w-full h-[320px]">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>

                {/* Project Info */}
                <div className="mb-3 mt-2">
                  <h3 className="text-white text-lg font-light">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{project.category}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-xs text-white border border-white rounded-full bg-transparent inline-flex items-center justify-center whitespace-nowrap px-3 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
