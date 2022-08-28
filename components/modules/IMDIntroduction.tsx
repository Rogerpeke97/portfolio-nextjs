import { ReactElement } from "react"
import IMDAnimatedText from "../atoms/typography/IMDAnimatedText"
import IMDWaves3d from "./IMDWaves3d"

const IMDIntroduction = ({ className="", children }: 
{ className?: string, children?: Array<ReactElement> | ReactElement | string }) => {
  return(
    <div className={`w-full px-5 h-screen flex items-center justify-center ${className}`}>
      <IMDWaves3d />
      <div className="z-10 text-8xl smAndDown:text-6xl p-20 smAndDown:p-3 bg-background text-gray-900 dark:text-white rounded-lg shadow-black shadow-lg ">
        <IMDAnimatedText text="Ignacio" />
        <IMDAnimatedText text="Martin" />
        <IMDAnimatedText text="Diaz" />
      </div>
    </div>
  )
}

export default IMDIntroduction
