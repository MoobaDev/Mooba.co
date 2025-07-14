import { ArrowIcon } from "../ui/Icons";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "./InputEmail"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="w-full border-t border-white/30 my-6"></div>
      
      <div className="md:hidden flex flex-col items-start gap-6 w-full mx-auto px-6 md:px-8 overflow-hidden">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col gap-2 text-[16px]">
            <p className="font-normal">Barranquilla, CO</p>
            <p className="font-extralight">blugo@mooba.co</p>
            <p className="font-extralight">+57 304 3338350</p>
          </div>
        
          <div className="font-base text-[16px]">
            <p>Habla con nosotros</p>
            <p>o pregúntanos lo</p>
            <p>que quieras</p>
            <Link href="/" className="flex flex-row font-extralight mt-2  hover:underline">Contáctanos <ArrowIcon/> </Link>
          </div>
        </div>
        
        <div className="items-start">
          <p className="font-base text-[16px] mb-2">Síguenos</p>
          <div className="flex flex-col gap-1">
            <Link  href="https://www.linkedin.com/company/mooba-agencia/"  target="_blank" rel="noopener noreferrer" className="flex flex-row font-extralight items-center gap-1 hover:underline"> LinkedIn <ArrowIcon /></Link>
            <Link href="https://www.instagram.com/moobaagencia?igsh=MWkxOXBkZnM5dW1qYQ==" target="_blank" rel="noopener noreferrer" className="flex flex-row font-extralight items-center gap-1 hover:underline">Instagram <ArrowIcon /> </Link>
            <Link href="https://www.tiktok.com/@agencia.mooba?_t=ZS-8xpXxG2jSq8&_r=1" target="_blank" rel="noopener noreferrer" className="flex flex-row font-extralight items-center gap-1 hover:underline">TikTok <ArrowIcon /></Link>
            <Link href="https://www.behance.net/moobaagencia" target="_blank" rel="noopener noreferrer" className="flex flex-row font-extralight items-center gap-1 hover:underline">Behance <ArrowIcon /></Link>
          </div>
        </div>
        
        <div className="flex flex-col w-full">
        <NewsletterForm/>
        </div>
        
        <div className="flex flex-col mt-6 items-center w-full md:flex-row md:items-end md:justify-between">
          <Link href="/"> <Image src="/logofooter.svg" alt="Logo mooba footer" width={180} height={40} className="w-[311px] h-[74px] md:w-[437px] md:h-[103]"/></Link>
          <p className="text-[16px] font-base mt-6">© mooba 2025</p>
        </div>
      </div>
      
      <div className="hidden md:flex md:justify-between gap-5 mx-auto px-6 md:px-8 overflow-hidden pt-4 md:items-start">
        <div className="flex flex-col text-[16px] gap-1">
          <p className="font-normal text-[20px]">Barranquilla, CO</p>
          <p className="font-extralight">blugo@mooba.co</p>
          <p className="font-extralight">+57 304 333 8350</p>
        </div>
        
        <div className="flex flex-col text-[16px] gap-1">
          <p className="text-[16px] font-normal">Habla con nosotros o pregúntanos lo que quieras</p>
          <p className="flex flex-row font-extralight items-center gap-1 hover:underline">Contáctanos <ArrowIcon /></p>
        </div>
        
        <div className="flex flex-col text-[16px]">
          <p className="font-base mb-2">Síguenos</p>
          <div className="flex flex-col gap-1">
            <Link  href="https://www.linkedin.com/company/mooba-agencia/"  target="_blank" rel="noopener noreferrer" className="flex flex-row font-extralight items-center gap-1 hover:underline"> LinkedIn <ArrowIcon /></Link>
            <Link href="https://www.instagram.com/moobaagencia?igsh=MWkxOXBkZnM5dW1qYQ==" target="_blank" rel="noopener noreferrer" className="flex flex-row font-extralight items-center gap-1 hover:underline">Instagram <ArrowIcon /> </Link>
            <Link href="https://www.tiktok.com/@agencia.mooba?_t=ZS-8xpXxG2jSq8&_r=1" target="_blank" rel="noopener noreferrer" className="flex flex-row font-extralight items-center gap-1 hover:underline">TikTok <ArrowIcon /></Link>
            <Link href="https://www.behance.net/moobaagencia" target="_blank" rel="noopener noreferrer" className="flex flex-row font-extralight items-center gap-1 hover:underline">Behance <ArrowIcon /></Link>
          </div>
        </div>
        
        <div className="flex flex-col">
          <NewsletterForm/>
        </div>
      </div>
      
      <div className="hidden mx-auto px-6 md:px-8 overflow-hidden md:flex md:justify-end md:items-end md:mt-8">
        <div className="flex flex-row items-end justify-between w-full">
          <p className="text-[16px] font-base mt-2">© mooba 2025</p>
          <Link href="/"> <Image src="/logofooter.svg" alt="Logo mooba footer" width={180} height={40} className="w-[311px] h-[74px] md:w-[437px] md:h-[103]"/></Link>
        </div>
      </div>
    </footer>
  );
}