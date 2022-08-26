import { IconButton } from '@chakra-ui/react'
import { JSXElementConstructor, ReactElement } from 'react'

const IMDIconButton = ({ className, ariaLabel, icon, onClick }: 
  { className?: string, ariaLabel: string, icon: ReactElement<any, string | JSXElementConstructor<any>> | undefined, onClick?: () => void }) => {
  return(
    <IconButton className={className} aria-label={ariaLabel} icon={icon} onClick={onClick} />
  )
}
export default IMDIconButton
