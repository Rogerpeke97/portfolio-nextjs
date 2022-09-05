import { EmailIcon, PhoneIcon } from "@chakra-ui/icons"
import { Alert, AlertIcon, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react"
import { useReducer } from "react"
import { INPUTS, inputsReducer } from "../../utils/inputs/Helpers"
import IMDAnimatedTextBounce from "../atoms/typography/IMDAnimatedTextBounce"

const IMDContactMe = ({ className="" }: 
{ className?: string }) => {
  const [inputs, dispatchUpdateInputs] = useReducer(inputsReducer, INPUTS)
  return(
    <div className={`py-16 flex flex-col ${className}`}>
      <IMDAnimatedTextBounce className="text-6xl xs:text-4xl" letterClass="underline" text="Contact:" />
      <Stack className="mt-24 w-1/2 smAndDown:w-full">
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <EmailIcon color='gray.300' />
          </InputLeftElement>
          <Input value={inputs.find(input => input.type === "email")?.value} 
            onChange={(e) => dispatchUpdateInputs({ type: "email", payload: (e.target as HTMLTextAreaElement).value })} 
          type='tel' placeholder='Email' />
        </InputGroup>
        <div className="h-[48px]">
          {
            !inputs.find(input => input.type === "email")?.isValid &&         
            <Alert status='warning'>
              <AlertIcon />
              Seems your account is about expire, upgrade now
            </Alert>
          }
        </div>
      </Stack>
    </div>
  )
}

export default IMDContactMe
