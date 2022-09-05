import {  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Button, useDisclosure, ModalHeader } from "@chakra-ui/react"
import { useEffect } from "react"

const IMDDialog = ({className, isDialogOpen, setIsDialogOpen, dialogBody}: 
  {className?: string, isDialogOpen: boolean, setIsDialogOpen: (isOpen: boolean) => void, dialogBody: string}) => {
    const { isOpen: contactSubmissionDialogIsOpen, onOpen: openContactSubmissionDialog, onClose: closeContactSubmissionDialog } = useDisclosure()
    const closeDialog = () => {
      setIsDialogOpen(false)
      closeContactSubmissionDialog()
    }
    useEffect(() => {
      if(isDialogOpen && !contactSubmissionDialogIsOpen) {
        openContactSubmissionDialog()
      }
    }, [isDialogOpen, contactSubmissionDialogIsOpen])
    return(
      <Modal onClose={closeDialog} isOpen={contactSubmissionDialogIsOpen} isCentered>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>Message</ModalHeader>
          <ModalBody>
            {dialogBody}
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeDialog}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default IMDDialog
