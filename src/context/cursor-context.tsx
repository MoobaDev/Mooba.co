'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

type CursorContextType = {
  hidden: boolean
  setHidden: (value: boolean) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setHidden(false)
  }, [pathname])

  return (
    <CursorContext.Provider value={{ hidden, setHidden }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error('useCursor debe usarse dentro de <CursorProvider>')
  }
  return context
}