import { ReactElement } from "react"
import { PROJECTS } from "../../utils/projects/ProjectHelpers"
import IMDAnimatedTextBounce from "../atoms/typography/IMDAnimatedTextBounce"
import IMDProjectCard from "../molecules/cards/IMDProjectCard"

const IMDMyProjects = ({ className="", children }: 
{ className?: string, children?: Array<ReactElement> | ReactElement | string }) => {
  return(
    <div className={`py-16 flex flex-col ${className}`}>
      <IMDAnimatedTextBounce className="text-6xl xs:text-4xl" letterClass="underline" text="Projects:" />
      <div className="mt-8 flex flex-col items-center justify-center">
        {
          PROJECTS.map((project, index) => {
            return(
              <IMDProjectCard className="my-3" inverseOrder={index % 2 === 0} key={`index-${project.title}`} project={project} />
            )
          })
        }
      </div>
    </div>
  )
}

export default IMDMyProjects
