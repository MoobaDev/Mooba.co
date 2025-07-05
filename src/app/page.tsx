import Image from "next/image";


export default function HomePage() {
  return (
    <div className="relative w-full h-screen flex flex-col">
      <Image src="/fondo.jpg" alt="Logo mooba" fill className="object-cover" />
    </div>
  );
}