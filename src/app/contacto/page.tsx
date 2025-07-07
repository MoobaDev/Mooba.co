import ContactForm from "@/components/contact/ContactForm";
export default function ContactoPage() {
  return (
    <section className="pt-24">
    <div className="w-screen relative left-1/2 -translate-x-1/2 mb-7 hidden md:block" style={{ height: "1px", backgroundColor: "#D0D5DD", transform: "scaleY(0.2)", transformOrigin: "top",}}></div>
    <div className="w-full px-6">
      <div className="py-8">
        <h1 className="text-[28px] md:text-[52px] font-extralight">¿Tienes una idea en mente?</h1>
        <h2 className="text-[20px] md:text-[32px] font-extralight">Escríbenos y hagámosla realidad juntos</h2>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between">
          <h3 className="text-[28px] md:text-[36px] text-normal">Dejanos tu información </h3>
          <div className=""> <ContactForm/> </div>
      </div>
    </div>
    </section>
  );
}