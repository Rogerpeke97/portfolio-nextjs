import { useMediaQuery } from "@chakra-ui/react"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faExternalLink } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { ReactElement } from "react"
import { PROJECT } from "../../../utils/projects/ProjectHelpers"
import IMDIconButton from "../../atoms/buttons/IMDIconButton"

const IMDProjectCard = ({ className="", children, project, inverseOrder=false }: 
{ className?: string, children?: Array<ReactElement> | ReactElement | string, project: PROJECT, inverseOrder?: boolean }) => {
  const [mdAndDown] = useMediaQuery('(max-width: 1200px)')
  const CardDescription = () => {
    if(mdAndDown){
      return(
        <div className="flex h-full flex-col z-10 justify-between">
          <div>
            <h1 className="text-3xl underline mb-5">{project.title}</h1>
            <p className="text-md">{project.description}</p>
            <div className="flex flex-wrap mt-5">
              {
                project.technologies.map((technology, index) => {
                  return(
                    <span key={index} className="text-sm mr-2 text-yellow-700">{technology}</span>
                  )
                })
              }
            </div>
          </div>
          <div className="mt-5 flex">
            <IMDIconButton size="lg" className="mr-4 !text-2xl" icon={<FontAwesomeIcon icon={faGithub} />} href={project.github[0]} />
            <IMDIconButton size="lg" className="mr-4 !text-2xl" icon={<FontAwesomeIcon icon={faExternalLink} />} href={project.github[0]} />
          </div>
        </div>
      )
    }
    return (
      <div className="flex z-10 min-w-[0px] flex-col">
        <div className={`mt-10 ${inverseOrder ? 'items-end' : ''} flex flex-col justify-between`}>
          <h1 className="text-3xl underline">{project.title}</h1>
          <div className={`p-4 my-8 shadow shadow-black shadow-md relative bg-card text-white rounded-lg max-w-[500px] min-h-[150px]`}>
            <p className="text-md">{project.description}</p>
          </div>
          <div className="flex flex-col mt-2 w-full">
            <div className={`flex ${inverseOrder ? 'justify-end' : ''}`}>
              {
                project.technologies.map((technology, index) => {
                  return(
                    <span key={index} className="text-sm mr-2 text-yellow-700">{technology}</span>
                  )
                })
              }
            </div>
            <div className={`mt-5 flex ${inverseOrder ? 'justify-end' : ''}`}>
              <IMDIconButton size="lg" className={`${inverseOrder ? 'ml-4' : 'mr-4'} !text-2xl`} icon={<FontAwesomeIcon icon={faGithub} />} href={project.github[0]} />
              <IMDIconButton size="lg" className={`${inverseOrder ? 'ml-4' : 'mr-4'} !text-2xl`} icon={<FontAwesomeIcon icon={faExternalLink} />} href={project.github[0]} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  const CardContent = () => {
    if(mdAndDown) {
      return(
        <div className="w-full flex rounded-lg relative overflow-hidden">
          <div className={`absolute w-full h-full min-h-[400px]`} >
            <Image src={project.preview.name} alt={project.preview.alt} layout="fill" objectFit="cover" width="100%" height="100%"/>
          </div>
          <div className="relative bg-gray-400/[.8] dark:bg-slate-800/[.89] w-full p-6">
            <CardDescription />
          </div>
        </div>
      )
    }
    return(
      <>
        {!inverseOrder && <CardDescription />}
        <div className={`grow transition ease-in-out brightness-50 hover:brightness-100 absolute overflow-hidden 
          rounded-lg ${inverseOrder ? 'left-0' : 'left-[55.5%]'} m-auto !w-[400px] !h-[300px]`} >
          <Image src={project.preview.name} alt={project.preview.alt} layout="fill" objectFit="cover" width="100%" height="100%"/>
        </div>
        {inverseOrder && <CardDescription />}
      </>
    )
  }
  return(
    <div className={`flex p-4 items-center relative w-full max-w-[900px] ${inverseOrder ? 'justify-end' : 'justify-start'} ${className}`}>
      <CardContent />
    </div>
  )
}

export default IMDProjectCard
