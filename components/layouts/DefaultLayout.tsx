import { ReactElement, ReactText, useEffect, useState } from "react"
import Home from "../../pages"
import LoadingScreen from "../molecules/loaders/LoadingScreen"

const DefaultLayout = ({ children }: {children: ReactElement}) => {
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const pageHasLoaded = () => {
    setIsLoadingPage(false)
  }
  useEffect(() => {
    if(document.readyState === 'complete') {
      pageHasLoaded()
      return
    }
    window.addEventListener("load", pageHasLoaded)
    return () => {
      window.removeEventListener("load", () => pageHasLoaded)
    }
  }, [])
  return(
    <>
      <LoadingScreen isLoading={isLoadingPage} />
      {children}
    </>
  )
}

export default DefaultLayout
