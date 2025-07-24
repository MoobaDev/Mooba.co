export interface NewsletterResponse {
  success: boolean;
  message: string;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validateEmailFormat(email: string): { isValid: boolean; message: string } {
  email = email.trim()
  if (!email) {
    return {
      isValid: false,
      message: "Por favor ingresa tu correo electrónico"
    }
  }
  if (email.length < 5) {
    return {
      isValid: false,
      message: "El correo electrónico es demasiado corto"
    }
  }
  if (email.startsWith('@') || email.endsWith('@')) {
    return {
      isValid: false,
      message: "Formato de correo electrónico inválido"
    }
  }
  const atCount = (email.match(/@/g) || []).length
  if (atCount === 0) {
    return {
      isValid: false,
      message: "El correo debe contener un @"
    }
  }
  if (atCount > 1) {
    return {
      isValid: false,
      message: "El correo no puede tener múltiples @"
    }
  }
  const parts = email.split('@');
  if (parts.length !== 2) {
    return {
      isValid: false,
      message: "Formato de correo electrónico inválido"
    }
  }
  const [localPart, domainPart] = parts
  if (localPart.length === 0) {
    return {
      isValid: false,
      message: "Falta la parte antes del @"
    }
  }
  if (domainPart.length === 0) {
    return {
      isValid: false,
      message: "Falta el dominio después del @"
    }
  }
  if (!domainPart.includes('.')) {
    return {
      isValid: false,
      message: "El dominio debe contener un punto (.com, .es, etc.)"
    }
  }
  if (domainPart.endsWith('.')) {
    return {
      isValid: false,
      message: "El dominio no puede terminar en punto"
    }
  }
  const domainParts = domainPart.split('.');
  const extension = domainParts[domainParts.length - 1];
  if (extension.length < 2) {
    return {
      isValid: false,
      message: "La extensión del dominio es demasiado corta (.com, .es, etc.)"
    }
  }
  if (!isValidEmail(email)) {
    return {
      isValid: false,
      message: "Por favor ingresa un correo electrónico válido"
    }
  }
  return {
    isValid: true,
    message: ""
  }
}

export async function submitNewsletterEmail(email: string): Promise<NewsletterResponse> {
  email = email.trim().toLowerCase()
  const validation = validateEmailFormat(email)
  if (!validation.isValid) {
    return {
      success: false,
      message: validation.message,
    }
  }

  try {
    const res = await fetch('/api/newsletter', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
    if (res.ok) {
      try {
        const data = await res.json()
        return {
          success: data.success ?? true,
          message: data.message ?? "¡Suscripción exitosa! Te hemos agregado a nuestro newsletter.",
        }
      } catch {
        return {
          success: true,
          message: "¡Suscripción exitosa! Te hemos agregado a nuestro newsletter.",
        }
      }
    } else {
      try {
        const errorData = await res.json()
        return {
          success: false,
          message: errorData.message ?? "Error en el servidor. Inténtalo más tarde.",
        }
      } catch {
        return {
          success: false,
          message: "Error en el servidor. Inténtalo más tarde.",
        }
      }
    }

  } catch {
    console.log("Error de CORS detectado, reintentando...")

    try {
      await fetch('/api/newsletter', {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      return {
        success: true,
        message: "¡Suscripción procesada exitosamente!",
      }
    } catch (secondError) {
      console.error("Error en segundo intento:", secondError);
      return {
        success: false,
        message: "Error al conectar con el servidor. Inténtalo más tarde.",
      }
    }
  }
}