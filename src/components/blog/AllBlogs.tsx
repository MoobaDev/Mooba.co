'use client';
import GlassCursor from '@/components/ui/GlassCursor';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '@/types/Blog';

type BlogsProps = {
  blogs: Blog[];
};

function formatDate(dateString: string) {
  const fecha = new Date(dateString);

  const dia = fecha.toLocaleDateString('es-CO', { day: '2-digit' });
  const mes = fecha.toLocaleDateString('es-CO', { month: 'long' });
  const anio = fecha.toLocaleDateString('es-CO', { year: 'numeric' });

  return `${mes} ${dia}, ${anio}`;
}


export default function AllBlogs({ blogs }: BlogsProps) {
  const searchParams = useSearchParams();
  const categoria = searchParams.get('categoria');

  const filtered =
    categoria && categoria !== 'todos'
      ? blogs.filter((blog) =>
          blog.categorias.some((cat) => cat.slug === categoria)
        )
      : blogs;

  return (
    <div>
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No hay blogs disponibles</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {filtered.map((blog) => {
            /* const mod = idx % 6;
            const mediaClass =
              mod === 1 || mod === 4
                ? 'aspect-[1/1] md:max-h-[350px] lg:max-h-[510px] object-cover'
                : 'aspect-[1/1] md:max-h-[350px] lg:max-h-[510px] object-cover'; */

            const fecha = formatDate(blog.publishedAt);
            const autor = blog.author?.name || 'Sin autor';

            return (
              <div
                key={blog.slug}
                className="flex flex-col gap-y-4 md:gap-y-2  transition-all duration-300 ease-in-out group"
              >
                {/* Media */}
                <Link href={`/blog/${blog.slug}`} id={`blog-img-${blog.slug}`} className="relative cursor-none overflow-hidden">
                  <div className={`hidden md:block w-full aspect-[1/1] md:max-h-[350px] lg:max-h-[510px] object-cover`}>
                    {blog.desktopVideo ? (
                      <video
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${blog.desktopVideo.url}`}
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : blog.desktopImage ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${blog.desktopImage.url}`}
                        alt={blog.desktopImage.alternativeText || blog.title}
                        width={blog.desktopImage.width}
                        height={blog.desktopImage.height}
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                      />
                    ) : null}
                  </div>

                  {/* Mobile */}
                  <div className="block md:hidden w-full aspect-[1/1] overflow-hidden">
                    {blog.desktopVideo ? (
                      <video
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${blog.desktopVideo.url}`}
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : blog.desktopImage ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${blog.desktopImage.url}`}
                        alt={blog.desktopImage.alternativeText || blog.title}
                        width={blog.desktopImage.width}
                        height={blog.desktopImage.height}
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                      />
                    ) : null}
                  </div>

                  <GlassCursor targetId={`blog-img-${blog.slug}`} label="Ver Publicación" />
                </Link>

                {/* Contenido */}
                <div className="flex flex-col flex-1 gap-y-2">
                  <div className="flex flex-col gap-y-1">
                    <span className="text-sm text-[#7A7F89] font-light mt-1">
                      Por <span className="font-normal">{autor}</span> — {fecha}
                    </span>
                    <Link href={`/blog/${blog.slug}`}><h2 className="text-xl font-extralight line-clamp-2">{blog.title}</h2></Link>
                    <p className="text-[#ABB1BA] text-lg font-extralight line-clamp-2">
                      {blog.shortDescription}
                    </p>
                  </div>

                  {/* Categorías */}
                  <div className="flex flex-wrap gap-y-2">
                    {Array.isArray(blog.categorias) &&
                      blog.categorias.map((cat) => (
                        <Link 
                          key={cat.slug}
                          href={`/blog?categoria=${cat.slug}`}
                          className="border-1 rounded-[100px] px-3 py-[2px] text-sm text-[#7A7F89] bg-transparent border-[#D0D5DD]"
                        >
                          {cat.name}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
