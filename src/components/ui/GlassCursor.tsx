'use client'

import { useEffect, useRef } from 'react'

type GlassCursorProps = {
  targetId: string
  label?: string
}

export default function GlassCursor({ targetId, label = 'Ver proyecto' }: GlassCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = document.getElementById(targetId)
    const cursor = cursorRef.current

    if (!target || !cursor) return

    const handleMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX - cursor.offsetWidth / 2}px`
      cursor.style.top = `${e.clientY - cursor.offsetHeight / 2}px`
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
      className="hidden pointer-events-none fixed z-50 px-4 py-3 rounded-full bg-black/40 backdrop-blur-md border border-neutral-400/30 flex items-center gap-2"
      style={{ minWidth: '120px', minHeight: '40px' }}
    >
      <span className="text-white text-base font-extralight whitespace-nowrap">{label}</span>
    </div>
  )
}