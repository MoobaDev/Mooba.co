'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HamburgerIcon, ArrowIcon, CloseIcon } from "../../../Icons";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  

  return (
    <header className={`sticky top-0 z-50 px-6 transition-all duration-300 ${ scrolled ? "bg-black/30 backdrop-blur-md shadow-md px-4 py-3 my-10 rounded-full mx-4 md:my-15 md:mx-50" : "bg-transparent py-6" }`}>
        <div id="navbar-desktop" className="flex justify-between items-center">
            <Link href="/"> <Image src="/logo.svg" alt="Logo mooba" width={130} height={40} className="w-[120px] h-[30] md:w-[130px] md:h-[40]"/></Link>
            <button onClick={() => setMobileOpen(true)} className="md:hidden" aria-label="Abrir menú">
            <HamburgerIcon />
            </button>

            <nav className="hidden md:flex gap-10 text-[14px]">
            <span>Proyectos</span>
            <div className="relative group flex flex-col gap-2">
                <span className="">Servicios</span>
                <ul className="absolute top-full mt-1 hidden bg-black/30 backdrop-blur-md group-hover:flex flex-col gap-1 text-[14px]  text-white p-4 rounded">
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

        <section id="mobile-menu" className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-md text-white px-6 py-6 transform transition-transform duration-500 md:hidden ${ mobileOpen ? "translate-x-0" : "translate-x-full" }`}>
            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center max-w-7xl">
                        <Link href="/"> <Image src="/logo2.svg" alt="Logo mooba" width={120} height={30} /></Link>
                        <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="w-full border-t border-white/30 my-6"></div>
                </div>

                <nav className="flex">
                    <ul className="flex flex-col gap-2">
                        <li className="text-[32px] font-medium">Proyectos</li>
                        <li className="flex flex-col gap-2">
                        <span className="text-[32px] font-medium">Servicios</span>
                        <ul className="flex flex-col text-[18px] font-extralight gap-3">
                            <li>Branding</li>
                            <li>Diseño web & Desarrollo</li>
                            <li>Marketing Digital</li>
                            <li>Contenido Audiovisual</li>
                            <li>Campañas Publicitarias</li>
                        </ul>
                        </li>
                        <li className="text-[32px] font-medium">Nuestra esencia</li>
                        <li className="text-[32px] font-medium">Contáctanos</li>
                    </ul>
                </nav>

                <div className="flex flex-col">
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
                </div>
            </div>
        </section>
    </header>
  );
}