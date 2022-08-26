import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
}

// 3. extend the theme
const theme = extendTheme({ config })

export default theme
