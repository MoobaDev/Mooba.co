import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const authHeader = req.headers.get('authorization');

  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Revalidar manualmente las tags necesarias
    revalidateTag('allBlog');
    revalidateTag('allProjects');
    revalidateTag('blog');
    revalidateTag('blogCategories');
    revalidateTag('brands');
    revalidateTag('categories');
    revalidateTag('featuredProjects');
    revalidateTag('nosotrosInfo');
    revalidateTag('ourEssenceVideo');
    revalidateTag('project');
    revalidateTag('seo');
    revalidateTag('seoBlog');
    revalidateTag('seoProject');
    revalidateTag('services');
    revalidateTag('team');
    revalidateTag('videoHero');
    revalidateTag('servicesSection');
    revalidateTag('seoServices');
    revalidateTag('logoJson')

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json({ message: 'Error revalidating', error }, { status: 500 });
  }
}
