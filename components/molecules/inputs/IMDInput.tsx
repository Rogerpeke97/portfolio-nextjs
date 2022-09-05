import { EmailIcon } from "@chakra-ui/icons"
import { Alert, AlertIcon, Collapse, Input, InputGroup, InputLeftElement, useDisclosure } from "@chakra-ui/react"
import { JSXElementConstructor, ReactElement, useEffect } from "react"


const IMDInput = ({ className, value, onChange, isValid, prependIcon, warningMessage, type, placeholder }: 
  { className?: string, value: string, onChange: (e: any) => void, isValid?: boolean, type?: string, placeholder?: string
    prependIcon?: ReactElement<any, string | JSXElementConstructor<any>>, warningMessage?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    if(!isValid && !isOpen) {
      onOpen()
    } else if(isValid && isOpen) {
      onClose()
    }
  }, [isValid, onOpen, isOpen, onClose])
  return(
    <>
      <InputGroup className={`${className}`}>
        <InputLeftElement pointerEvents='none'>
          {prependIcon}
        </InputLeftElement>
        <Input value={value} 
          onChange={onChange} 
        type={type} placeholder={placeholder} />
      </InputGroup>
      <Collapse in={isOpen} animateOpacity>
        <Alert className="rounded-md" status='warning'>
          <AlertIcon />
          {warningMessage}
        </Alert>
      </Collapse>
    </>
  )
}

export default IMDInput
