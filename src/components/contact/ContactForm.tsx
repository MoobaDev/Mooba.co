'use client';

import { useForm } from '@tanstack/react-form';
import {ThisFieldIsRequired} from "../../../Icons"

// Opciones para los dropdowns
const countries = [
  { value: '', label: 'Selecciona un país' },
  { value: 'ar', label: 'Argentina' },
  { value: 'cl', label: 'Chile' },
  { value: 'co', label: 'Colombia' },
  { value: 'mx', label: 'México' },
  { value: 'pe', label: 'Perú' },
  { value: 'es', label: 'España' },
  { value: 'us', label: 'Estados Unidos' },
];

const employeeCounts = [
  { value: '', label: 'Selecciona una opción' },
  { value: '1-10', label: '1-10 empleados' },
  { value: '11-50', label: '11-50 empleados' },
  { value: '51-200', label: '51-200 empleados' },
  { value: '201-500', label: '201-500 empleados' },
  { value: '501-1000', label: '501-1000 empleados' },
  { value: '1000+', label: 'Más de 1000 empleados' },
];

const sectors = [
  { value: '', label: 'Selecciona un sector' },
  { value: 'tecnologia', label: 'Tecnología' },
  { value: 'finanzas', label: 'Finanzas' },
  { value: 'salud', label: 'Salud' },
  { value: 'educacion', label: 'Educación' },
  { value: 'manufactura', label: 'Manufactura' },
  { value: 'comercio', label: 'Comercio' },
  { value: 'servicios', label: 'Servicios' },
];

const services = [
  { value: '', label: 'Selecciona un servicio' },
  { value: 'desarrollo-web', label: 'Desarrollo Web' },
  { value: 'marketing-digital', label: 'Marketing Digital' },
  { value: 'consultoria', label: 'Consultoría' },
  { value: 'diseno', label: 'Diseño' },
  { value: 'soporte', label: 'Soporte Técnico' },
  { value: 'cloud', label: 'Servicios Cloud' },
];

