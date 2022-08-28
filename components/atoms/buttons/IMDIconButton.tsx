import { Fade, IconButton, useDisclosure } from '@chakra-ui/react'
import { JSXElementConstructor, ReactElement, useEffect } from 'react'

const IMDIconButton = ({ className="", size="md", title="", ariaLabel, icon, onClick }: 
  { className?: string, size?: string, title?: string, ariaLabel: string, icon: ReactElement<any, string | JSXElementConstructor<any>> | undefined, onClick?: () => void }) => {
  return(
    <IconButton size={size} className={className} title={title} aria-label={ariaLabel} icon={icon} onClick={onClick} />
  )
}
export default IMDIconButton
