import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Providers from "./providers";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Script from "next/script";
import ScrollToTop from "@/components/layout/ScrollToTop";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"],
  display: "swap",
});

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
                  image: "https://api.mooba.co/uploads/logo_mooba_actualizado_a614d68076.png",
                  telephone: "+57 304 333 8350",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Barranquilla",
                    addressCountry: "CO"
                  },
                  sameAs: [
                    "https://www.instagram.com/moobaagencia/",
                    "https://www.linkedin.com/company/mooba-agencia/"
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
        <ScrollToTop />
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
