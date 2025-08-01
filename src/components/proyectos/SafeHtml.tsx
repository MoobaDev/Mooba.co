"use client";

import { useEffect, useRef } from "react";
import DOMPurify from "dompurify";

// Sanea solo en el navegador
const sanitize = (html: string) =>
  typeof window !== "undefined" ? DOMPurify.sanitize(html) : html;

export default function SafeHtml({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const videos = ref.current?.querySelectorAll("video");

  videos?.forEach((video) => {
    const hasSource = !!video.querySelector("source");

    if (!video.src && hasSource) {
      video.load(); // recarga si es necesario
    }

    // Esperar a que el video esté listo antes de hacer play
    const tryPlay = () => {
      video
        .play()
        .catch((err) => {
          console.warn("No se pudo hacer autoplay del video:", err);
        });
    };

    if (video.readyState >= 2) {
      tryPlay(); // video ya está listo
    } else {
      // Esperar el evento 'canplay' para asegurarse de que se pueda reproducir
      video.addEventListener("canplay", tryPlay, { once: true });
    }
  });
}, [html]);


  const clean = sanitize(html);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: clean }} />;
}
