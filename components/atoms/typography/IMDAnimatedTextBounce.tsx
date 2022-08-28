import { ReactElement } from "react"

const IMDAnimatedTextBounce = ({ className="", text="", letterClass="" }: 
{ className?: string, text: string, letterClass?: string }) => {
  return(
    <div className={` ${className}`}>
      {
        text.split("").map((letter, index) => {
          return(
            <span style={{ '--i': index }} className={`font-bold animated-text-bounce ${letterClass}`} key={index}>
              {letter}
            </span>
          )
        })
      }
    </div>
  )
}

export default IMDAnimatedTextBounce
