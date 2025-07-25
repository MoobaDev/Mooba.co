'use client'

import { useEffect, useState, useRef } from 'react'
import { useCursor } from '@/context/cursor-context'


export default function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 })
    const [clickRipples, setClickRipples] = useState<{ id: number; x: number; y: number }[]>([])
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
        const isTouch = window.matchMedia('(pointer: coarse)').matches
        setIsMobile(isTouch)
    }, [])
    if (isMobile || hidden) return null


    return (
        <div className='cursor-none'>
            <div className="pointer-events-none fixed z-[9999]" style={{ top: 0, left: 0, transform: `translate(${position.x - 8}px, ${position.y - 8}px)` }}>
                <div className="w-2 h-2 rounded-full bg-[#FFFFFF]" />
            </div>

            <div className="pointer-events-none fixed z-[9998]" style={{ top: 0, left: 0, transform: `translate(${circlePosition.x - 24}px, ${circlePosition.y - 24}px)` }}>
                <div className="w-10 h-10 rounded-full border border-[#FFFFFF] opacity-80" />
            </div>

            {clickRipples.map(ripple => (
                <div key={ripple.id} className="pointer-events-none fixed z-[9997]" style={{ top: 0, left: 0, transform: `translate(${ripple.x - 24}px, ${ripple.y - 24}px)`}}>
                    <div className="w-10 h-10 rounded-full border border-[#FFFFFF] animate-circle-grow"/>
                </div>
            ))}

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

                .animate-circle-grow {
                animation: circle-grow 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    )
}
