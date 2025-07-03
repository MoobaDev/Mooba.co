import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // escoge los pesos que necesitas
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mooba",
  description: "Agencia de diseño y desarrollo web",
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
      </body>
    </html>
  );
}
