import { SearchIcon } from "@chakra-ui/icons"
import { Box, useColorMode } from "@chakra-ui/react"
import React, { ReactElement, useEffect, useState } from "react"
import IMDIconButton from "../../atoms/buttons/IMDIconButton"

const IMDNavBar = ({ className, children, onClick }: 
  { className?: string, children?: Array<ReactElement> | ReactElement | string, onClick?: () => void }) => {
    const { toggleColorMode } = useColorMode()
    const [navIntersect, setNavIntersect] = useState(false)
    const toggleModeAndTriggerStorageEvent = () => {
      toggleColorMode()
      window.dispatchEvent(new Event('storage'))
    }
    const checkNavBarIntersect = (e: Event) => {
      const window = e.currentTarget as Window
      const scrollY = window.scrollY
      setNavIntersect(scrollY > document.documentElement.clientHeight)
    }
    useEffect(() => {
      window.addEventListener('scroll', checkNavBarIntersect)
      return () => {
        window.removeEventListener('scroll', checkNavBarIntersect)
      }
    }, [])
    return(
      <nav className={`flex border-b-4 border-separator h-24 z-50 justify-between fixed inset-0 transition ease-out duration-300 px-3 ${className}`}>
        {children}
        <div>
          <IMDIconButton ariaLabel="TEST BUTTON" onClick={toggleModeAndTriggerStorageEvent} icon={<SearchIcon />} />
        </div>
      </nav>
    )
}

export default IMDNavBar
