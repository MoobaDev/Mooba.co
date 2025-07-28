'use client'
import { useState } from "react"
import Lottie from "lottie-react"

export default function AnimatedIcon({ animationData }: { animationData: object }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="w-32 h-32"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
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
