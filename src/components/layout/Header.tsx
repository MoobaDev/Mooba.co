'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { HamburgerIcon, ArrowIcon, CloseIcon } from "../../../Icons";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileServiciosOpen, setMobileServiciosOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    const [showDropdown, setShowDropdown] = useState(false);
    const serviciosRef = useRef<HTMLDivElement>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });
    
    const handleMouseEnter = () => {
        if (serviciosRef.current) {
            const rect = serviciosRef.current.getBoundingClientRect();
            setDropdownPosition({
                left: rect.left,
                top: rect.bottom + 2
            });
            setShowDropdown(true);
        }
    }
    const handleMouseLeave = () => {
        setShowDropdown(false);
    }
    useEffect(() => {
        if (showDropdown && serviciosRef.current) {
            const rect = serviciosRef.current.getBoundingClientRect();
            setDropdownPosition({
                left: rect.left,
                top: rect.bottom + 2
            });
        }
    }, [scrolled, showDropdown]);

    return (
        <>
        {showDropdown && (
        <ul
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed z-[99] bg-black/30 backdrop-blur-md text-white p-4 rounded-lg flex flex-col gap-2 whitespace-nowrap text-[14px] "
            style={{ 
                top: `${dropdownPosition.top}px`, 
                left: `${dropdownPosition.left}px`,
                transform: 'translateY(0)'
            }}>
            <li className="hover:underline hover:cursor-pointer">Branding</li>
            <li className="hover:underline hover:cursor-pointer">Diseño web & Desarrollo</li>
            <li className="hover:underline hover:cursor-pointer">Marketing Digital</li>
            <li className="hover:underline hover:cursor-pointer">Contenido Audiovisual</li>
            <li className="hover:underline hover:cursor-pointer">Campañas Publicitarias</li>
        </ul>
        )}

        <header className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${ scrolled  ? "bg-black/30 backdrop-blur-md px-4 py-3 my-10 rounded-full mx-4 md:mx-10 md:my-15 lg:mx-30 xl:mx-50" : "bg-transparent py-6"}`}>
            <div id="navbar-desktop" className="flex justify-between items-center">
                <Link href="/" className="cursor-pointer">
                <Image src="/logo.svg" alt="Logo mooba" width={130} height={40} className="w-[120px] h-[30] md:w-[130px] md:h-[40]" />
                </Link>

                <button onClick={() => setMobileOpen(true)} className="md:hidden cursor-pointer" aria-label="Abrir menú">
                <HamburgerIcon />
                </button>

                <nav className="hidden md:flex gap-10 text-[14px]">
                    <div className="relative flex flex-col gap-2" ref={serviciosRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <span className="hover:underline cursor-pointer">Servicios</span>
                    </div>
                    <Link href="#" className="hover:underline cursor-pointer">Proyectos</Link>
                    <Link href="#" className="hover:underline cursor-pointer">Nuestra esencia</Link>
                    <Link href="#" className="hover:underline cursor-pointer">Contáctanos</Link>
                </nav>
            </div>
        </header>

        <section id="mobile-menu" className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-md text-white px-6 py-6 transform transition-transform duration-500 md:hidden ${ mobileOpen ? "translate-x-0" : "translate-x-full" }`}>
            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center max-w-7xl">
                        <Link href="/" className="cursor-pointer"> <Image src="/logo2.svg" alt="Logo mooba" width={120} height={30} /></Link>
                        <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú" className="cursor-pointer">
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="w-full border-t border-white/30 my-6"></div>
                </div>

                <nav className="flex">
                    <ul className="flex flex-col gap-2">
                        <Link href="#" className="text-[32px] font-normal hover:cursor-pointer">Proyectos</Link>
                        <li className="flex flex-col gap-2">
                            <button
                                onClick={() => setMobileServiciosOpen(!mobileServiciosOpen)}
                                className="text-[32px] font-normal hover:cursor-pointer text-left"
                            >
                                Servicios
                            </button>

                            {mobileServiciosOpen && (
                                <ul className="flex flex-col text-[18px] font-extralight gap-3">
                                <li className="hover:cursor-pointer">Branding</li>
                                <li className="hover:cursor-pointer">Diseño web & Desarrollo</li>
                                <li className="hover:cursor-pointer">Marketing Digital</li>
                                <li className="hover:cursor-pointer">Contenido Audiovisual</li>
                                <li className="hover:cursor-pointer">Campañas Publicitarias</li>
                                </ul>
                            )}
                            </li>

                        <Link href="#" className="text-[32px] font-normal hover:cursor-pointer">Nuestra esencia</Link>
                        <Link href="#" className="text-[32px] font-normal hover:cursor-pointer">Contáctanos</Link>
                    </ul>
                </nav>

                <div className="flex flex-col">
                    <div className="w-full border-t border-white/30 my-6"></div>
                    <div className="flex flex-col gap-2 justify-end">
                        <div className="flex flex-row gap-10">
                            <Link  href="https://www.linkedin.com/company/mooba-agencia/"  target="_blank" rel="noopener noreferrer" className="flex flex-row text-[20px] font-extralight items-center gap-1"> LinkedIn <ArrowIcon /></Link>
                            <Link href="https://www.tiktok.com/@agencia.mooba?_t=ZS-8xpXxG2jSq8&_r=1" target="_blank" rel="noopener noreferrer" className="flex flex-row text-[20px] font-extralight items-center gap-1">TikTok <ArrowIcon /></Link>
                        </div>
                        <div className="flex flex-row gap-10">
                            <Link href="https://www.instagram.com/moobaagencia?igsh=MWkxOXBkZnM5dW1qYQ==" target="_blank" rel="noopener noreferrer" className="flex flex-row  text-[20px] font-extralight items-center gap-1">Instagram <ArrowIcon /> </Link>
                            <Link href="https://www.behance.net/moobaagencia" target="_blank" rel="noopener noreferrer" className="flex flex-row text-[20px] font-extralight items-center gap-1">Behance <ArrowIcon /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}