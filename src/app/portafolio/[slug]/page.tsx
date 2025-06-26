interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProyectoPage({ params }: PageProps) {
  const { slug } = await params;
  
  return (
    <div>
      <p>Página del proyecto: {slug}</p>
    </div>
  );
}