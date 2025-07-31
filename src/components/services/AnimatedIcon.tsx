'use client'

import { useRef, useEffect } from "react"
import Lottie, { LottieRefCurrentProps } from "lottie-react"

export default function AnimatedIcon({
  animationData,
  play
}: {
  animationData: object
  play: boolean
}) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    if (play) {
      lottieRef.current?.play()
    } else {
      lottieRef.current?.stop()
    }
  }, [play])

  return (
    <div className="w-[32px] h-[32px]" style={{ minWidth: "32px", minHeight: "32px" }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "contain",
        }}
      />
    </div>
  )
}
