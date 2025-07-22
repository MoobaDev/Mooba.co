import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Providers from "./providers";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Script from "next/script";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"],
  display: "swap",
});

/* export const metadata: Metadata = {
  title: "Mooba Agencia - Marketing Digital, Diseño Web y Redes Sociales",
  description: "Plataforma de gestión de proyectos desarrollada con Next.js y Builder.io",
}; */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <Script
          id="ld-mooba"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://mooba.co/#website",
                  name: "Mooba Studio",
                  url: "https://mooba.co",
                  description: "Estudio creativo de branding, diseño web y estrategia digital.",
                  inLanguage: "es",
                  publisher: {
                    "@id": "https://mooba.co/#organization"
                  }
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://mooba.co/#organization",
                  name: "Mooba Studio",
                  description: "Agencia creativa especializada en branding, diseño UX/UI y desarrollo web.",
                  url: "https://mooba.co",
                  image: "https://mooba.co/icon.png", //reemplazar con logo
                  telephone: "+57 311 552 4314",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Barranquilla",
                    addressCountry: "CO"
                  },
                  sameAs: [
                    "https://www.instagram.com/mooba.studio",
                    "https://www.linkedin.com/company/moobastudio"
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${dmSans.className} antialiased bg-black text-white`}
      >
        <Header/>
          <main className="relative z-0">
            <Providers>{children}</Providers>
          </main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
