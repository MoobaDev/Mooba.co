import { ContactFormData } from "@/types/contactFormTypes";

export async function submitContactForm(formData: ContactFormData) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Error al enviar formulario');
  }

  return response.json();
}  