import { ServicesSection } from "@/types/ServicesSection";
interface Props {
    service: ServicesSection | null;
}

export default function ServiceMain({service}:Props){
    if (!service) return null;
    const serviceTitle = service.serviceTitle;
    const serviceContent = service.serviceDescription;
    const videoUrl = service.serviceVideo.url || "";
    return (
        <div className="grid grid-cols-1  md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
                <div className="flex flex-col items-start">
                <h1 className="text-[32px] md:text-[52px] leading-[1] font-[250]">{serviceTitle}</h1>
                <p className="pt-8 font-[250] text-[16px] md:text-[24px]">{serviceContent}</p>
                </div>
            </div>
            <div className="hidden md:block md:col-span-1" />
            <div className="md:col-span-7 pt-1">
                <video autoPlay muted loop playsInline className="">
                <source src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${videoUrl}`} type="video/mp4" />
                </video>
            </div>
        </div>
    )
}