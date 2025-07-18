'use client';

import { useState } from 'react';
import { submitNewsletterEmail } from '@/lib/getEmails';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    const res = await submitNewsletterEmail(email);
    setStatus(res.message);
    if (res.success) setEmail('');
  };

  return (
    <div className="flex flex-col">
        <p className="font-base text-[16px] mb-2">Suscríbete a nuestro newsletter</p>
        <div className="relative w-full min-w-[200px] md:min-w-[400] mt-3">
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="peer bg-transparent border-b border-white/30 text-white placeholder-transparent text-sm font-extralight py-2 focus:outline-none focus:border-white/60 transition-colors w-full"
            />
            <label
            htmlFor="email"
            className="absolute left-0 top-2 text-white/60 text-sm font-extralight transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:top-[-0.6rem] peer-focus:text-xs peer-focus:text-white"
            >
            Correo electrónico
            </label>
        </div>
        <div
            onClick={handleSubmit}
            className="bg-white text-black font-medium text-center px-4 py-3  md:py-2 mt-4 rounded-full text-[16px] md:text-[14px] w-full md:w-fit cursor-pointer"
        >
            Suscribirme
        </div>
      {status && <p className="text-white text-sm mt-2">{status}</p>}
    </div>
  );
}
