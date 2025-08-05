'use client'

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { HamburgerIcon, ArrowIcon, CloseIcon } from "../ui/Icons"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { easeOut } from "framer-motion"
import Lottie from "lottie-react"
import logo from '../../../public/logo.json'

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mobileServiciosOpen, setMobileServiciosOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const router = useRouter()
    const [showDropdown, setShowDropdown] = useState(false)
    const serviciosRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLUListElement>(null)
    const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 })
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        if (serviciosRef.current) {
            const rect = serviciosRef.current.getBoundingClientRect()
            setDropdownPosition({
                left: rect.left,
                top: rect.bottom 
            })
            setShowDropdown(true)
        }
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowDropdown(false)
        }, 100)
    }

    const handleDropdownMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
    }

    const handleDropdownMouseLeave = () => {
        setShowDropdown(false)
    }

    const handleNavigate = (url: string) => {
        setMobileOpen(false)
        setMobileServiciosOpen(false)
        setShowDropdown(false)
        router.push(url)
    }

    const listVariants = {
        hidden: {},
        visible: {
        transition: {
            staggerChildren: 0.1,
        },
        },
        exit: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
        },
    }
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: easeOut
        },
        },
        exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.4,
        },
        },
    }

    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        if (showDropdown && serviciosRef.current) {
            const rect = serviciosRef.current.getBoundingClientRect()
            setDropdownPosition({
                left: rect.left,
                top: rect.bottom
            })
        }
    }, [scrolled, showDropdown])

    useEffect(() => {
        if (mobileOpen) {
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'
        } else {
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
        }
    }, [mobileOpen])

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return (
        <>
        {showDropdown && (
        <ul
            ref={dropdownRef}
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
            className="fixed z-[99] bg-black/30 backdrop-blur-md text-white p-4 rounded-lg flex flex-col font-medium gap-2 whitespace-nowrap text-[14px] shadow-lg"
            style={{
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                transform: 'translateY(0)'
            }}>
            <li onClick={() => handleNavigate('/servicios/branding')} className="hover:underline hover:cursor-pointer">Branding</li>
            <li onClick={() => handleNavigate('/servicios/diseno-y-desarrollo')} className="hover:underline hover:cursor-pointer">Diseño UX/UI & Desarrollo</li>
            <li onClick={() => handleNavigate('/servicios/marketing-digital')} className="hover:underline hover:cursor-pointer">Marketing Digital</li>
            <li onClick={() => handleNavigate('/servicios/contenido-audiovisual')} className="hover:underline hover:cursor-pointer">Contenido Audiovisual</li>
            <li onClick={() => handleNavigate('/servicios/campanas-publicitarias')} className="hover:underline hover:cursor-pointer">Campañas Publicitarias</li>
        </ul>
        )}

        <>
        {!scrolled && (
            <div className="fixed top-0 left-0 z-[51] px-6 py-6 md:px-8 pointer-events-none">
                <div className="w-[120px] h-[30] md:w-[130px] md:h-[40]" >
                    <Link href="/" className="cursor-pointer pointer-events-auto">
                        <Lottie 
                            animationData={logo}
                            loop={true}
                            autoplay={true}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Link>
                </div>
            </div>
        )}

        <header className={`fixed top-0 left-0 right-0 z-50 px-6 transition-[background-color,backdrop-filter,padding,margin,border-radius] isolate duration-300 ${mobileOpen ? 'hidden' : ''} ${scrolled ? "bg-black/30 backdrop-blur-md px-4 py-3 my-10 rounded-full border border-neutral-400/30 mx-4 md:mx-10 md:my-15 lg:mx-30 xl:mx-50" : "bg-transparent py-6 mx-auto px-6 md:px-8 overflow-hidden mix-blend-difference"}`}>
            <div id="navbar-desktop" className="flex justify-between items-center">
                <div className="w-[120px] h-[30] md:w-[130px] md:h-[40]">
                    <Link href="/" className={`cursor-pointer ${!scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <Lottie 
                            animationData={logo}
                            loop={true}
                            autoplay={true}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Link>
                </div>
                
                <button onClick={() => setMobileOpen(true)} className="lg:hidden cursor-pointer" aria-label="Abrir menú">
                    <HamburgerIcon />
                </button>
                
                <nav className="hidden lg:flex gap-10 font-medium text-[14px] items-center">
                    <div 
                        className="relative" 
                        ref={serviciosRef} 
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className="hover:underline cursor-pointer py-2 block">Servicios</span>
                    </div>
                    <Link href="/proyectos" className="hover:underline cursor-pointer py-2 block">Proyectos</Link>
                    <Link href="/nuestra-esencia" className="hover:underline cursor-pointer py-2 block">Nuestra esencia</Link>
                    <Link href="/blog" className="hover:underline cursor-pointer py-2 block">Blog</Link>
                    <Link href="/contactanos" className="hover:underline cursor-pointer py-2 block">Contáctanos</Link>
                </nav>
            </div>
        </header>
        </>

        <section id="mobile-menu" className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-md text-white px-6 py-6 transform transition-transform duration-500 lg:hidden ${ mobileOpen ? "translate-x-0" : "translate-x-full" }`}>
            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center max-w-7xl">
                        <button onClick={() => { setMobileOpen(false); router.push("/")}} aria-label="Ir al inicio" className="cursor-pointer w-[120px] h-[30]">
                            <Lottie 
                                animationData={logo}
                                loop={true}
                                autoplay={true}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </button>
                        <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú" className="cursor-pointer">
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="w-full border-t border-white/30 my-6"></div>
                </div>

                <nav className="flex" >
                    <ul className="flex flex-col gap-2">
                        <button onClick={() => handleNavigate('/proyectos')} className="text-[32px] font-normal hover:cursor-pointer text-left">Proyectos</button>
                        <li className="flex flex-col gap-1">
                            <button onClick={() => setMobileServiciosOpen(!mobileServiciosOpen)} className="text-[32px] font-normal hover:cursor-pointer text-left"> Servicios</button>
                            <AnimatePresence>
                                {mobileServiciosOpen && (
                                    <motion.ul variants={listVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col text-[18px] font-extralight gap-1.5">
                                    {[
                                        { label: "Branding", path: "/servicios/branding" },
                                        { label: "Diseño web & Desarrollo", path: "/servicios/diseno-y-desarrollo" },
                                        { label: "Marketing Digital", path: "/servicios/marketing-digital" },
                                        { label: "Contenido Audiovisual", path: "/servicios/contenido-audiovisual" },
                                        { label: "Campañas Publicitarias", path: "/servicios/campanas-publicitarias" },
                                    ].map((item, index) => (
                                        <motion.li key={index} variants={itemVariants} onClick={() => handleNavigate(item.path)} className="hover:cursor-pointer">
                                            {item.label}
                                        </motion.li>
                                    ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </li>
                        <button onClick={() => handleNavigate('/blog')} className="text-[32px] font-normal hover:cursor-pointer text-left">Blog</button>
                        <button onClick={() => handleNavigate('/nuestra-esencia')} className="text-[32px] font-normal hover:cursor-pointer text-left">Nuestra esencia</button>
                        <button onClick={() => handleNavigate('/contactanos')} className="text-[32px] font-normal hover:cursor-pointer text-left">Contáctanos</button>
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
    )
}