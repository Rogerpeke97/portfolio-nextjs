import type { NextPage } from 'next'
import IMDLogo from '../components/atoms/logos/IMDLogo'
import IMDAboutMe from '../components/modules/IMDAboutMe'
import IMDContactMe from '../components/modules/IMDContactMe'
import IMDFooter from '../components/modules/IMDFooter'
import IMDIntroduction from '../components/modules/IMDIntroduction'
import IMDMyProjects from '../components/modules/IMDMyProjects'
import IMDNavBar from '../components/molecules/navbars/IMDNavBar'

const Home: NextPage = () => {
  return (
    <>
      <div className="pt-24 mdAndDown:px-4 flex flex-col items-center justify-center">
        <IMDNavBar>
          <div className="flex">
            <IMDLogo />
            <h1 className="font-bold">IMD</h1>
          </div>
        </IMDNavBar>
        <IMDIntroduction className="w-1/2 3xlAndDown:w-full" />
        <IMDAboutMe className="w-1/2 3xlAndDown:w-full px-9 smAndDown:px-3"/>
        <IMDMyProjects className="w-1/2 3xlAndDown:w-full px-9 smAndDown:px-3 border-t-2 border-separator" />
        <IMDContactMe className="w-1/2 3xlAndDown:w-full px-9 smAndDown:px-3 border-t-2 border-separator" />
        <IMDFooter className="w-1/2 3xlAndDown:w-full px-9 smAndDown:px-3 border-t-2 border-separator" />
      </div>
    </>
  )
}

export default Home
