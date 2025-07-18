import { ContactFormData } from "@/types/contactFormTypes";

export async function submitContactForm(formData: ContactFormData) {
  console.log(process.env.STRAPI_API_TOKEN);
    const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/contact/submit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to submit contact form");
  }

  return response.json();
}
