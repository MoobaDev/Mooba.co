import type { Metadata } from 'next'
import { notFound } from "next/navigation";
import { getProject } from "@/lib/getProject";
import "../../globals.css";
import SafeHtml from "@/components/proyectos/SafeHtml";
import PortafolioHome from '@/components/home/PortafolioHome';
import { getAllProjects } from '@/lib/getAllProyects';
import ContactSection from '@/components/home/ContactUs';
import { getSeoProject } from '@/lib/getSeoProject';
import Link from 'next/link';

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getSeoProject(slug);

  if (!project) return {}

  const seo = project.seo

  return {
    title: seo?.title || project.title,
    description: seo?.description || '',
    keywords: seo?.keywords,
    robots: seo?.metaRobots || 'index, follow',
    alternates: {
      canonical: `https://mooba.co/proyectos/${slug}`,
    },
    openGraph: {
      title: seo?.title || project.title,
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.title || project.title,
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
  }
}

export default async function projectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  const { data: allProjects } = await getAllProjects();
  const portfolioProjects = allProjects.slice(0, 4);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full max-w-360 mx-auto  pt-28 pb-8" >

      <div className="mb-16 px-6 md:px-8">
        <h1 className="text-[28px] md:text-[52px] font-extralight pb-2">{project.title}</h1>
        <div className="flex flex-wrap gap-y-2">
          {Array.isArray(project.categorias) && project.categorias.map((cat) => (
            <Link
                key={cat.slug}
                href={`/proyectos?categoria=${cat.slug}`}
                className={`border-1 rounded-[100px] px-3 py-[2px] text-sm text-[#7A7F89] bg-transparent border-[#D0D5DD]`}
            >
                {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-8">
        <div className="block">
          {project.desktopContent && (
            <div className="w-full">
              <div className="max-w-none w-full">
                <SafeHtml html={htmlReplace(project.desktopContent)} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hidden md:block">
        <PortafolioHome projects={portfolioProjects} />
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