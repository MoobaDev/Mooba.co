import { ArrowIcon } from "../../../Icons";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-8">
      <div className="w-full border-t border-white/30 my-6 md:hidden"></div>
      
      <div className="md:hidden flex flex-col items-start gap-6 w-full">
        <div className="flex flex-row gap-10 w-full">
          <div className="flex flex-col gap-2 text-[16px]">
            <p className="font-base">Barranquilla, CO</p>
            <p className="font-thin">Cra 61 # 64-27</p>
            <p className="font-thin">lamprea@mooba.co</p>
            <p className="font-thin">+57 304 3338350</p>
          </div>
        
          <div className="font-base text-[16px]">
            <p>Habla con nosotros</p>
            <p>o pregúntanos lo</p>
            <p>que quieras</p>
            <p className="flex flex-row font-thin mt-2  hover:underline">Contáctanos <ArrowIcon/> </p>
          </div>
        </div>
        
        <div className="items-start">
          <p className="font-base text-[16px] mb-2">Síguenos</p>
          <div className="flex flex-col gap-1">
            <p className="flex flex-row font-thin items-center gap-1 hover:underline">LinkedIn <ArrowIcon /></p>
            <p className="flex flex-row font-thin items-center gap-1  hover:underline">Instagram <ArrowIcon /></p>
            <p className="flex flex-row font-thin items-center gap-1  hover:underline">TikTok <ArrowIcon /></p>
            <p className="flex flex-row font-thin items-center gap-1  hover:underline">Behance <ArrowIcon /></p>
          </div>
        </div>
        
        <div className="flex flex-col w-full">
          <p className="font-base text-[16px] mb-2">Suscríbete a nuestro newsletter</p>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="bg-transparent border-b border-white/30 text-white placeholder-white/60 text-sm font-thin py-2 focus:outline-none focus:border-white/60 transition-colors min-w-[200px]"
          />
        </div>
        
        <div className="flex flex-col mt-6 items-center w-full">
          <Link href="/"> <Image src="/logofooter.svg" alt="Logo mooba footer" width={180} height={40} className="w-[311px] h-[74px] md:w-[437px] md:h-[103]"/></Link>
          <p className="text-[16px] font-base mt-6">© mooba 2025</p>
        </div>
      </div>
      
      <div className="hidden md:flex md:justify-between md:items-start">
        <div className="flex flex-col text-[16px]">
          <p className="font-base text-[20px]">Barranquilla, CO</p>
          <p className="font-thin">Cra 81 # 64-29</p>
          <p className="font-thin">lamprea@moobaco</p>
          <p className="font-thin">+57 304 3338350</p>
        </div>
        
        <div className="flex flex-col text-[16px]">
          <p className="text-[16px] font-base">Habla con nosotros o pregúntanos lo que quieras</p>
          <p className="flex flex-row font-thin items-center gap-1 hover:underline">Contáctanos <ArrowIcon /></p>
        </div>
        
        <div className="flex flex-col text-[16px]">
          <p className="font-base mb-2">Síguenos</p>
          <div className="flex flex-col gap-1">
            <Link href="https://www.linkedin.com/company/mooba-agencia/" target="_blank" rel="noopener noreferrer"><a className="flex flex-row font-thin items-center gap-1 hover:underline">LinkedIn <ArrowIcon /></a></Link>
            <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><a className="flex flex-row font-thin items-center gap-1 hover:underline">Instagram <ArrowIcon /></a></Link>
            <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><a className="flex flex-row font-thin items-center gap-1 hover:underline">TikTok <ArrowIcon /></a></Link>
            <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><a className="flex flex-row font-thin items-center gap-1 hover:underline">Behance <ArrowIcon /></a></Link>
          </div>
        </div>
        
        <div className="flex flex-col items-start">
          <p className="text-[16px] font-base mb-2">Suscríbete a nuestro newsletter</p>
          <input
              type="email"
              placeholder="Correo electrónico"
              className="bg-transparent border-b border-white/30 text-white placeholder-white/60 text-sm font-light py-2 focus:outline-none focus:border-white/60 transition-colors min-w-[400px]"
            />
          <div className="bg-white text-black px-4 py-2 mt-4 rounded-full text-sm">
            Suscríbeme
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex md:justify-end md:items-end md:mt-8">
        <div className="flex flex-row items-end justify-between w-full">
          <p className="text-[16px] font-base mt-2">© mooba 2025</p>
          <Link href="/"> <Image src="/logofooter.svg" alt="Logo mooba footer" width={180} height={40} className="w-[311px] h-[74px] md:w-[437px] md:h-[103]"/></Link>
        </div>
      </div>
    </footer>
  );
}