'use client'

import { useState, useEffect, useRef } from 'react'
import { submitNewsletterEmail } from '@/lib/getEmails'

const autocompleteCss = `
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px transparent inset !important;
    box-shadow: 0 0 0 30px transparent inset !important;
    -webkit-text-fill-color: white !important;
    background-color: transparent !important;
    background: transparent !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [hasAutofill, setHasAutofill] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const canSubmit = email && !error && !isPending

  const validateEmail = (email: string) => {
    if (!email) return "Este campo es requerido"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Ingresa un email válido"
    }
    return ''
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    const validationError = validateEmail(value)
    setError(validationError)
  }

  const handleSubmit = async () => {
    const validationError = validateEmail(email)
    if (validationError) {
      setError(validationError)
      return
    }
    setIsPending(true)
    setStatus('')
    try {
      const res = await submitNewsletterEmail(email)
      setStatus(res.message)
      if (res.success) {
        setEmail('')
        setError('')
      }
    } catch {
      setStatus('Ocurrió un error al suscribirse al newsletter.')
    } finally {
      setIsPending(false)
    }
  }
  useEffect(() => {
    const input = inputRef.current
    if (!input) return

    const checkAutofill = () => {
      const isAutofilled = input.matches?.(':-webkit-autofill') || false
      setHasAutofill(isAutofilled)
    }
    checkAutofill()
    const interval = setInterval(checkAutofill, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: autocompleteCss }} />
      <div className="flex flex-col">
        <p className="font-base text-[16px] mb-2">Suscríbete a nuestro newsletter</p>
        <div className="space-y-2">
          <div className="relative w-full min-w-[200px] md:min-w-[400px] mt-3">
            <label
              htmlFor="newsletter-email"
              className={`absolute left-0 top-2 text-gray-500 transition-all pointer-events-none ${
                email || isFocused || hasAutofill
                  ? "text-xs text-white -translate-y-4"
                  : "text-base text-gray-500 translate-y-0"
              }`}
            >
              Correo electrónico
            </label>
            <input
              ref={inputRef}
              type="email"
              id="newsletter-email"
              value={email}
              onBlur={() => setIsFocused(false)}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => handleEmailChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canSubmit) {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
              className={`peer w-full bg-transparent text-white placeholder-transparent border-0 border-b pt-2 focus:outline-none transition-colors ${
                error
                  ? "border-red-700 focus:border-red-500"
                  : "border-zinc-600 focus:border-white"
              }`}
              placeholder=" "
            />
          </div>
          {error && (
            <p className="text-red-700 text-xs font-extralight">
              {error}
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`bg-white text-black font-medium text-center px-4 py-3 md:py-2 mt-4 rounded-full text-[16px] md:text-[14px] w-full md:w-fit transition-colors ${
            !canSubmit
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:bg-gray-100"
          }`}
        >
          {isPending ? "Suscribiendo..." : "Suscribirme"}
        </button>

        {status && (
          <p className={`text-sm mt-2 font-extralight ${
            status.includes('éxito') || status.includes('exitoso') 
              ? 'text-green-400' 
              : status.includes('error') || status.includes('Error')
              ? 'text-red-400'
              : 'text-green-400'
          }`}>
            {status}
          </p>
        )}
      </div>
    </>
  )
}