import DOMPurify from 'dompurify';
//import { JSDOM } from 'jsdom';
import { notFound } from "next/navigation";
import Link from "next/link";

interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
}

interface Post {
  documentId: string;
  title: string;
  slug: string;
  description: string;
  contentHTML: string;
  contentMarkdown: string;
  image: StrapiImage[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiResponse {
  data: Post;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${process.env.STRAPI_API_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      return null;
    }
    const response: { data: Post[] } = await res.json();
    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

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

function sanitizeHTML(dirty: string) {
  if (typeof window !== "undefined") {
    return DOMPurify.sanitize(dirty);
  }
  // En SSR, devuelve el HTML tal cual (o solo texto plano si quieres máxima seguridad)
  return dirty;
}

/* DERKEN HTML: 
  const cleanHtml = product ? DOMPurify.sanitize(product.description) : "";
*/

export default async function PostPage({ params }: { params: { slug: string }}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full px-8 py-8 bg-black text-white" style={{ maxWidth: "100vw", boxSizing: "border-box" }}>
      {/* Navigation */}
      <div className="mb-8">
        <Link href="/proyectos" className="inline-flex items-center text-white-600 hover:underline mb-4">
          <span className="mr-2">&#8592;</span>
          Volver a posts
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="inline-block bg-gray-500 text-xs px-2 py-1 rounded">
            {new Date(post.publishedAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        {post.description && (
          <p className="text-lg text-gray-500 leading-relaxed">{post.description}</p>
        )}
      </header>

      <hr className="mb-8" />

      {/* HTML Content from Figma */}
      {/* {post.contentHTML && (
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Contenido HTML</h2>
          <div
            className="w-full"
            dangerouslySetInnerHTML={{ __html: addAutoplayToVideos(post.contentHTML) }}
          />
        </div>
      )} */}
      {post.contentHTML && (
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">Contenido HTML CKEditor</h2>
          <div
            className="max-w-none w-full"
            dangerouslySetInnerHTML={{ __html: addAutoplayToVideos(post.contentHTML) }}
          />
        </div>
      )}

      {/* Debug Info */}
      <details className="mt-12 p-4rounded-lg">
        <summary className="cursor-pointer font-medium text-sm text-gray-600 mb-2">
          Ver información de debug
        </summary>
        <pre className="text-xs p-3 rounded border overflow-auto">
          {JSON.stringify(post, null, 2)}
        </pre>
      </details>
    </div>
  );
}