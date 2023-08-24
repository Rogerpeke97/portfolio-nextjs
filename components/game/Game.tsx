import { World } from "../../classes/game/world/World"
import { useEffect, useRef } from "react"

const Game = () => {
  const GameWorld = useRef<World>()
  useEffect(() => {
    if(!GameWorld.current){
      const canvas = document.getElementById("gameScene") as HTMLCanvasElement
      GameWorld.current = new World(canvas)
    }
  }, [])
  return(
    <div className="h-screen w-screen" id="gameSceneContainer">
      <canvas id="gameScene" className="w-full h-full rounded-lg" />
    </div>
  )

}

export default Game
