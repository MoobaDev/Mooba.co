// ✅ Solo se añadió el prop `play` y se eliminó la lógica de hover interna
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
    <div className="w-32 h-32">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={true}
        autoplay={false}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
