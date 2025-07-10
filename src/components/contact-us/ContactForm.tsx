"use client";

import { useForm } from "@tanstack/react-form";
import { ChevronDown } from "lucide-react";
import { useSubmitContactForm } from "../../hooks/useSubmitContactForm";

const countries = [
  "Argentina",
  "Bolivia",
  "Brasil",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Ecuador",
  "El Salvador",
  "Guatemala",
  "Honduras",
  "México",
  "Nicaragua",
  "Panamá",
  "Paraguay",
  "Perú",
  "República Dominicana",
  "Uruguay",
  "Venezuela",
];

const employeeCounts = [
  "1-10 empleados",
  "11-50 empleados",
  "51-100 empleados",
  "101-500 empleados",
  "500+ empleados",
];

const industries = [
  "Tecnología",
  "Salud",
  "Educación",
  "Finanzas",
  "Retail",
  "Manufactura",
  "Servicios",
  "Construcción",
  "Turismo",
  "Alimentación",
  "Otro",
];

const services = [
  "Branding",
  "Diseño web & Desarrollo",
  "Marketing Digital",
  "Contenido Audiovisual",
  "Campañas Publicitarias",
];

export default function ContactForm() {
  const { mutate, isPending, isError, isSuccess } = useSubmitContactForm();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      phone: "",
      companyName: "",
      position: "",
      employeeCount: "",
      industry: "",
      service: "",
      projectDetails: "",
    },
    onSubmit: async ({ value }) => {
      mutate(value, {
        onSuccess: () => {
          console.log("Form submitted successfully");
          form.reset();
        },
        onError: (error) => {
          console.error("Error submitting form:", error);
        },
      });
    },
  });

  return (
    <div className="container mx-auto font-normal text-base w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        {/* First Row - Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form.Field
            name="firstName"
            validators={{
              onChange: ({ value }) =>
                !value ? "Este campo es requerido" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <div className="relative">
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Nombre"
                    className={`w-full bg-transparent text-white placeholder-gray-500 border-0 border-b  pb-2 focus:outline-none transition-colors ${
                      field.state.meta.errors.length > 0
                        ? "border-red-700 focus:border-red-500"
                        : "border-zinc-600 focus:border-white"
                    }`}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="absolute right-0 top-0 w-5 h-5 bg-red-700 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">!</span>
                    </div>
                  )}
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-700 text-xs font-extralight">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="lastName"
            validators={{
              onChange: ({ value }) =>
                !value ? "Este campo es requerido" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <div className="relative">
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Apellido"
                    className={`w-full bg-transparent text-white placeholder-gray-500 border-0 border-b  pb-2 focus:outline-none transition-colors ${
                      field.state.meta.errors.length > 0
                        ? "border-red-700 focus:border-red-500"
                        : "border-zinc-600 focus:border-white"
                    }`}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="absolute right-0 top-0 w-5 h-5 bg-red-700 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">!</span>
                    </div>
                  )}
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-700 text-xs font-extralight">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </div>

        {/* Second Row - Email and Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "Este campo es requerido";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  return "Ingresa un email válido";
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <div className="relative">
                  <input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Correo electrónico"
                    className={`w-full bg-transparent text-white placeholder-gray-500 border-0 border-b  pb-2 focus:outline-none transition-colors ${
                      field.state.meta.errors.length > 0
                        ? "border-red-700 focus:border-red-500"
                        : "border-zinc-600 focus:border-white"
                    }`}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="absolute right-0 top-0 w-5 h-5 bg-red-700 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">!</span>
                    </div>
                  )}
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-700 text-xs font-extralight">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="country"
            validators={{
              onChange: ({ value }) =>
                !value ? "Este campo es requerido" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <div className="relative">
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`w-full bg-transparent ${
                      field.state.value ? "text-white" : "text-gray-500"
                    } border-0 border-b pb-2 focus:outline-none transition-colors appearance-none cursor-pointer ${
                      field.state.meta.errors.length > 0
                        ? "border-red-700 focus:border-red-500"
                        : "border-zinc-600 focus:border-white"
                    }`}
                  >
                    {field.state.value === "" && (
                      <option value="" disabled hidden>
                        País
                      </option>
                    )}
                    {countries.map((country) => (
                      <option
                        key={country}
                        value={country}
                        className="bg-black text-white"
                      >
                        {country}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-0 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-700 text-xs font-extralight">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </div>

        {/* Third Row - Phone and Company Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form.Field
            name="phone"
            validators={{
              onChange: ({ value }) =>
                !value ? "Este campo es requerido" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <div className="relative">
                  <input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Celular"
                    className={`w-full bg-transparent text-white placeholder-gray-500 border-0 border-b pb-2 focus:outline-none transition-colors ${
                      field.state.meta.errors.length > 0
                        ? "border-red-700 focus:border-red-500"
                        : "border-zinc-600 focus:border-white"
                    }`}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="absolute right-0 top-0 w-5 h-5 bg-red-700 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">!</span>
                    </div>
                  )}
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-700 text-xs font-extralight">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="companyName"
            validators={{
              onChange: ({ value }) =>
                !value ? "Este campo es requerido" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <div className="relative">
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Nombre de la empresa"
                    className={`w-full bg-transparent text-white placeholder-gray-500 border-0 border-b  pb-2 focus:outline-none transition-colors ${
                      field.state.meta.errors.length > 0
                        ? "border-red-700 focus:border-red-500"
                        : "border-zinc-600 focus:border-white"
                    }`}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="absolute right-0 top-0 w-5 h-5 bg-red-700 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">!</span>
                    </div>
                  )}
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-700 text-xs font-extralight">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </div>

        {/* Fourth Row - Position and Employee Count */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form.Field
            name="position"
            validators={{
              onChange: ({ value }) =>
                !value ? "Este campo es requerido" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <div className="relative">
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Cargo /Ocupación"
                    className={`w-full bg-transparent text-white placeholder-gray-500 border-0 border-b  pb-2 focus:outline-none transition-colors ${
                      field.state.meta.errors.length > 0
                        ? "border-red-700 focus:border-red-500"
                        : "border-zinc-600 focus:border-white"
                    }`}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="absolute right-0 top-0 w-5 h-5 bg-red-700 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">!</span>
                    </div>
                  )}
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-700 text-xs font-extralight">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="employeeCount"
            validators={{
              onChange: ({ value }) =>
                !value ? "Este campo es requerido" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <div className="relative">
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`w-full bg-transparent ${
                      field.state.value ? "text-white" : "text-gray-500"
                    } border-0 border-b pb-2 focus:outline-none transition-colors appearance-none cursor-pointer ${
                      field.state.meta.errors.length > 0
                        ? "border-red-700 focus:border-red-500"
                        : "border-zinc-600 focus:border-white"
                    }`}
                  >
                    {field.state.value === "" && (
                      <option value="" disabled hidden>
                        Cantidad de empleados en tu empresa
                      </option>
                    )}
                    {employeeCounts.map((count) => (
                      <option
                        key={count}
                        value={count}
                        className="bg-black text-white"
                      >
                        {count}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-0 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-700 text-xs font-extralight">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </div>

        {/* Fifth Row - Industry and Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form.Field
            name="industry"
            validators={{
              onChange: ({ value }) =>
                !value ? "Este campo es requerido" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <div className="relative">
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`w-full bg-transparent ${
                      field.state.value ? "text-white" : "text-gray-500"
                    } border-0 border-b pb-2 focus:outline-none transition-colors appearance-none cursor-pointer ${
                      field.state.meta.errors.length > 0
                        ? "border-red-700 focus:border-red-500"
                        : "border-zinc-600 focus:border-white"
                    }`}
                  >
                    {field.state.value === "" && (
                      <option value="" disabled hidden>
                        Sector o industria
                      </option>
                    )}
                    {industries.map((industry) => (
                      <option
                        key={industry}
                        value={industry}
                        className="bg-black text-white"
                      >
                        {industry}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-0 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-700 text-xs font-extralight">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="service"
            validators={{
              onChange: ({ value }) =>
                !value ? "Este campo es requerido" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <div className="relative">
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`w-full bg-transparent ${
                      field.state.value ? "text-white" : "text-gray-500"
                    } border-0 border-b pb-2 focus:outline-none transition-colors appearance-none cursor-pointer ${
                      field.state.meta.errors.length > 0
                        ? "border-red-700 focus:border-red-500"
                        : "border-zinc-600 focus:border-white"
                    }`}
                  >
                    {field.state.value === "" && (
                      <option value="" disabled hidden>
                        Servicio que te interesa
                      </option>
                    )}
                    {services.map((service) => (
                      <option
                        key={service}
                        value={service}
                        className="bg-black text-white"
                      >
                        {service}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-0 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-700 text-xs font-extralight">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </div>

        {/* Project Details */}
        <form.Field name="projectDetails">
          {(field) => (
            <div className="space-y-2">
              <div className="relative">
                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                  placeholder="Detalles del proyecto (Opcional)"
                  rows={1}
                  className="w-full bg-transparent text-white placeholder-gray-500 border-0 border-b border-zinc-700 focus:border-white pb-2 focus:outline-none transition-colors resize-none overflow-hidden min-h-[2.5rem]"
                />
              </div>
            </div>
          )}
        </form.Field>

       

        {/* Submit Button */}
        <div>
          <form.Subscribe
            selector={(state) => [state.canSubmit]}
          >
            {([canSubmit]) => (
              <button
                type="submit"
                disabled={!canSubmit || isPending}
                className="md:w-auto w-full bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Enviando..." : "Enviar"}
              </button>
            )}
          </form.Subscribe>
        </div>
         {/* Error Message */}
        {isError && (
          <div className="text-red-700 text-base font-extralight">
            Ocurrió un error al enviar el formulario.
          </div>
        )}

        {/* Success Message */}
        {isSuccess && (
          <div className="text-green-700 text-base font-extralight">
            Formulario enviado con éxito.
          </div>
        )}
      </form>
    </div>
  );
}
