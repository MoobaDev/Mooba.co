'use client'
import Lottie from "lottie-react"

export default function LoopingIcon({ animationData }: { animationData: object }) {
  return (
    <div className="w-[40px] h-[40px] md:w-[56px] md:h-[56px]">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}