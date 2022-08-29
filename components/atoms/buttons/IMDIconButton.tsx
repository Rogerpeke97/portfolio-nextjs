import { Fade, IconButton, useDisclosure } from '@chakra-ui/react'
import { JSXElementConstructor, ReactElement, useEffect, useRef } from 'react'

const IMDIconButton = ({ className="", size="md", title="", ariaLabel, icon, onClick, href }: 
  { className?: string, size?: string, title?: string, ariaLabel: string, 
    icon: ReactElement<any, string | JSXElementConstructor<any>> | undefined, onClick?: () => void, href?: string }) => {
  const aLink = useRef<HTMLAnchorElement>(null)
  const shouldOpenLinkOrOnClickFn = () => {
    if (href) {
      const link = document.createElement('a')
      link.href = href
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      link.click()
      link.remove()
    } else if (onClick) {
      onClick()
    }
  }
  return(
    <IconButton size={size} className={className} title={title} aria-label={ariaLabel} icon={icon} onClick={shouldOpenLinkOrOnClickFn} />
  )
}
export default IMDIconButton
