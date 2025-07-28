export default function ServiceMain(){
    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex flex-col justify-start">
                <h1 className="text-[32px] md:text-[52px] font-[250]">Branding</h1>
                <p className="py-8 font-[250] text-[16px] md:text-[24px]"> En Mooba, el branding no empieza con un logo, sino con una verdad.
                Exploramos lo que hace única a tu marca, definimos su esencia y la proyectamos al mundo con claridad, coherencia y ambición. Diseñamos marcas con visión, listas para crecer.</p>
            </div>
            <div>
                <video autoPlay muted loop playsInline className="">
                <source src="https://cdn.pixabay.com/video/2025/05/01/276047_large.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    )
}