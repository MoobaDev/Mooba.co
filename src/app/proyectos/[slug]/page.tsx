//import DOMPurify from 'dompurify';
//import { JSDOM } from 'jsdom';
import { notFound } from "next/navigation";
import "../../globals.css";
import { getProject } from "@/lib/getProject";

function addAutoplayToVideos(html: string) {
  // Para <video>: quita controls, asegura autoplay, muted y loop
  let result = html.replace(
    /<video([^>]*)>/g,
    (match, attrs) => {
      // Quita cualquier atributo controls, loop, autoplay, muted para evitar duplicados
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
  // Para iframes de Vimeo/YouTube: quita controles y agrega autoplay=1&loop=1
  result = result.replace(
    /<iframe([^>]+src=["'][^"']+)(vimeo\.com|youtube\.com|youtu\.be)([^"']*)["']/g,
    (match, beforeSrc, provider, afterSrc) => {
      // Quita controles, showinfo, modestbranding, loop, autoplay del src
      const newMatch = match.replace(/([?&])(controls|showinfo|modestbranding|autoplay|loop)=\d+/g, "");
      // Agrega autoplay=1 y loop=1 al src
      return newMatch.replace(
        /(src=["'][^"']*)(["'])/,
        (srcMatch, srcUrl, quote) => {
          const separator = srcUrl.includes("?") ? "&" : "?";
          return `${srcUrl}${separator}autoplay=1&loop=1${quote}`;
        }
      );
    }
  );
  return result;
}
// Elimina cualquier width y height. Agrega width="100%" al final
function fixImagesWidth(html: string) {
  return html.replace(
    /<img\b([^>]*)>/gi,
    (match, attrs) => {
      const newAttrs = attrs
        .replace(/\s*width\s*=\s*["'][^"']*["']/gi, "")
        .replace(/\s*height\s*=\s*["'][^"']*["']/gi, "");
      return `<img${newAttrs} width="100%">`;
    }
  );
}

/* function sanitizeHTML(dirty: string) {
  if (typeof window !== "undefined") {
    return DOMPurify.sanitize(dirty);
  }
  // En SSR, devuelve el HTML tal cual (o solo texto plano si quieres máxima seguridad)
  return dirty;
} */

/* DERKEN HTML: 
  const cleanHtml = product ? DOMPurify.sanitize(product.description) : "";
*/

export default async function projectPage({ params }: { params: { slug: string }}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full px-6 pt-28 pb-8" >

      <div className="mb-16">
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

      <div className="">
        <div className="hidden md:block">
          {project.desktopContent && (
            <div className="w-full">
              <div
                className="max-w-none w-full"
                dangerouslySetInnerHTML={{ __html: fixImagesWidth(addAutoplayToVideos(project.desktopContent)) }}
              />
            </div>
          )}
        </div>
        <div className="block md:hidden">
          {project.mobileContent && (
            <div className="w-full">
              <div
                className="max-w-none w-full"
                dangerouslySetInnerHTML={{ __html: fixImagesWidth(addAutoplayToVideos(project.mobileContent)) }}
              />
            </div>
          )}
        </div>
      </div>

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