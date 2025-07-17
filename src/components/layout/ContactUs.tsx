import ContactForm from "../contact-us/ContactForm";

export default function ContactUs() {
  return (
    <>
      <div className="flex flex-col mb-16 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-extralight">
          ¿Tienes una idea en mente?
        </h1>
        <h2 className="text-2xl  md:text-3xl font-extralight mt-2">
          Escríbenos y hagámosla realidad juntos
        </h2>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-12 gap-8">
        {/* Left side - Title */}
        <div className="col-span-4 md:col-span-2 flex flex-col items-start">
          <h2 className="text-white text-3xl md:text-4xl font-normal">
            Dejanos tu información
          </h2>
        </div>

        {/* Right side - Form Container */}
        <div className="col-span-4 md:col-span-6 md:col-start-4 flex items-center justify-end">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
