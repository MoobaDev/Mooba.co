import { useState, useEffect } from "react"
import Lottie from "lottie-react"

export default function AnimatedIcon({ url }: { url: string }) {
    const [animationData, setAnimationData] = useState<object | null>(null)
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        const fetchAnimation = async () => {
        const res = await fetch(url)
        const json = await res.json()
        setAnimationData(json)
        }
    fetchAnimation()
    }, [url])

    if (!animationData) return <div className="w-32 h-32 bg-gray-200 rounded" />

    return (
    <div className="w-32 h-32" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <Lottie
            animationData={animationData}
            loop={false}
            autoplay={false}
            play={hovered}
            style={{ width: "100%", height: "100%" }}
        />
    </div>
    )
}