// WhatsAppButton.tsx
'use client';

import Link from 'next/link';
import { WhatsAppIcon, WhatsAppIconDesktop } from "../ui/Icons";

export default function WhatsAppButton() {
  return (
    <Link
      href="https://api.whatsapp.com/send?phone=573043338350&text=%C2%A1Hola%2C%20Mooba!%20%F0%9F%91%8B%0A%F0%9F%9A%80%20Estoy%20interesado%2Fa%20en%20conocer%20m%C3%A1s%20sobre%20sus%20servicios."
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 md:h-10 md:w-50 gap-1 items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-white/30 hover:text-black"
      aria-label="Chatea con nosotros por WhatsApp"
    >
      <div className='md:hidden'>
        <WhatsAppIcon />
      </div>
      <div className='hidden md:block'>
        <WhatsAppIconDesktop />
      </div>
      <p className='hidden md:block text-[12px] font-medium'>¡Háblanos de tu proyecto!</p>
    </Link>
  );
}
