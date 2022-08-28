import { ReactElement, useEffect, useRef, useState } from "react"
import THREE from "three"
import { WavesScene } from "../../store/waves/WavesStore"
import { WavesClass } from "../../classes/waves/Waves"

const IMDWaves3d = ({ className="", children }: 
{ className?: string, children?: Array<ReactElement> | ReactElement | string }) => {
  const { Waves } = WavesScene()
  useEffect(() => {
    if(!Waves.current){
      const wavesCanvas = document.getElementById("wavesScene") as HTMLCanvasElement
      Waves.current = new WavesClass(wavesCanvas)
    }
  }, [])
  // const mouseMove = (e) => {
  //   if (wavesSceneLoaded) {
  //     const mousex = (e.clientX - (canvasContainer.current.getBoundingClientRect().left / 2));
  //     const mousey = (e.clientY - (canvasContainer.current.getBoundingClientRect().top / 2));
  //     const x = mousex - canvasContainer.current.getBoundingClientRect().width / 2;
  //     const y = canvasContainer.current.getBoundingClientRect().height / 2 - mousey;
  //     camera.current.rotation.y = (x / 100) * (Math.PI / 180);
  //     camera.current.rotation.x = -(y / 100) * (Math.PI / 180) - 0.8;
  //   }
  // }
  return(
    <div className="h-screen flex absolute top-24 w-full" id="wavesSceneContainer">
       <canvas id="wavesScene" className="w-full bg-background h-full" />
    </div>
  )
}

export default IMDWaves3d

