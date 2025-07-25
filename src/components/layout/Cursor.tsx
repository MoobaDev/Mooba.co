'use client'
import { useEffect, useState, useRef } from 'react'
import { useCursor } from '@/context/cursor-context'

export default function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 })
    const [clickRipples, setClickRipples] = useState<{ id: number; x: number; y: number }[]>([])
    const [mounted, setMounted] = useState(false)
    const animationRef = useRef<number | null>(null)
    const positionRef = useRef({ x: 0, y: 0 })
    const rippleIdRef = useRef(500)
    const [isMobile, setIsMobile] = useState(false)
    const { hidden } = useCursor()
    
    const move = (e: MouseEvent) => {
        const newPos = { x: e.clientX, y: e.clientY }
        setPosition(newPos)
        positionRef.current = newPos
    }
    
    const handleMouseDown = () => {
        const id = rippleIdRef.current++
        const newRipple = { id, x: positionRef.current.x, y: positionRef.current.y }
        setClickRipples(prev => [...prev, newRipple])
    
        setTimeout(() => {
            setClickRipples(prev => prev.filter(r => r.id !== id))
        }, 500)
    }
    
    useEffect(() => {
        setMounted(true)
        
        if (typeof window !== 'undefined' && window.innerWidth) {
            document.addEventListener('mousemove', move, { once: true })
        }
    
        window.addEventListener('mousemove', move)
        window.addEventListener('mousedown', handleMouseDown)
    
        return () => {
            window.removeEventListener('mousemove', move)
            window.removeEventListener('mousedown', handleMouseDown)
        }
    }, [])
  
    useEffect(() => {
        const animate = () => {
            setCirclePosition(prev => {
                const { x, y } = positionRef.current
                return {
                    x: prev.x + (x - prev.x) * 0.2,
                    y: prev.y + (y - prev.y) * 0.2,
                }
            })
            animationRef.current = requestAnimationFrame(animate)
        }
        animationRef.current = requestAnimationFrame(animate)
        return () => {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])
    useEffect(() => {
        if (!mounted) return
        const isTouch = window.matchMedia('(pointer: coarse)').matches
        setIsMobile(isTouch)
    }, [mounted])
    if (!mounted || isMobile || hidden) return null

    return (
        <>
            <div 
                className="pointer-events-none fixed z-[9999] cursor-none" 
                style={{ 
                    top: '0px', 
                    left: '0px', 
                    transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
                    mixBlendMode: 'difference'
                }}
            >
                <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            
            {/* Círculo que sigue al cursor */}
            <div 
                className="pointer-events-none fixed z-[9998]" 
                style={{ 
                    top: '0px', 
                    left: '0px', 
                    transform: `translate(${circlePosition.x - 24}px, ${circlePosition.y - 24}px)`,
                    mixBlendMode: 'difference'
                }}
            >
                <div className="w-10 h-10 rounded-full border border-white opacity-80" />
            </div>
            
            {/* Ondas de clic */}
            {clickRipples.map(ripple => (
                <div 
                    key={ripple.id} 
                    className="pointer-events-none fixed z-[9997]" 
                    style={{ 
                        top: '0px', 
                        left: '0px', 
                        transform: `translate(${ripple.x - 24}px, ${ripple.y - 24}px)`,
                        mixBlendMode: 'difference'
                    }}
                >
                    <div 
                        className="w-10 h-10 rounded-full border border-white"
                        style={{
                            animation: 'circle-grow 0.3s ease-out forwards'
                        }}
                    />
                </div>
            ))}
            
            {/* Estilos CSS globales */}
            <style jsx global>{`
                @keyframes circle-grow {
                    0% {
                        transform: scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .cursor-none {
                    cursor: none !important;
                }
            `}</style>
        </>
    )
}