import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const LoadingScreen = ({ isLoading }: {isLoading: boolean}) => {
  const [isVisible, setIsVisible] = useState(true)
  const loadingStates = [
    { text: 'Loading...'.split(''), value: true },
    { text: 'Done!'.split(''), value: false }
  ]
  const findLoadingState = () => {
    return loadingStates.find(state => state.value === isLoading) ?? { text: [], value: false }
  }

  return (
    <>
      {isVisible ?
        <div onAnimationEnd={() => setTimeout(() => setIsVisible(false), 1000)}
          className={"h-full w-full flex items-center justify-center fixed bg-background rounded-lg z-50 " + (isLoading ? "" : "fade-out ")}>
          <div className="flex items-center justify-center">
            <div className="spinner" />
          </div>
        </div>
        : null
      }
    </>
  )
}

export default LoadingScreen
