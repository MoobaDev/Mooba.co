import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mooba',
  description: 'Sitio web de Mooba',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}