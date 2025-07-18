export interface NewsletterResponse {
    success: boolean;
    message: string;
  }
  
  export async function submitNewsletterEmail(email: string): Promise<NewsletterResponse> {
    if (!email || !email.includes("@")) {
      return {
        success: false,
        message: "Correo inválido",
      };
    }
  
    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbytsNWbxD4LEBbRN3XRERGwO6nDICDyTsEgtzuW9grFrDr3OXqxn-aOGcYbpWdkW1sD/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await res.json();
  
      return {
        success: data.success ?? false,
        message: data.message ?? "Sin mensaje del servidor",
      };
    } catch (error) {
      console.error("Error al suscribir email:", error);
      return {
        success: false,
        message: "Error al conectar con el servidor",
      };
    }
  }
  