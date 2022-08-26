import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const updateColorModeForTailwind = () => {
    const currentColorMode = localStorage.getItem('chakra-ui-color-mode')
    if(currentColorMode === "dark"){
      document.body.classList.add("dark")
      return
    }
    document.body.classList.remove("dark")
  }
  useEffect(() => {
    updateColorModeForTailwind()
    window.addEventListener('storage', updateColorModeForTailwind)
    return () => {
      window.removeEventListener('storage', updateColorModeForTailwind)
    }
  }, [])
  return(
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