export default function ContactForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      country: '',
      position: '',
      employees: '',
      sector: '',
      service: '',
      details: '',
    },
    onSubmit: async ({ value }) => {
      console.log('Formulario enviado:', value);
    },
  });

  return (
    <form onSubmit={form.handleSubmit} className="grid gap-4 md:grid-cols-2">
      {/* Campo Nombre */}
      <form.Field
        name="name"
        validators={{
          onBlur: ({ value }) => !value ? 'Este campo es requerido' : undefined,
        }}
      >
        {(field) => (
          <div>
            <div className="relative">
              <input
                placeholder="Nombre"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`input ${!field.state.meta.isValid ? 'border-red-500' : ''}`}
              />
              {!field.state.meta.isValid && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ThisFieldIsRequired />
                </div>
              )}
            </div>
            {!field.state.meta.isValid && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Campo Apellido */}
      <form.Field
        name="lastName"
        validators={{
          onBlur: ({ value }) => !value ? 'Este campo es requerido' : undefined,
        }}
      >
        {(field) => (
          <div>
            <div className="relative">
              <input
                placeholder="Apellido"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`input ${!field.state.meta.isValid ? 'border-red-500' : ''}`}
              />
              {!field.state.meta.isValid && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ThisFieldIsRequired />
                </div>
              )}
            </div>
            {!field.state.meta.isValid && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Campo Correo electrónico */}
      <form.Field
        name="email"
        validators={{
          onBlur: ({ value }) =>
            !value
              ? 'Este campo es requerido'
              : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
              ? 'Correo inválido'
              : undefined,
        }}
      >
        {(field) => (
          <div>
            <div className="relative">
              <input
                placeholder="Correo electrónico"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`input ${!field.state.meta.isValid ? 'border-red-500' : ''}`}
              />
              {!field.state.meta.isValid && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ThisFieldIsRequired />
                </div>
              )}
            </div>
            {!field.state.meta.isValid && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Campo País (Dropdown) */}
      <form.Field
        name="country"
        validators={{
          onBlur: ({ value }) => !value ? 'Este campo es requerido' : undefined,
        }}
      >
        {(field) => (
          <div>
            <div className="relative">
              <select
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`input ${!field.state.meta.isValid ? 'border-red-500' : ''}`}
              >
                {countries.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {!field.state.meta.isValid && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ThisFieldIsRequired />
                </div>
              )}
            </div>
            {!field.state.meta.isValid && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Campo Celular */}
      <form.Field
        name="phone"
        validators={{
          onBlur: ({ value }) =>
            !value
              ? 'Este campo es requerido'
              : value.length < 7
              ? 'Número no válido'
              : undefined,
        }}
      >
        {(field) => (
          <div>
            <div className="relative">
              <input
                placeholder="Celular"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`input ${!field.state.meta.isValid ? 'border-red-500' : ''}`}
              />
              {!field.state.meta.isValid && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ThisFieldIsRequired />
                </div>
              )}
            </div>
            {!field.state.meta.isValid && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Campo Nombre de la empresa */}
      <form.Field
        name="company"
        validators={{
          onBlur: ({ value }) => !value ? 'Este campo es requerido' : undefined,
        }}
      >
        {(field) => (
          <div>
            <div className="relative">
              <input
                placeholder="Nombre de la empresa"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`input ${!field.state.meta.isValid ? 'border-red-500' : ''}`}
              />
              {!field.state.meta.isValid && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ThisFieldIsRequired />
                </div>
              )}
            </div>
            {!field.state.meta.isValid && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Campo Cargo/Ocupación */}
      <form.Field
        name="position"
        validators={{
          onBlur: ({ value }) => !value ? 'Este campo es requerido' : undefined,
        }}
      >
        {(field) => (
          <div>
            <div className="relative">
              <input
                placeholder="Cargo / Ocupación"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`input ${!field.state.meta.isValid ? 'border-red-500' : ''}`}
              />
              {!field.state.meta.isValid && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ThisFieldIsRequired />
                </div>
              )}
            </div>
            {!field.state.meta.isValid && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Campo Cantidad de empleados (Dropdown) */}
      <form.Field
        name="employees"
        validators={{
          onBlur: ({ value }) => !value ? 'Este campo es requerido' : undefined,
        }}
      >
        {(field) => (
          <div>
            <div className="relative">
              <select
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`input ${!field.state.meta.isValid ? 'border-red-500' : ''}`}
              >
                {employeeCounts.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {!field.state.meta.isValid && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ThisFieldIsRequired />
                </div>
              )}
            </div>
            {!field.state.meta.isValid && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Campo Sector o Industria (Dropdown) */}
      <form.Field
        name="sector"
        validators={{
          onBlur: ({ value }) => !value ? 'Este campo es requerido' : undefined,
        }}
      >
        {(field) => (
          <div>
            <div className="relative">
              <select
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`input ${!field.state.meta.isValid ? 'border-red-500' : ''}`}
              >
                {sectors.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {!field.state.meta.isValid && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ThisFieldIsRequired />
                </div>
              )}
            </div>
            {!field.state.meta.isValid && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="service"
        validators={{
          onBlur: ({ value }) => !value ? 'Este campo es requerido' : undefined,
        }}
      >
        {(field) => (
          <div>
            <div className="relative">
              <select
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`input ${!field.state.meta.isValid ? 'border-red-500' : ''}`}
              >
                {services.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {!field.state.meta.isValid && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ThisFieldIsRequired />
                </div>
              )}
            </div>
            {!field.state.meta.isValid && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="details">
        {(field) => (
          <div className="md:col-span-2">
            <div className="relative">
              <input
                type="text"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-gray-600 text-white text-base py-2 px-0 focus:outline-none focus:border-white peer placeholder-transparent"
                placeholder="Detalles del proyecto (Opcional)"
                id={field.name}
              />
              <label 
                htmlFor={field.name}
                className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-300 cursor-text"
              >
                Detalles del proyecto (Opcional)
              </label>
            </div>
          </div>
        )}
      </form.Field>

      <div className="md:col-span-2">
        <button type="submit" className="bg-white text-black font-bold px-6 py-2 rounded-full w-32">
          Enviar
        </button>
      </div>
    </form>
  );
}