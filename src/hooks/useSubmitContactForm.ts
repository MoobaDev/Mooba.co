import { useMutation } from '@tanstack/react-query';
import { submitContactForm } from '@/services/contactFormService';
import { ContactFormResponse, ContactFormData } from '@/types/contactFormTypes';

export function useSubmitContactForm() {
  return useMutation<ContactFormResponse, Error, ContactFormData>({
    mutationFn: (formData: ContactFormData) => submitContactForm(formData),
  });
}
