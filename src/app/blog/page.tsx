import type { Metadata } from 'next'
import ContactSection from '@/components/home/ContactUs';
import { getSeo } from '@/lib/getSeo';
import "../globals.css";
import { getAllBlogs } from '@/lib/getAllBlogs';
import { getBlogCategories } from '@/lib/getBlogCategories';
//import Blogs from '@/components/blog/Blogs';
import AllBlogs from '@/components/blog/AllBlogs';
import Categories from '@/components/blog/Categories';

export async function generateMetadata(): Promise<Metadata> {
  const seoResponse = await getSeo('blog')

  if (!seoResponse) return {}

  const seo = seoResponse?.seo

  return {
    title: seo?.title || "Mooba | Blog",
    description: seo?.description || '',
    keywords: seo?.keywords,
    robots: seo?.metaRobots || 'index, follow',
    alternates: {
      canonical: `https://mooba.co/blog`,
    },
    openGraph: {
      title: seo?.title || "Mooba | Blog",
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.title || "Mooba | Blog",
      description: seo?.description || '',
      images: seo?.image?.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.image.url}`]
        : [],
    },
  }
}

export default async function blogPage() {

  const { data: blogs } = await getAllBlogs();
  const { data: categories } = await getBlogCategories();

  return (
    <div className="w-full max-w-360 mx-auto  pt-28 pb-8">

      <div className="mb-6 px-6 md:px-8">
        <h1 className="text-[28px] md:text-[52px] font-extralight">Blogs</h1>
      </div>

      <div
        className="w-screen relative left-1/2 -translate-x-1/2 mb-7"
        style={{
          height: "1px",
          backgroundColor: "#D0D5DD",
          transform: "scaleY(0.2)",
          transformOrigin: "top",
        }}
      ></div>

      <div className="px-6 md:px-8">
        <Categories categories={categories} />
      </div>

      <div className="px-6 md:px-8">
        <AllBlogs blogs={blogs} />
        {/* <Blogs blogs={blogs} /> */}
      </div>

      <ContactSection />
    </div>
  );
}