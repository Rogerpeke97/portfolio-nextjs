import { useColorMode } from "@chakra-ui/react"
import Image from "next/image"

const IMDLogo = ({ className="", width=70, height=70 }: { className?: string, width?: number, height?: number }) => {
  const { colorMode } = useColorMode()
  return(
    <Image style={colorMode === "light" ? {filter: "brightness(0)"} : {}} src="/logos/IMDLogo.png" width={width} height={height} alt="profile-pic" />
  )
}

export default IMDLogo
