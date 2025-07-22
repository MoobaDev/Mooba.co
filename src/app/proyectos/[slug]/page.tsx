import type { Metadata } from 'next'
import { notFound } from "next/navigation";
import { getProject } from "@/lib/getProject";
import "../../globals.css";
import SafeHtml from "@/components/proyectos/SafeHtml";
import PortafolioHome from '@/components/home/PortafolioHome';
import { getAllProjects } from '@/lib/getAllProyects';
import ContactSection from '@/components/home/ContactUs';

function htmlReplace(html: string) {
  // Para <video>: quita controls, asegura autoplay, muted y loop
  let replaceResult = html.replace(
    /<video([^>]*)>/g,
    (match, attrs) => {
      let newAttrs = attrs
        .replace(/\s*controls\b/gi, "")
        .replace(/\s*autoplay\b/gi, "")
        .replace(/\s*muted\b/gi, "")
        .replace(/\s*loop\b/gi, "");
      // Agrega autoplay, muted y loop
      newAttrs += " autoplay muted loop";
      return `<video${newAttrs}>`;
    }
  );
  // Para <iframes> de Vimeo/YouTube: quita controles y agrega autoplay=1&loop=1
  replaceResult = replaceResult.replace(
    /<iframe([^>]+src=["'][^"']+)(vimeo\.com|youtube\.com|youtu\.be)([^"']*)["']/g,
    (match) => {
      const newMatch = match.replace(/([?&])(controls|showinfo|modestbranding|autoplay|loop)=\d+/g, "");
      return newMatch.replace(
        /(src=["'][^"']*)(["'])/,
        (srcMatch, srcUrl, quote) => {
          const separator = srcUrl.includes("?") ? "&" : "?";
          return `${srcUrl}${separator}autoplay=1&loop=1${quote}`;
        }
      );
    }
  );
  // Elimina cualquier width y height. Agrega width="100%" al final
  replaceResult = replaceResult.replace(
    /<img\b([^>]*)>/gi,
    (match, attrs) => {
      const newAttrs = attrs
        .replace(/\s*width\s*=\s*["'][^"']*["']/gi, "")
        .replace(/\s*height\s*=\s*["'][^"']*["']/gi, "");
      return `<img${newAttrs} width="100%">`;
    }
  );
  return replaceResult
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const project = await getProject(slug);

  if (!project) return {}

  const seo = project.seo

  return {
    title: seo?.title || project.title,
    description: seo?.description || '',
    keywords: seo?.keywords,
    robots: seo?.metaRobots || 'index, follow',
    alternates: {
      canonical: `https://mooba.co/proyectos`,
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

export default async function projectPage({ params }: { params: { slug: string }}) {
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
            <div
                key={cat.slug}
                className={`border-1 rounded-[100px] px-3 py-[2px] text-sm text-[#7A7F89] bg-transparent border-[#D0D5DD]`}
            >
                {cat.name}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-8">
        <div className="hidden md:block">
          {project.desktopContent && (
            <div className="w-full">
              <div className="max-w-none w-full">
                <SafeHtml html={htmlReplace(project.desktopContent)} />
              </div>
            </div>
          )}
        </div>
        <div className="block md:hidden">
          {project.mobileContent && (
            <div className="w-full">
              <div className="max-w-none w-full">
                <SafeHtml html={htmlReplace(project.mobileContent)} />
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