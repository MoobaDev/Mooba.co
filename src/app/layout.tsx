import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Mooba Agencia - Marketing Digital, Diseño Web y Redes Sociales",
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
        className={`${dmSans.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
