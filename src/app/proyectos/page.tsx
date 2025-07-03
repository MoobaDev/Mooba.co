import Link from "next/link";
import "../globals.css";

interface StrapiImageFormat {
  url: string;
}
interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
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
  data: Post[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function getPosts(): Promise<StrapiResponse> {
  try {
    const res = await fetch(`${process.env.STRAPI_API_URL}/api/posts?populate=*`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      data: [],
      meta: {
        pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 },
      },
    };
  }
}

export default async function PortafolioPage() {

  const { data: posts } = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Posts from Strapi CMS</h1>
        <p className="text-gray-500">
          Contenido HTML generado desde Figma e inyectado con CKEditor
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No hay posts disponibles</h2>
          <p className="text-gray-500">
            Asegúrate de que tu servidor Strapi esté ejecutándose en localhost:1337
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.documentId}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col p-4"
            >
              {post.image?.length > 0 && (
                <div className="mb-4">
                  <img
                    src={`${process.env.STRAPI_API_URL}${
                      post.image?.[0]?.formats?.medium?.url ||
                      post.image?.[0]?.url
                    }`}
                    alt={post.image?.[0]?.alternativeText || post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="inline-block bg-gray-200 text-xs px-2 py-1 rounded">
                    {new Date(post.publishedAt).toLocaleDateString("es-ES")}
                  </span>
                  <Link
                    href={`/proyectos/${post.slug}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Ver post →
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