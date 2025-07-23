"use client";
import DOMPurify from 'dompurify';

// En entornos Next.js y Vite con ESM, `.default` no siempre apunta a la función directamente.
// Este workaround garantiza que funcione bien con ESM + SSR.
const sanitize = (html: string) =>
  typeof window !== "undefined" ? DOMPurify.sanitize(html) : html;

export default function SafeHtml({ html }: { html: string }) {
  const clean = sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
