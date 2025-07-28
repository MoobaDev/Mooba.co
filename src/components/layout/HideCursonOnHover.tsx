'use client'

import { ReactNode } from 'react'
import { useCursor } from '@/context/cursor-context'

export default function HideCursorOnHover({ children }: { children: ReactNode }) {
  const { setHidden } = useCursor()

  return (
    <div
      onMouseEnter={() => setHidden(true)}
      onMouseLeave={() => setHidden(false)}
    >
      {children}
    </div>
  )
}
