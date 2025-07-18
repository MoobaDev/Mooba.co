//import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Providers from "./providers";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

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
      <head><link rel="icon" href="/favicon.png" sizes="any" /></head>
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
