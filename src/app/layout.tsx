import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mooba - Coming Soon",
  description: "Algo increíble está por llegar. Mantente atento para el lanzamiento de Mooba.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
