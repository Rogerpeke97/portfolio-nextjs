import { Button, Stack } from "@chakra-ui/react"
import { faEdit, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback, useMemo, useReducer, useState } from "react"
import { INPUTS, inputsReducer } from "../../utils/inputs/Helpers"
import IMDAnimatedTextBounce from "../atoms/typography/IMDAnimatedTextBounce"
import IMDDialog from "../molecules/dialogs/IMDDialog"
import IMDInput from "../molecules/inputs/IMDInput"

const IMDContactMe = ({ className="" }: 
{ className?: string }) => {
  const [inputs, dispatchUpdateInputs] = useReducer(inputsReducer, INPUTS)
  const [isSendingContactForm, setIsSendingContactForm] = useState(false)
  const [openContactFormSentDialog, setOpenContactFormSentDialog] = useState(false)
  const [contactSubmissionMessage, setContactSubmissionMessage] = useState("")
  const findCurrentInput = (inputType: string) => {
    return inputs.find((input) => input.type === inputType)
  }
  const areAllInputsValid = useMemo(() => {
    return inputs.every((input) => input.isValid) && inputs.every((input) => input.value)
  }, [inputs])
  const sendContactForm = useCallback(async () => {
    setContactSubmissionMessage("")
    const params = {
      name: findCurrentInput('name')?.value,
      email: findCurrentInput('email')?.value,
      reason: findCurrentInput('reason')?.value,
    }
    if (areAllInputsValid && !isSendingContactForm) {
      setIsSendingContactForm(true)
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact_form`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params)
        })
        setContactSubmissionMessage("Your message has been sent!")
      } catch(err) {
        setContactSubmissionMessage("There was an error sending your message. Please try again later.")
      } finally {
        setIsSendingContactForm(false)
        setOpenContactFormSentDialog(true)
      }
    }
  }, [inputs, isSendingContactForm])
  return(
    <div className={`py-16 flex flex-col ${className}`}>
      <IMDAnimatedTextBounce className="text-6xl xs:text-4xl" letterClass="underline" text="Contact:" />
      <Stack className="mt-24 w-1/2 smAndDown:w-full">
        <IMDInput value={findCurrentInput("email")?.value || ""} type="email" placeholder="Email" prependIcon={<FontAwesomeIcon icon={faEnvelope} color='gray.300' />} 
          warningMessage="Please enter a valid email" isValid={findCurrentInput("email")?.isValid}
          onChange={(e) => dispatchUpdateInputs({ type: "email", payload: (e.target as HTMLTextAreaElement).value })} />

        <IMDInput className="!mt-8" value={findCurrentInput("name")?.value || ""} type="name" placeholder="Name" prependIcon={<FontAwesomeIcon icon={faUser} color='gray.300' />} 
          warningMessage="Please enter at least 5 characters as a minumum and no symbols or special characters"  isValid={findCurrentInput("name")?.isValid}
          onChange={(e) => dispatchUpdateInputs({ type: "name", payload: (e.target as HTMLTextAreaElement).value })} />

        <IMDInput className="!mt-8" value={findCurrentInput("reason")?.value || ""} type="reason" placeholder="Reason" prependIcon={<FontAwesomeIcon icon={faEdit} color='gray.300' />} 
          warningMessage="Please enter at least 10 characters as a minumum and no symbols or special characters"  isValid={findCurrentInput("reason")?.isValid}
          onChange={(e) => dispatchUpdateInputs({ type: "reason", payload: (e.target as HTMLTextAreaElement).value })} />

        <Button isLoading={isSendingContactForm} disabled={!areAllInputsValid} className="!mt-8" colorScheme="blue" variant="solid" size="lg" onClick={() => sendContactForm()}>Send</Button>

        <IMDDialog dialogBody={contactSubmissionMessage} isDialogOpen={openContactFormSentDialog} setIsDialogOpen={(isOpen: boolean) => setOpenContactFormSentDialog(isOpen)} />
      </Stack>
    </div>
  )
}

export default IMDContactMe
