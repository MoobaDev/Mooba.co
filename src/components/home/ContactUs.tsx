import ContactForm from "@/components/contact-us/ContactForm";

export default function ContactSection() {
  return (
    <section className="container max-w-[1440px] mt-16 md:mt-[120px] mx-auto px-6 md:px-8 overflow-hidden  flex flex-col md:flex-row gap-8 md:gap-16">
      <div className="container w-full max-w-[1440px] flex flex-col md:flex-row gap-8 md:gap-16 justify-between">
        {/* Left side - Title */}
        <div className="flex flex-col items-start">
          <h2 className="text-white text-3xl md:text-4xl font-extralight">
            Contáctanos
          </h2>
        </div>

        {/* Right side - Form Container */}
        <div className="flex items-center justify-end w-full max-w-3xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
