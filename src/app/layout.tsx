import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Providers from "./providers";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Cursor from "@/components/layout/Cursor";
import Script from "next/script";
import { CursorProvider } from "@/context/cursor-context";
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

        {/* JSON-LD (SEO Estructurado) */}
        <Script
          id="ld-global"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://mooba.co/#organization",
                  name: "Mooba Agencia",
                  url: "https://mooba.co",
                  description:
                    "Agencia de marketing digital en Barranquilla. Branding, diseño UX/UI, desarrollo web y redes sociales.",
                  telephone: "+57 304 333 8350",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Barranquilla",
                    addressCountry: "CO",
                  },
                  sameAs: [
                    "https://www.instagram.com/moobaagencia/",
                    "https://www.linkedin.com/company/mooba-agencia/",
                    "https://www.behance.net/moobaagencia",
                  ],
                  logo: {
                    "@type": "ImageObject",
                    "@id": "https://mooba.co/#logo",
                    url: "https://api.mooba.co/uploads/logo_mooba_actualizado_a614d68076.png",
                    contentUrl:
                      "https://api.mooba.co/uploads/logo_mooba_actualizado_a614d68076.png",
                    caption: "Logo Mooba",
                    inLanguage: "es-CO",
                    width: "202",
                    height: "202",
                  },
                  serviceType: [
                    "Marketing Digital",
                    "Diseño Web",
                    "Redes Sociales",
                    "Branding",
                    "Diseño Gráfico",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://mooba.co/#website",
                  url: "https://mooba.co",
                  name: "Mooba Agencia",
                  inLanguage: "es-CO",
                  publisher: {
                    "@id": "https://mooba.co/#organization",
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://mooba.co/?s={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "WebPage",
                  "@id": "https://mooba.co#webpage",
                  url: "https://mooba.co",
                  name: "Mooba Agencia | Diseño, Branding y Marketing Digital",
                  datePublished: "2024-01-01T00:00:00-05:00",
                  dateModified: "2025-07-28T00:00:00-05:00",
                  about: {
                    "@id": "https://mooba.co/#organization",
                  },
                  isPartOf: {
                    "@id": "https://mooba.co/#website",
                  },
                  primaryImageOfPage: {
                    "@id": "https://mooba.co/#logo",
                  },
                  inLanguage: "es-CO",
                },
              ],
            }),
          }}
        />

        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W357F89Z');
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RJ5EJ9FPFH"
          strategy="afterInteractive"
        />
        <Script id="ga-setup" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RJ5EJ9FPFH');
          `}
        </Script>
      </head>

      <body className={`${dmSans.className} antialiased bg-black text-white cursor-none`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W357F89Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <CursorProvider>
          <Cursor />
          <ScrollToTop />
          <Header />
          <main className="relative z-0 pb-8">
            <Providers>{children}</Providers>
            <WhatsAppButton />
          </main>
          <Footer />
        </CursorProvider>
      </body>
    </html>
  );
}
