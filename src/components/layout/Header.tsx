'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HamburgerIcon, ArrowIcon, CloseIcon } from "../../../Icons";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className=" bg-inherit sticky top-0 z-50 w-full py-6 px-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
            <Link href="/"> <Image src="/logo.svg" alt="Logo mooba" width={130} height={40} className="w-[100px] md:w-[130px] h-auto"/></Link>
            <button onClick={() => setMobileOpen(true)} className="md:hidden" aria-label="Abrir menú">
            <HamburgerIcon />
            </button>

            <nav className="hidden md:flex gap-10 text-[14px]">
            <span>Proyectos</span>
            <div className="relative group flex flex-col gap-2">
                <span className="">Servicios</span>
                <ul className="absolute top-full mt-1 hidden group-hover:flex flex-col gap-1 text-[18px] font-extralight bg-blur text-black p-4 rounded">
                <li>Branding</li>
                <li>Diseño web & Desarrollo</li>
                <li>Marketing Digital</li>
                <li>Contenido Audiovisual</li>
                <li>Campañas Publicitarias</li>
                </ul>
            </div>
            <span>Nuestra esencia</span>
            <span>Contáctanos</span>
            </nav>
        </div>

        <section id="mobile-menu" className={`${mobileOpen ? "flex" : "hidden"} fixed inset-0 backdrop-blur-md text-white z-50 flex-col px-6 py-6 md:hidden`}>
            <div className="flex justify-between items-center max-w-7xl">
            <Link href="/"> <Image src="/logo2.svg" alt="Logo mooba" width={110} height={20} /></Link>
            <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
                <CloseIcon />
            </button>
            </div>
            <div className="w-full border-t border-white/30 my-6"></div>

            <nav className="flex">
            <ul className="flex flex-col gap-2">
                <li className="text-[32px]">Proyectos</li>
                <li className="flex flex-col gap-2">
                <span className="text-[32px]">Servicios</span>
                <ul className="flex flex-col text-[18px] gap-3 font-extralight">
                    <li>Branding</li>
                    <li>Diseño web & Desarrollo</li>
                    <li>Marketing Digital</li>
                    <li>Contenido Audiovisual</li>
                    <li>Campañas Publicitarias</li>
                </ul>
                </li>
                <li className="text-[32px]">Nuestra esencia</li>
                <li className="text-[32px]">Contáctanos</li>
            </ul>
            </nav>

            <div className="w-full border-t border-white/30 my-6"></div>

            <div className="flex flex-col gap-2 justify-end">
            <div className="flex flex-row gap-10">
                <p className="flex flex-row justify-center text-xl font-extralight items-center gap-1">LinkedIn <ArrowIcon /></p>
                <p className="flex flex-row justify-center text-xl font-extralight items-center gap-1">Tiktok <ArrowIcon /></p>
            </div>
            <div className="flex flex-row gap-10">
                <p className="flex flex-row justify-center text-xl font-extralight items-center gap-1">Instagram <ArrowIcon /></p>
                <p className="flex flex-row justify-center text-xl font-extralight items-center gap-1">Behance <ArrowIcon /></p>
            </div>
            </div>
        </section>
    </header>
  );
}