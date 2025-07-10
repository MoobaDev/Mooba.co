'use client'

import { useEffect, useRef } from 'react'

type GlassCursorProps = {
  targetId: string // ID del elemento sobre el que aparecerá el cursor
  label?: string   // Texto que mostrará la bolita (por defecto "Ver")
}

export default function GlassCursor({ targetId, label = '' }: GlassCursorProps) {
    const cursorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
            const target = document.getElementById(targetId)
            const cursor = cursorRef.current

            if (!target || !cursor) return

            const handleMove = (e: MouseEvent) => {
                cursor.style.left = `${e.clientX - 32}px`
                cursor.style.top = `${e.clientY - 32}px`
                cursor.classList.remove('hidden')
            }

            const handleLeave = () => {
                cursor.classList.add('hidden')
            }

            target.addEventListener('mousemove', handleMove)
            target.addEventListener('mouseleave', handleLeave)

            return () => {
                target.removeEventListener('mousemove', handleMove)
                target.removeEventListener('mouseleave', handleLeave)
            }
    }, [targetId])

    return (
        <div
            ref={cursorRef}
            className="hidden pointer-events-none fixed z-50 w-16 h-16 rounded-full bg-black/30 backdrop-blur-md 
                        text-center text-xs/3 text-white flex items-center justify-center transition-transform duration-75"
        >
            {label}
        </div>
    )
}
