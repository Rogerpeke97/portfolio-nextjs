import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import { useEffect } from 'react'
import StoredGameSceneWrapper from '../store/waves/WavesStore'
import DefaultLayout from '../components/layouts/DefaultLayout'

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
    <StoredGameSceneWrapper>
      <ChakraProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ChakraProvider>
    </StoredGameSceneWrapper>
  )
}

export default MyApp
