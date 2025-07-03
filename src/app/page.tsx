import Image from "next/image";
import Header from "@/components/layout/Header";


export default function HomePage() {
  return (
    <div className="relative w-full h-screen flex flex-col">
      <Header/>
      <Image src="/fondo.jpg" alt="Logo mooba" fill className="object-cover" />
    </div>
  );
}