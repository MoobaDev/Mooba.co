'use client'

import { ReactNode, MouseEvent, useEffect } from 'react'
import { useCursor } from '@/context/cursor-context'

interface HideCursorOnHoverProps {
  children: ReactNode
  onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void
}

export default function HideCursorOnHover({
  children,
  onMouseEnter,
  onMouseLeave,
}: HideCursorOnHoverProps) {
  const { setHidden } = useCursor()

  useEffect(() => {
    return () => {
      setHidden(false)
    }
  }, [setHidden])

  return (
    <div
      onMouseEnter={(e) => {
        setHidden(true)
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        setHidden(false)
        onMouseLeave?.(e)
      }}
      onClick={() => {
        setHidden(false)
      }}
    >
      {children}
    </div>
  )
}