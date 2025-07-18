export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  companyName: string;
  position: string;
  employeeCount: string;
  industry: string;
  service: string;
  projectDetails?: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}
