import type { Metadata } from 'next'
import { notFound } from "next/navigation";
import "../../globals.css";
import SafeHtml from "@/components/proyectos/SafeHtml";
import PortafolioHome from '@/components/home/PortafolioHome';
import { getAllProjects } from '@/lib/getAllProyects';
import ContactSection from '@/components/home/ContactUs';
import { getBlog } from '@/lib/getBlog';
import ShareButtons from '@/components/ui/ShareButtons';
import { getSeoBlog } from '@/lib/getSeoBlog';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getSeoBlog(slug);

  if (!blog) return {}

  const seo = blog.seo

  return {
    title: seo?.title || blog.title,
    description: seo?.description || '',
    keywords: seo?.keywords,
    robots: seo?.metaRobots || 'index, follow',
    alternates: {
      canonical: `https://mooba.co/blog/${slug}`,
    },
    openGraph: {
      title: seo?.title || blog.title,
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.title || blog.title,
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
  }
}

function htmlReplace(html: string) {
  // Corrige los atributos de <video>
  let replaceResult = html.replace(
    /<video([^>]*)>/gi,
    (match, attrs) => {
      const cleanedAttrs = attrs
        .replace(/\s*controls\b/gi, "")
        .replace(/\s*autoplay\b/gi, "")
        .replace(/\s*muted\b/gi, "")
        .replace(/\s*loop\b/gi, "")
        .replace(/\s*playsinline\b/gi, "")
        .replace(/\s*width\s*=\s*["'][^"']*["']/gi, "")
        .trim();

      const fixedAttrs = `${cleanedAttrs} autoplay muted loop playsinline`.trim();

      return `<video ${fixedAttrs} width="100%">`;
    }
  );

  // Corrige iframes de YouTube/Vimeo
  replaceResult = replaceResult.replace(
    /<iframe([^>]+src=["'][^"']+)(vimeo\.com|youtube\.com|youtu\.be)([^"']*)["']/gi,
    (match) => {
      const cleaned = match.replace(/([?&])(controls|showinfo|modestbranding|autoplay|loop)=\d+/g, "");
      return cleaned.replace(
        /(src=["'][^"']*)(["'])/,
        (srcMatch, srcUrl, quote) => {
          const separator = srcUrl.includes("?") ? "&" : "?";
          return `${srcUrl}${separator}autoplay=1&loop=1${quote}`;
        }
      );
    }
  );

  // Arregla imágenes
  replaceResult = replaceResult.replace(
    /<img\b([^>]*)>/gi,
    (match, attrs) => {
      const newAttrs = attrs
        .replace(/\s*width\s*=\s*["'][^"']*["']/gi, "")
        .replace(/\s*height\s*=\s*["'][^"']*["']/gi, "")
        .replace(/\s*srcset\s*=\s*["'][^"']*["']/gi, "")
        .trim();
      return `<img ${newAttrs} width="100%">`;
    }
  );

  return replaceResult;
}

function formatDate(dateString: string) {
  const fecha = new Date(dateString);

  const dia = fecha.toLocaleDateString('es-CO', { day: '2-digit' });
  const mes = fecha.toLocaleDateString('es-CO', { month: 'long' });
  const anio = fecha.toLocaleDateString('es-CO', { year: 'numeric' });

  return `${mes} ${dia}, ${anio}`;
}

export default async function blogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  const { data: allBlogs } = await getAllProjects();
  const portfolioProjects = allBlogs.slice(0, 4);

  if (!blog) {
    notFound();
  }

  const fecha = formatDate(blog.publishedAt);
  const autor = blog.author?.name || 'Sin autor';

  return (
    <div className="w-full max-w-360 mx-auto  pt-28 pb-8" >

      <div className="px-6 md:px-8 mb-4">
        <h1 className="text-[28px] md:text-[52px] font-extralight pb-4">{blog.title}</h1>
        <span className="text-lg text-[#7A7F89] font-light mt-1">
          Por <span className="font-normal">{autor}</span> — {fecha}
        </span>
        <div className="flex flex-wrap gap-y-2 mt-4">
          {Array.isArray(blog.categorias) && blog.categorias.map((cat) => (
            <Link
                key={cat.slug}
                href={`/blog?categoria=${cat.slug}`}
                className={`border-1 rounded-[100px] px-3 py-[2px] text-sm text-[#7A7F89] bg-transparent border-[#D0D5DD]`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* <div className="px-6 md:px-8 mb-16">
        <ShareButtons
          url={`https://mooba.co/blog/${slug}`}
          title={blog.title}
        />
      </div> */}

      <div className="px-6 md:px-8">
        <div className="block">
          {blog.desktopContent && (
            <div className="w-full">
              <div className="max-w-none w-full">
                <SafeHtml html={htmlReplace(blog.desktopContent)} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-baseline px-6 md:px-8 mt-8 gap-x-4">
        <h3 className="text-md md:text-lg font-extralight">Temas relacionados:</h3>
        {Array.isArray(blog.blogTags) && blog.blogTags.map((tag) => (
          <span
              key={tag.id}
              className={`text-lg text-[#7A7F89] font-light mr-2`}
          >
            #{tag.tagName}
          </span>
        ))}
      </div>

      <div className="flex items-baseline justify-center px-6 md:px-8 mt-8 gap-x-4">
        <h3 className="text-md md:text-lg font-extralight pb-4">Comparte en:</h3>
        <ShareButtons
          url={`https://mooba.co/blog/${slug}`}
          title={blog.title}
        />
      </div>

      <div className="hidden md:block">
        <PortafolioHome title={'Ideas que se volvieron realidad'} projects={portfolioProjects} />
      </div>

      <ContactSection />

      {/* Debug Info */}
      {/* <details className="mt-12 p-4rounded-lg">
        <summary className="cursor-pointer font-medium text-sm text-gray-600 mb-2">
          Ver información de debug
        </summary>
        <pre className="text-xs p-3 rounded border overflow-auto">
          {JSON.stringify(project, null, 2)}
        </pre>
      </details> */}
    </div>
  );
}