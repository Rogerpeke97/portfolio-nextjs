import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import IMDIconButton from "../atoms/buttons/IMDIconButton"
import IMDDialog from "../molecules/dialogs/IMDDialog"

const IMDFooter = ({ className }: { className?: string }) => {
  const [openCopiedToClipboardDialog, setOpenCopiedToClipboardDialog] = useState(false)
  const copyEmailToClipboard = (email: string) => {
    navigator.clipboard.writeText(email)
    setOpenCopiedToClipboardDialog(true)
  }
  const links = [
    { name: "Github", href: "https://github.com/Rogerpeke97", icon: <FontAwesomeIcon icon={faGithub} />, title: "Go to my github", onClick: () => {} },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/ignacio-martin-sr/", icon: <FontAwesomeIcon icon={faLinkedin} />, title: "Go to my linkedin", onClick: () => {} },
    { name: "Email", href: "", icon: <FontAwesomeIcon icon={faEnvelope} />, title: "Copy my email to your clipboard", onClick: () => copyEmailToClipboard("rogerpeke97@gmail.com")}
  ]
  return(
    <footer className={`py-16 flex flex-col justify-center items-center ${className}`}>
      <div className="flex">
        {
          links.map((link, index) => (
            <IMDIconButton key={index} size="lg" className="mr-2 !text-2xl" ariaLabel={link.name} href={link.href} title={link.title} icon={link.icon} onClick={link.onClick} />
          ))
        }
      </div>
      <h3 className="mt-8">&copy; Copyright 2022, Ignacio Martin Diaz. All rights reserved.</h3>
      <IMDDialog dialogBody="Copied to clipboard!" isDialogOpen={openCopiedToClipboardDialog} setIsDialogOpen={(isOpen: boolean) => setOpenCopiedToClipboardDialog(isOpen)} />
    </footer>
  )
}

export default IMDFooter
