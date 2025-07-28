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
        <div className="flex flex-col md:flex-row">
            <div className="flex flex-col justify-start">
                <h1 className="text-[32px] md:text-[52px] font-[250]">{serviceTitle}</h1>
                <p className="py-8 font-[250] text-[16px] md:text-[24px]">{serviceContent}</p>
            </div>
            <div>
                <video autoPlay muted loop playsInline className="">
                <source src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${videoUrl}`} type="video/mp4" />
                </video>
            </div>
        </div>
    )
}