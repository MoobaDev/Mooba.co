'use client'
import Lottie from "lottie-react"

export default function LoopingIcon({ animationData }: { animationData: object }) {
  return (
    <div className="w-32 h-32">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}