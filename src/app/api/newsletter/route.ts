export async function POST(req: Request) {
    const body = await req.json();
  
    const result = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(body),
    });
  
    const data = await result.json();
  
    if (!result.ok) {
      return new Response(JSON.stringify(data), { status: result.status });
    }
  
    return Response.json(data);
  }