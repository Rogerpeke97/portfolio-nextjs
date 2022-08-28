import { MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons"
import { Box, Button, useColorMode } from "@chakra-ui/react"
import React, { ReactElement, useEffect, useState } from "react"
import IMDIconButton from "../../atoms/buttons/IMDIconButton"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from "@fortawesome/free-brands-svg-icons"

const IMDNavBar = ({ className="", children, onClick }: 
  { className?: string, children?: Array<ReactElement> | ReactElement | string, onClick?: () => void }) => {
    const { toggleColorMode, colorMode } = useColorMode()
    const toggleModeAndTriggerStorageEvent = () => {
      toggleColorMode()
      window.dispatchEvent(new Event('storage'))
    }
    return(
      <nav className={`flex bg-background border-b-2 items-center justify-center border-separator h-24 z-50 fixed inset-0 transition ease-out duration-300 px-3 ${className}`}>
        <div className="flex w-1/2 3xlAndDown:w-full items-center justify-between">
          {children}
          <div>
            <IMDIconButton size="lg" className="mr-8 !text-2xl" ariaLabel="Github" title="Go to my github" icon={<FontAwesomeIcon icon={faGithub} />} />
            <IMDIconButton size="lg" className="!text-2xl" ariaLabel="Color mode" title="Toggle dark/light mode" onClick={toggleModeAndTriggerStorageEvent} icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} />
          </div>
        </div>
      </nav>
    )
}

export default IMDNavBar
