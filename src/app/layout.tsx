import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Providers from "./providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"],
  display: "swap",
});

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
      <body className={`${dmSans.className} antialiased bg-black text-white`}>
        <Header />
        <main className="relative z-0">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
