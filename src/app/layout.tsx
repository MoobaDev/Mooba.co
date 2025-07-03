import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mooba",
  description: "Plataforma de gestión de proyectos desarrollada con Next.js y Builder.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} antialiased bg-black text-white`}
      >
        {children}
        <Footer/>
      </body>
    </html>
  );
}