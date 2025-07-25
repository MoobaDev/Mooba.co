"use client";

import React, { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useSubmitContactForm } from "@/hooks/useSubmitContactForm";
import { useForm } from "@tanstack/react-form";

// Estilos para prevenir el autocompletado blanco
const autocompleteCss = `
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus,
  select:-webkit-autofill:active,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  textarea:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px transparent inset !important;
    box-shadow: 0 0 0 30px transparent inset !important;
    -webkit-text-fill-color: white !important;
    background-color: transparent !important;
    background: transparent !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const countriesWithCodes = [
  { name: "Colombia", code: "+57" },
  { name: "Afganistán", code: "+93" },
  { name: "Albania", code: "+355" },
  { name: "Alemania", code: "+49" },
  { name: "Andorra", code: "+376" },
  { name: "Angola", code: "+244" },
  { name: "Antigua y Barbuda", code: "+1" },
  { name: "Arabia Saudí", code: "+966" },
  { name: "Argelia", code: "+213" },
  { name: "Argentina", code: "+54" },
  { name: "Armenia", code: "+374" },
  { name: "Australia", code: "+61" },
  { name: "Austria", code: "+43" },
  { name: "Azerbaiyán", code: "+994" },
  { name: "Bahamas", code: "+1" },
  { name: "Bahrein", code: "+973" },
  { name: "Bangladesh", code: "+880" },
  { name: "Barbados", code: "+1" },
  { name: "Bielorrusia", code: "+375" },
  { name: "Bélgica", code: "+32" },
  { name: "Belice", code: "+501" },
  { name: "Benín", code: "+229" },
  { name: "Bután", code: "+975" },
  { name: "Bolivia", code: "+591" },
  { name: "Bosnia y Herzegovina", code: "+387" },
  { name: "Botsuana", code: "+267" },
  { name: "Brasil", code: "+55" },
  { name: "Brunéi", code: "+673" },
  { name: "Bulgaria", code: "+359" },
  { name: "Burkina Faso", code: "+226" },
  { name: "Burundi", code: "+257" },
  { name: "Cabo Verde", code: "+238" },
  { name: "Camboya", code: "+855" },
  { name: "Camerún", code: "+237" },
  { name: "Canadá", code: "+1" },
  { name: "Catar", code: "+974" },
  { name: "Chad", code: "+235" },
  { name: "Chile", code: "+56" },
  { name: "China", code: "+86" },
  { name: "Chipre", code: "+357" },
  { name: "Comoras", code: "+269" },
  { name: "Corea del Norte", code: "+850" },
  { name: "Corea del Sur", code: "+82" },
  { name: "Costa de Marfil", code: "+225" },
  { name: "Costa Rica", code: "+506" },
  { name: "Croacia", code: "+385" },
  { name: "Cuba", code: "+53" },
  { name: "Dinamarca", code: "+45" },
  { name: "Dominica", code: "+1" },
  { name: "Ecuador", code: "+593" },
  { name: "Egipto", code: "+20" },
  { name: "El Salvador", code: "+503" },
  { name: "Emiratos Árabes Unidos", code: "+971" },
  { name: "Eritrea", code: "+291" },
  { name: "Eslovaquia", code: "+421" },
  { name: "Eslovenia", code: "+386" },
  { name: "España", code: "+34" },
  { name: "Estados Unidos", code: "+1" },
  { name: "Estonia", code: "+372" },
  { name: "Esuatini", code: "+268" },
  { name: "Etiopía", code: "+251" },
  { name: "Filipinas", code: "+63" },
  { name: "Finlandia", code: "+358" },
  { name: "Fiyi", code: "+679" },
  { name: "Francia", code: "+33" },
  { name: "Gabón", code: "+241" },
  { name: "Gambia", code: "+220" },
  { name: "Georgia", code: "+995" },
  { name: "Ghana", code: "+233" },
  { name: "Granada", code: "+1" },
  { name: "Grecia", code: "+30" },
  { name: "Guatemala", code: "+502" },
  { name: "Guinea", code: "+224" },
  { name: "Guinea-Bisáu", code: "+245" },
  { name: "Guinea Ecuatorial", code: "+240" },
  { name: "Guyana", code: "+592" },
  { name: "Haití", code: "+509" },
  { name: "Honduras", code: "+504" },
  { name: "Hungría", code: "+36" },
  { name: "India", code: "+91" },
  { name: "Indonesia", code: "+62" },
  { name: "Irak", code: "+964" },
  { name: "Irán", code: "+98" },
  { name: "Irlanda", code: "+353" },
  { name: "Islandia", code: "+354" },
  { name: "Islas Marshall", code: "+692" },
  { name: "Islas Salomón", code: "+677" },
  { name: "Israel", code: "+972" },
  { name: "Italia", code: "+39" },
  { name: "Jamaica", code: "+1" },
  { name: "Japón", code: "+81" },
  { name: "Jordania", code: "+962" },
  { name: "Kazajistán", code: "+7" },
  { name: "Kenia", code: "+254" },
  { name: "Kirguistán", code: "+996" },
  { name: "Kiribati", code: "+686" },
  { name: "Kuwait", code: "+965" },
  { name: "Laos", code: "+856" },
  { name: "Lesoto", code: "+266" },
  { name: "Letonia", code: "+371" },
  { name: "Líbano", code: "+961" },
  { name: "Liberia", code: "+231" },
  { name: "Libia", code: "+218" },
  { name: "Liechtenstein", code: "+423" },
  { name: "Lituania", code: "+370" },
  { name: "Luxemburgo", code: "+352" },
  { name: "Madagascar", code: "+261" },
  { name: "Malasia", code: "+60" },
  { name: "Malaui", code: "+265" },
  { name: "Maldivas", code: "+960" },
  { name: "Malí", code: "+223" },
  { name: "Malta", code: "+356" },
  { name: "Marruecos", code: "+212" },
  { name: "Mauricio", code: "+230" },
  { name: "Mauritania", code: "+222" },
  { name: "México", code: "+52" },
  { name: "Micronesia", code: "+691" },
  { name: "Moldavia", code: "+373" },
  { name: "Mónaco", code: "+377" },
  { name: "Mongolia", code: "+976" },
  { name: "Montenegro", code: "+382" },
  { name: "Mozambique", code: "+258" },
  { name: "Birmania", code: "+95" },
  { name: "Namibia", code: "+264" },
  { name: "Nauru", code: "+674" },
  { name: "Nepal", code: "+977" },
  { name: "Nicaragua", code: "+505" },
  { name: "Níger", code: "+227" },
  { name: "Nigeria", code: "+234" },
  { name: "Noruega", code: "+47" },
  { name: "Nueva Zelanda", code: "+64" },
  { name: "Omán", code: "+968" },
  { name: "Países Bajos", code: "+31" },
  { name: "Pakistán", code: "+92" },
  { name: "Palaos", code: "+680" },
  { name: "Panamá", code: "+507" },
  { name: "Papúa Nueva Guinea", code: "+675" },
  { name: "Paraguay", code: "+595" },
  { name: "Perú", code: "+51" },
  { name: "Polonia", code: "+48" },
  { name: "Portugal", code: "+351" },
  { name: "Reino Unido", code: "+44" },
  { name: "República Centroafricana", code: "+236" },
  { name: "República Checa", code: "+420" },
  { name: "República del Congo", code: "+242" },
  { name: "República Democrática del Congo", code: "+243" },
  { name: "República Dominicana", code: "+1" },
  { name: "Ruanda", code: "+250" },
  { name: "Rumania", code: "+40" },
  { name: "Rusia", code: "+7" },
  { name: "Samoa", code: "+685" },
  { name: "San Cristóbal y Nieves", code: "+1" },
  { name: "San Marino", code: "+378" },
  { name: "San Vicente y las Granadinas", code: "+1" },
  { name: "Santa Lucía", code: "+1" },
  { name: "Santo Tomé y Príncipe", code: "+239" },
  { name: "Senegal", code: "+221" },
  { name: "Serbia", code: "+381" },
  { name: "Seychelles", code: "+248" },
  { name: "Sierra Leona", code: "+232" },
  { name: "Singapur", code: "+65" },
  { name: "Siria", code: "+963" },
  { name: "Somalia", code: "+252" },
  { name: "Sri Lanka", code: "+94" },
  { name: "Sudáfrica", code: "+27" },
  { name: "Sudán", code: "+249" },
  { name: "Sudán del Sur", code: "+211" },
  { name: "Suecia", code: "+46" },
  { name: "Suiza", code: "+41" },
  { name: "Surinam", code: "+597" },
  { name: "Tailandia", code: "+66" },
  { name: "Tanzania", code: "+255" },
  { name: "Tayikistán", code: "+992" },
  { name: "Timor Oriental", code: "+670" },
  { name: "Togo", code: "+228" },
  { name: "Tonga", code: "+676" },
  { name: "Trinidad y Tobago", code: "+1" },
  { name: "Túnez", code: "+216" },
  { name: "Turkmenistán", code: "+993" },
  { name: "Turquía", code: "+90" },
  { name: "Tuvalu", code: "+688" },
  { name: "Ucrania", code: "+380" },
  { name: "Uganda", code: "+256" },
  { name: "Uruguay", code: "+598" },
  { name: "Uzbekistán", code: "+998" },
  { name: "Vanuatu", code: "+678" },
  { name: "Vaticano", code: "+39" },
  { name: "Venezuela", code: "+58" },
  { name: "Vietnam", code: "+84" },
  { name: "Yemen", code: "+967" },
  { name: "Yibuti", code: "+253" },
  { name: "Zambia", code: "+260" },
  { name: "Zimbabue", code: "+263" }
];

const countries = countriesWithCodes.map(country => country.name);

const employeeCounts = [
  "1-30 empleados",
  "31-100 empleados",
  "101-500 empleados",
  "Más de 500 empleados"
];

const industries = [
  "Automotriz",
  "Bancario",
  "Construcción",
  "Consumo Masivo",
  "Distribución de productos",
  "Educación",
  "Fabricación",
  "Farmacéutico",
  "Financiero o Asegurador",
  "Firma de abogados",
  "Moda o Calzado",
  "Restaurantes o Alimentos",
  "Retail",
  "Salud y Belleza",
  "Servicios Profesionales",
  "Servicios de Marketing Digital",
  "Servicios Hardware",
  "Servicios para eCommerce",
  "Tecnología",
  "Telecomunicaciones",
  "Textil",
  "Viajes y Turismo",
];

const services = [
  "Branding",
  "Diseño web & Desarrollo",
  "Marketing Digital",
  "Contenido Audiovisual",
  "Campañas Publicitarias",
];

interface FloatingLabelInputProps {
  field: {
    name: string;
    state: {
      value: string;
      meta: {
        errors: (string | undefined)[];
        isFocused?: boolean;
      };
    };
    handleBlur: () => void;
    handleChange: (value: string) => void;
  };
  label: string;
  type?: string;
  pattern?: string;
  inputMode?: "numeric" | "text" | "email" | "tel";
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ field, label, type = "text", pattern, inputMode, onKeyDown }) => {
  const [hasAutofill, setHasAutofill] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const checkAutofill = () => {
      const isAutofilled = input.matches?.(':-webkit-autofill') || false;
      setHasAutofill(isAutofilled);
    };

    // Check on mount and on interval
    checkAutofill();
    const interval = setInterval(checkAutofill, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      <div className="relative">
        <label
          htmlFor={field.name}
          className={`absolute left-0 top-2 text-gray-500 transition-all pointer-events-none ${
            field.state.value || field.state.meta.isFocused || hasAutofill
              ? "text-xs text-white -translate-y-4"
              : "text-base text-gray-500 translate-y-0"
          }`}
        >
          {label}
        </label>
        <input
          ref={inputRef}
          id={field.name}
          name={field.name}
          type={type}
          pattern={pattern}
          inputMode={inputMode}
          value={field.state.value}
          onBlur={() => {
            field.handleBlur();
            field.state.meta.isFocused = false;
          }}
          onFocus={() => {
            field.state.meta.isFocused = true;
          }}
          onChange={(e) => {
            field.handleChange(e.target.value);
          }}
          onKeyDown={onKeyDown}
          className={`peer w-full bg-transparent text-white placeholder-transparent border-0 border-b pt-2 focus:outline-none transition-colors ${
            field.state.meta.errors.length > 0
              ? "border-red-700 focus:border-red-500"
              : "border-zinc-600 focus:border-white"
          }`}
          placeholder=" "
        />
      </div>
      {field.state.meta.errors.length > 0 && (
        <p className="text-[#B3261E] text-xs md:text-sm font-normal">
          {field.state.meta.errors[0]}
        </p>
      )}
    </div>
  );
};

interface FloatingLabelSelectProps {
  field: {
    name: string;
    state: {
      value: string;
      meta: {
        errors: (string | undefined)[];
        isFocused?: boolean;
      };
    };
    handleBlur: () => void;
    handleChange: (value: string) => void;
  };
  label: string;
  options: string[];
}

const FloatingLabelSelect: React.FC<FloatingLabelSelectProps> = ({ field, label, options }) => (
  <div className="space-y-2">
    <div className="relative">
      <select
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className={`font-normal peer w-full bg-transparent border-0 border-b pt-2 focus:outline-none transition-colors appearance-none cursor-pointer
          ${field.state.meta.errors.length > 0 ? "border-red-700 focus:border-red-500" : "border-zinc-600 focus:border-white"}
          ${!field.state.value ? "text-gray-500" : "text-white"}
        `}
      >
        <option className="text-gray-500" value="" disabled hidden>
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-black text-white">
        {option}
          </option>
        ))}
      </select>
      {field.state.value && (
        <label
          htmlFor={field.name}
          className="absolute left-0 top-2 text-xs text-white transition-all pointer-events-none -translate-y-4"
        >
          {label}
        </label>
      )}
      <ChevronDown className="absolute right-2 top-2 w-5 h-5 text-gray-500 pointer-events-none" />
      
    </div>
    {field.state.meta.errors.length > 0 && (
      <p className="text-[#B3261E] text-xs md:text-sm font-normal">
        {field.state.meta.errors[0]}
      </p>
    )}
  </div>
);

export default function ContactForm() {
  const { mutate, isPending, isError, isSuccess } = useSubmitContactForm();
  const [phoneFocused, setPhoneFocused] = React.useState(false);

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
    <>
      <style dangerouslySetInnerHTML={{ __html: autocompleteCss }} />
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
              <div className="mt-2">
                <FloatingLabelInput field={field} label="Nombre" />
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
              <div className="mt-2">
                <FloatingLabelInput field={field} label="Apellido" />
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
              <FloatingLabelInput
                field={field}
                label="Correo electrónico"
                type="email"
              />
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
              <FloatingLabelSelect field={field} label="País" options={countries} />
            )}
          </form.Field>
        </div>

        {/* Third Row - Phone and Company Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form.Field
            name="phone"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "Este campo es requerido";
                // Validación simple para números
                const cleanValue = value.replace(/\s+/g, '');
                if (!/^(\+\d+)?\d*$/.test(cleanValue)) {
                  return "Solo se permiten números";
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <form.Subscribe selector={(state) => [state.values.country]}>
                {([selectedCountry]) => {
                  const countryData = countriesWithCodes.find(c => c.name === selectedCountry);
                  const countryCode = countryData?.code || '';
                  
                  // Función simple para obtener solo el número
                  const getNumberPart = (value: string) => {
                    if (!value) return '';
                    // Si tiene código de país, extraer solo la parte numérica después del código
                    if (value.includes('+') && countryCode && value.startsWith(countryCode)) {
                      return value.replace(countryCode, '').trim();
                    }
                    // Si no tiene código o es diferente, devolver todo el valor
                    return value.replace(/^\+\d+\s?/, '');
                  };
                  
                  const displayNumber = getNumberPart(field.state.value);

                  return (
                    <div className="space-y-2">
                      <div className="relative">
                        <label
                          htmlFor={field.name}
                          className={`absolute left-0 top-2 text-gray-500 transition-all pointer-events-none ${
                            field.state.value || phoneFocused || countryCode
                              ? "text-xs text-white -translate-y-4"
                              : "text-base text-gray-500 translate-y-0"
                          }`}
                        >
                          Celular
                        </label>
                        <div className="flex">
                          {countryCode && (
                            <span className="text-white bg-transparent border-0 border-b border-zinc-600 pt-2 pr-2 text-base font-normal">
                              {countryCode}
                            </span>
                          )}
                          <input
                            id={field.name}
                            name={field.name}
                            type="tel"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={displayNumber}
                            onBlur={() => {
                              field.handleBlur();
                              setPhoneFocused(false);
                            }}
                            onFocus={() => setPhoneFocused(true)}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              // Si hay código de país, combinarlo con el número
                              const fullValue = countryCode ? `${countryCode} ${inputValue}` : inputValue;
                              field.handleChange(fullValue);
                            }}
                            onKeyDown={(e) => {
                              // Solo permitir números y teclas de control
                              if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            className={`peer flex-1 bg-transparent text-white placeholder-transparent border-0 border-b pt-2 focus:outline-none transition-colors ${
                              field.state.meta.errors.length > 0
                                ? "border-red-700 focus:border-red-500"
                                : "border-zinc-600 focus:border-white"
                            } ${countryCode ? 'ml-1' : ''}`}
                            placeholder=" "
                          />
                        </div>
                      </div>
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-[#B3261E] text-xs md:text-sm font-normal">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.Subscribe>
            )}
          </form.Field>

          <form.Field
            name="companyName"
            validators={{
              onChange: ({ value }) =>
                !value ? "Este campo es requerido" : undefined,
            }}
          >
            {(field) => <FloatingLabelInput field={field} label="Nombre de la empresa" />}
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
            {(field) => <FloatingLabelInput field={field} label="Cargo / Ocupación" />}
          </form.Field>

          <form.Field
            name="employeeCount"
            validators={{
              onChange: ({ value }) =>
                !value ? "Este campo es requerido" : undefined,
            }}
          >
            {(field) => (
              <FloatingLabelSelect field={field} label="Cantidad de empleados en tu empresa" options={employeeCounts} />
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
              <FloatingLabelSelect field={field} label="Sector o industria" options={industries} />
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
              <FloatingLabelSelect field={field} label="Servicio que te interesa" options={services} />
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
                  className={`md:w-auto w-full bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors ${
                  !canSubmit || isPending
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                  }`}
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
    </>
  );
}
