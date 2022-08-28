import { ReactElement } from "react"

const IMDAnimatedText = ({ className="", text="" }: 
{ className?: string, text: string }) => {
  return(
    <div className={` ${className}`}>
      {
        text.split("").map((letter, index) => {
          return(
            <span className="font-bold animated-text-dark" key={index}>
              {letter}
            </span>
          )
        })
      }
    </div>
  )
}

export default IMDAnimatedText
